import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { delay } from "../utils/delay";
import axios from "axios";

const EditProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(localStorage.getItem("accessToken"));
      try {
        const response = await axios.get("http://localhost:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
        formData.email = response.data.email;
        formData.name = response.data.name;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [formData]);

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const form = new FormData();
            form.append('avatar', fileInputRef.current.files[0]);
            form.append('name', formData.name);
            form.append('email', formData.email);

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/editprofile/",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      console.log(response.data);

      if (response.data.message === "information updated") {
        toast.success("information was updated");
        await delay(2000);
        // window.location.href = "/signin";
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error);
    }
  };

  return (
    <div className="w-[80%] flex justify-center">
      <form className="space-y-4 md:space-y-6 w-full" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            User Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg
             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
              placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
            placeholder={userData.name}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 
            focus:border-primary-600 block w-full p-2.5  placeholder-gray-400
              focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Avatar</label>
          <br />
          <input type="file" ref={fileInputRef} />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;

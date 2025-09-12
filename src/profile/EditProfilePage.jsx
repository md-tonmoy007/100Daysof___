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
      try {
        const response = await axios.get("http://localhost:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // The user data is under response.data.user
        setUserData(response.data.user);
        setFormData({
          email: response.data.user.email || "",
          name: response.data.user.name || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Profile</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-28 h-28 mb-2">
              <img
                src={userData.avatar ? `http://localhost:8000${userData.avatar}` : userData.get_avatar}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow-lg"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="absolute bottom-0 right-0 w-8 h-8 opacity-0 cursor-pointer"
                title="Change avatar"
              />
              <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs shadow">Edit</span>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;

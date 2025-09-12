import {  useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";


function PassResetFinal() {
  const [formData, setFormData] = useState({
    password: "",
    uidb64:"",
    token: "",
  });
  const { uidb64, token } = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        formData.uidb64 = uidb64
        formData.token = token
        console.log(JSON.stringify(formData))
      const response = await axios.patch(
        `http://localhost:8000/api/password-reset-complete`,
        formData
      );

      console.log(response)
    //   const token = response.data.token.access;
      // if (response.data.message === "success"){
      // Store the token in local storage or a global state for lnpmater use
    //   localStorage.setItem("token", token);

      // Redirect to the main page
      window.location.href = "/signin";
    //   console.success(response.data.message);

      // }
      // else{
      //   toast.error(response.data.message)
      // }
    } catch (error) {
      console.error(error.response.data.detail);
    }
  };

  return (
    <div>
      {/* Your component logic here */}
      <div>
        <section className="bg-gray-50 dark:bg-gray-900 mb-auto">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="/main"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              #100DaysOf__
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="**********"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PassResetFinal;

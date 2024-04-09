import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/request-reset-email/', formData);
      
      // if (response.data.message === "success"){
          // Store the token in local storage or a global state for later use
        
        // Redirect to the main page
        console.log(response)
        toast.success("We have sent you a email for password reset")
        await delay(2000);
        window.location.href = '/signin';
      // }
      // else{
      //   toast.error(response.data.message)
      // }
      
    } catch (error) {
      toast.error(error.response.data.detail);

    }
  };

  return (
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
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              value={formData.email} onChange={handleChange} required
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
  );
};

export default PasswordReset;

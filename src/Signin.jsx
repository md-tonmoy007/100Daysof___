import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const LoadToast=()=>{
  try {
    toast.success("Welcome to the signin page")
  } catch (error) {
    console.log(error)
  }
}


const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [error, setError] = useState(null);
 
  useEffect(() => {
    // JavaScript code to be executed when the component mounts
    toast.success('Welcome please sign in!');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      const Access_token = response.data.token.access;
      const refresh_token = response.data.token.refresh;
      // if (response.data.message === "success"){
          // Store the token in local storage or a global state for later use
        localStorage.setItem('accessToken', Access_token);
        localStorage.setItem('refreshToken', refresh_token);
        
        // Redirect to the main page
        window.location.href = '/';
        console.success(response.data.message)
        
      // }
      // else{
      //   toast.error(response.data.message)
      // }
      
    } catch (error) {
      toast.error(error.response.data.detail);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center mb-8">
          <a href="/main" className="flex items-center gap-2 text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 dark:text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            #100DaysOf__
          </a>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Please enter your details.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="/request-reset-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Don't have an account? </span>
          <a href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;

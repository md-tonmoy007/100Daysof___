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
    <div className="min-h-screen flex items-center justify-center bg-twitter-background">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-twitter-surface border border-twitter-border">
        <div className="flex flex-col items-center mb-8">
          <a href="/main" className="flex items-center gap-2 text-3xl font-extrabold text-twitter-primary tracking-tight hover:text-twitter-primary/80 transition-colors">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-twitter-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            #100DaysOf__
          </a>
          <h1 className="mt-4 text-2xl font-bold text-twitter-text">Sign in to your account</h1>
          <p className="text-twitter-textSecondary text-sm mt-1">Welcome back! Please enter your details.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-twitter-text">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-twitter-text">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="/request-reset-password" className="text-sm text-twitter-primary hover:text-twitter-primary/80 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twitter-primary/50"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-twitter-textSecondary text-sm">Don't have an account? </span>
          <a href="/signup" className="text-twitter-primary font-semibold hover:text-twitter-primary/80 hover:underline transition-colors">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;

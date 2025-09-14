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
    <div className="min-h-screen bg-twitter-background">
      <section className="bg-twitter-background">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/main"
            className="flex items-center mb-6 text-3xl font-extrabold text-twitter-primary tracking-tight hover:text-twitter-primary/80 transition-colors"
          >
            #100DaysOf__
          </a>
          <div className="w-full bg-twitter-surface rounded-3xl shadow-2xl border border-twitter-border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-twitter-text mb-2">Reset your password</h1>
                <p className="text-twitter-textSecondary text-sm">Enter your email address and we'll send you a link to reset your password.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-twitter-text"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
                    placeholder="name@company.com"
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twitter-primary/50"
                >
                  Send reset link
                </button>
              </form>
              <div className="text-center">
                <a href="/signin" className="text-sm text-twitter-primary hover:text-twitter-primary/80 hover:underline transition-colors">
                  Back to sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;

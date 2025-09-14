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
                <h1 className="text-2xl font-bold text-twitter-text mb-2">Set new password</h1>
                <p className="text-twitter-textSecondary text-sm">Enter your new password below.</p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-semibold text-twitter-text"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
                    placeholder="**********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twitter-primary/50"
                >
                  Update Password
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
}

export default PassResetFinal;

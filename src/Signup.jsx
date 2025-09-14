import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { delay } from "./utils/delay";

const LoadToast = () =>{
  try {
    toast.success("Welcome to the sign up page")
  } catch (error) {
    console.log(error)
  }
}

const Signup = () => {
  // const [responseData, setResponseData] = useState(null);
  // const [responseError, setResponseError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password1: "",
    password2: "",
  });


  // tel, dal, lobon, dim
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        formData
      );
      console.log(response.data);


      if (response.data.status === "success") {
        toast.success("we have sent you a verification mail")
        await delay(2000)
        window.location.href = "/signin";
      } else {
        console.log("hello");

        console.log(response.data.messages);
        toast.error(response.data.messages);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error);
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
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-twitter-text text-center">
                Create an account
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold text-twitter-text"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
                    placeholder="Username (example: John, doe)"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                <div>
                  <label
                    htmlFor="password1"
                    className="block mb-2 text-sm font-semibold text-twitter-text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder="************"
                    className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password2"
                    className="block mb-2 text-sm font-semibold text-twitter-text"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="************"
                    className="w-full px-4 py-3 rounded-xl border border-twitter-border bg-twitter-backgroundSecondary text-twitter-text placeholder-twitter-textSecondary focus:ring-2 focus:ring-twitter-primary focus:border-twitter-primary focus:outline-none transition-all"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twitter-primary/50"
                >
                  Create an account
                </button>
                <p className="text-sm text-center text-twitter-textSecondary">
                  Already have an account?{" "}
                  <a
                    href="/signin"
                    className="font-semibold text-twitter-primary hover:text-twitter-primary/80 hover:underline transition-colors"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;

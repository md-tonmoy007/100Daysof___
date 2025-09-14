import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';



function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState("");
    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        if(token){
            console.log(token)
            axios.get(`http://localhost:8000/api/email-verify/?token=${token}`)
            .then(response => {
              // Handle successful verification, e.g., show a success message
              console.log('Email verified successfully');
              setMessage("Successful")
              // Redirect the user to a success page or dashboard
            //   navigate('/');
            })
            .catch(error => {
                // Handle verification error, e.g., show an error message
                console.error('Email verification failed:', error);
                // Redirect the user to an error page or prompt them to try again
                setMessage("Unsuccessfull")
                // navigate('/signup');
              });
        }
        else {
            // Handle case where token is not present
            console.error('Token not found in URL');
            setMessage("Unsuccessful")
            // Redirect the user to an error page or prompt them to try again
            // navigate('/signup');
          }

      }, [navigate, location.search]);


  return (
    <div className="min-h-screen bg-twitter-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-twitter-surface rounded-3xl border border-twitter-border shadow-2xl p-8">
          <div className="mb-6">
            <a
              href="/main"
              className="text-3xl font-extrabold text-twitter-primary tracking-tight hover:text-twitter-primary/80 transition-colors"
            >
              #100DaysOf__
            </a>
          </div>
          
          <div className="mb-6">
            {message === "Successful" ? (
              <div className="text-6xl mb-4">✅</div>
            ) : message === "Unsuccessfull" || message === "Unsuccessful" ? (
              <div className="text-6xl mb-4">❌</div>
            ) : (
              <div className="text-6xl mb-4">⏳</div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-twitter-text">
              Email Verification
            </h1>
            
            <p className="text-lg text-twitter-text">
              Verification is{" "}
              <span className={`font-semibold ${
                message === "Successful" 
                  ? "text-green-400" 
                  : message === "Unsuccessfull" || message === "Unsuccessful"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}>
                {message || "Processing..."}
              </span>
            </p>

            {(message === "Successful" || message === "Unsuccessfull" || message === "Unsuccessful") && (
              <div className="pt-4">
                <a 
                  href="/signin"
                  className="inline-flex items-center px-6 py-3 bg-twitter-primary hover:bg-twitter-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twitter-primary/50"
                >
                  Continue to Sign In
                </a>
              </div>
            )}
          </div>

          {message === "Unsuccessfull" || message === "Unsuccessful" ? (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-400">
                Verification failed. Please check your email for a new verification link or contact support.
              </p>
            </div>
          ) : message === "Successful" ? (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-400">
                Your email has been successfully verified! You can now sign in to your account.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Verify
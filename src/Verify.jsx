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
    <div
    className='w-full h-[100vh] text-white text-2xl flex justify-center items-center'>
        Verification is {message}  <span className='text-cyan-300 p-4 underline'> <a href="/signin">Log in</a> </span>
    </div>
  )
}

export default Verify
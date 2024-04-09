import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signin from "./Signin"
import Signup from "./Signup"
import MainPage from "./MainPage"
import Verify from "./Verify";
import PasswordReset from "./PasswordReset";
import PassResetFinal from "./PassResetFinal";
import ProfilePage from "./profile/ProfilePage";
import EditProfilePage from "./profile/EditProfilePage";
import CreatePost from "./posts/CreatePost";

function App() {
  return (
    <div className="App bg-gray-50 dark:bg-gray-900 mb-auto min-h-[100vh]">
      <Routes>
        <Route path="/signin" element={ <Signin/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/" element={ <MainPage/> } />
        <Route path="/email-verify/" element={ <Verify/> } />
        <Route path="/request-reset-password" element={<PasswordReset/>}/>
        <Route path="/api/password-reset/:uidb64/:token" element={<PassResetFinal/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        <Route path="/profile/edit" element={<EditProfilePage/>}/>
        <Route path="/posts/create" element={<CreatePost/>}/>
      </Routes> 
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signin from "./Signin"
import Signup from "./Signup"
import MainPage from "./MainPage"

function App() {
  return (
    <div className="App bg-gray-50 dark:bg-gray-900 mb-auto min-h-[100vh]">
      <Routes>
        <Route path="/" element={ <Signin/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/main" element={ <MainPage/> } />
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

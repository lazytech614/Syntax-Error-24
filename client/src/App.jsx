import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./contexts/AuthContext";
import ProfileInfo from "./pages/ProfileInfo";
import UploadNote from "./pages/UploadNote";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {

  

  const {authUser} = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <SignIn />} />
        <Route path="/profile" element={authUser ? <ProfileInfo /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/update-profile" element={authUser ? <UpdateProfile /> : <SignIn />} />
        <Route path="/upload-note" element={authUser ? <UploadNote /> : <SignIn />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;

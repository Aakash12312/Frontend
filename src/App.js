import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import Login from "../src/components/Login";
import Profile from "../src/components/Profile";
import HeroSection from "../src/components/HeroSection";
import AddBlog from "./components/Addblog";
import Blog from "./components/Blog";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include", // To include the cookie in the request
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUserName("");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", name);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const name = localStorage.getItem("userName");

    if (loggedIn && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userName={userName} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/blog/addBlog" element={<AddBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/user/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/user/profile" element={isLoggedIn ? <Profile userName={userName} /> : <div>Please log in</div>} />
      </Routes>
    </Router>
  );
};

export default App;

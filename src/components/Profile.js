import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/user/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include credentials to send the cookie
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUserData(data.user); // Set user data
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile. Please log in again.");
      });
  }, [navigate]);

  if (!userData) {
    return <p>Loading...</p>; // Display loading until user data is fetched
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>ID: {userData.id}</p>
    </div>
  );
};

export default Profile;

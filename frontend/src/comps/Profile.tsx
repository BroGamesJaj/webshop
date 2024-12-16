import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, setUser, clearCart } = useAppContext();
  const [form, setForm] = useState({ username: user?.username || "", password: "" });
  let navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      console.log("hi");
      clearCart
      navigate("/login");
    }
  }, [user, navigate]);

    const handleUsernameChange = (e: React.FormEvent, u: string) => {
      e.preventDefault();
      axios.patch(`http://localhost:3000/users/${u}`, { username: form.username }).then((res) => {setUser(res.data), alert("Succesfully changed username")}).catch((err) => {if(err.response.data.message == "Username already exists"){ alert("Username already exists!") }});;
    };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6 || !/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      alert("Password must be at least 6 characters, include uppercase, lowercase, and a number.");
      return;
    }
    let u = user!.username;
    axios.patch(`http://localhost:3000/users/${u}`, { password: form.password }).then(() => alert("Password updated!"));
  };
  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <form onSubmit={(event) => handleUsernameChange(event,user!.username)}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <button type="submit">Update Username</button>
      </form>
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default Profile;
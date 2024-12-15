import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

const Profile: React.FC = () => {
  const { user, setUser } = useAppContext();
  const [form, setForm] = useState({ username: user?.username || "", password: "" });

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put("http://localhost:3000/users/username", { username: form.username }).then((res) => setUser(res.data));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6 || !/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password) || !/\d/.test(form.password)) {
      alert("Password must be at least 6 characters, include uppercase, lowercase, and a number.");
      return;
    }
    axios.put("http://localhost:3000/users/password", { password: form.password }).then(() => alert("Password updated!"));
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleUsernameChange}>
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
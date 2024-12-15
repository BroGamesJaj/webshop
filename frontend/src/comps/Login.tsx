import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";

const Login: React.FC = () => {
  const { user, setUser } = useAppContext();
  const [form, setForm] = useState({ username: "", password: "" });
    console.log(user)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users/login", form).then((res) => setUser(res.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@veaco.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <p>Access the administration dashboard.</p>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
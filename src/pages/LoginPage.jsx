import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/auth.css";

function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(form);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);

            if (data.user.customerId) {
                localStorage.setItem("customerId", data.user.customerId);
            }

            if (data.user.role === "Admin") {
                localStorage.setItem("adminLoggedIn", "true");
                navigate("/admin/dashboard");
            } else if (data.user.role === "Staff") {
                navigate("/staff/register-customer");
            } else if (data.user.role === "Customer") {
                navigate("/customer/manage-profile");
            } else {
                navigate("/");
            }
        } catch {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleLogin}>
                <Link to="/" className="back-home-btn">
                    Back to Home
                </Link>
                <h1>Login</h1>
                <p>Access your Veaco account using your registered email.</p>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                />

                <label>Password</label>

                <div className="login-password-field">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />

                    <button
                        type="button"
                        className="login-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                

                <button type="submit">Login</button>

                {error && <div className="auth-error">{error}</div>}

                <p className="auth-link">
                    New customer? <Link to="/customer-register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
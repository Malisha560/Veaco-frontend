import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/self-register.css";

const API_BASE = "http://localhost:5285";

function SelfRegisterPage() {
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
    });

    const [vehicle, setVehicle] = useState({
        vehicleNumber: "",
        brand: "",
        model: "",
    });

    const [addVehicle, setAddVehicle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (setter) => (e) =>
        setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        try {
            const payload = {
                ...form,
                vehicle: addVehicle && vehicle.vehicleNumber ? vehicle : null,
            };

            const res = await axios.post(`${API_BASE}/api/customers/self-register`, payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data || "Registration failed.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <span className="register-badge">Customer Access</span>
                <h1>Create your Veaco account</h1>
                <p>
                    Register your details and add your vehicle information to manage
                    appointments, requests, reviews, and service history.
                </p>
            </div>

            <div className="register-card">
                <form onSubmit={handleSubmit}>
                    <Link to="/" className="back-home-btn">
                         Back to Home
                    </Link>
                    <h2>Your Details</h2>

                    <label>Full Name</label>
                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={set(setForm)}
                        placeholder="Enter full name"
                        required
                    />

                    <label>Phone</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={set(setForm)}
                        placeholder="Enter phone number"
                        required
                    />

                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={set(setForm)}
                        placeholder="Enter email address"
                        required
                    />

                    <label>Password</label>
                    <div className="password-field">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={set(setForm)}
                            placeholder="Create password"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            checked={addVehicle}
                            onChange={() => setAddVehicle(!addVehicle)}
                        />
                        Add my vehicle
                    </label>

                    {addVehicle && (
                        <div className="vehicle-box">
                            <h3>Vehicle Details</h3>

                            <label>Vehicle Number</label>
                            <input
                                name="vehicleNumber"
                                value={vehicle.vehicleNumber}
                                onChange={set(setVehicle)}
                                placeholder="e.g. BA 1 PA 1234"
                            />

                            <label>Brand</label>
                            <input
                                name="brand"
                                value={vehicle.brand}
                                onChange={set(setVehicle)}
                                placeholder="e.g. Suzuki"
                            />

                            <label>Model</label>
                            <input
                                name="model"
                                value={vehicle.model}
                                onChange={set(setVehicle)}
                                placeholder="e.g. Avenis"
                            />
                        </div>
                    )}

                    <button type="submit" className="register-btn">Create Account</button>

                    <p className="auth-link">
                       Already Have an Account? <Link to="/login">Login Now</Link>
                    </p>
                </form>

                {error && <div className="register-error">{String(error)}</div>}

                {result && (
                    <div className="register-success">
                        <h3>Registration successful</h3>
                        <p>{result.message}</p>
                        <p>
                            <b>Customer ID:</b> {result.customerId}
                        </p>

                        <Link to="/login" className="login-redirect-btn">
                            Continue to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelfRegisterPage;
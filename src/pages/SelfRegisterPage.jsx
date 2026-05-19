import { useState } from "react";
import axios from "axios";
import "../styles/self-register.css";

const API_BASE = "http://localhost:5285";

function SelfRegisterPage() {
    const [form, setForm] = useState({ fullName: "", phone: "", email: "" });
    const [vehicle, setVehicle] = useState({ vehicleNumber: "", brand: "", model: "" });
    const [addVehicle, setAddVehicle] = useState(false);
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
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 12 · Customer</span>
                <h1>Customer Self-Registration</h1>
                <p className="subtitle">New customers can register and add their vehicle information.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Your Details</h3>
                <label>Full Name</label>
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={set(setForm)}
                    placeholder="Your full name"
                    required
                />
                <label>Phone</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={set(setForm)}
                    placeholder="Your phone number"
                    required
                />
                <label>Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={set(setForm)}
                    placeholder="Your email"
                    required
                />

                <div className="toggle-row">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={addVehicle}
                            onChange={() => setAddVehicle(!addVehicle)}
                        />
                        &nbsp; Add My Vehicle
                    </label>
                </div>

                {addVehicle && (
                    <div className="nested-card">
                        <h4>Vehicle Details</h4>
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
                            placeholder="e.g. Toyota"
                        />
                        <label>Model</label>
                        <input
                            name="model"
                            value={vehicle.model}
                            onChange={set(setVehicle)}
                            placeholder="e.g. Vigo"
                        />
                    </div>
                )}

                <button type="submit" className="btn-primary">
                    Register
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Welcome to Veaco!</h3>
                    <p>{result.message}</p>
                    <p>
                        <b>Your Customer ID:</b> {result.customerId} — save this for future use.
                    </p>
                </div>
            )}
        </section>
    );
}

export default SelfRegisterPage;

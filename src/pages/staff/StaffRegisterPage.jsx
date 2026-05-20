import { useState } from "react";
import axios from "axios";
import "../../styles/staff-register.css"

const API_BASE = "http://localhost:5285";

function StaffRegisterPage() {
    const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "" });
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
            const res = await axios.post(`${API_BASE}/api/customers/register`, payload);
            setResult(res.data);
            setForm({ fullName: "", phone: "", email: "", password: "" });
            setVehicle({ vehicleNumber: "", brand: "", model: "" });
            setAddVehicle(false);
        } catch (err) {
            setError(err.response?.data || "Registration failed.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge staff-badge">Feature 6 · Staff</span>
                <h1>Register New Customer</h1>
                <p className="subtitle">Staff can register new customers and add their vehicle details.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Customer Information</h3>
                <label>Full Name</label>
                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={set(setForm)}
                    placeholder="e.g. Ram Sharma"
                    required
                />
                <label>Phone</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={set(setForm)}
                    placeholder="e.g. 9800000000"
                    required
                />
                <label>Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={set(setForm)}
                    placeholder="e.g. ram@mail.com"
                    required
                />
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={set(setForm)}
                    placeholder="Create customer password"
                    required
                />

                <div className="toggle-row">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={addVehicle}
                            onChange={() => setAddVehicle(!addVehicle)}
                        />
                        &nbsp; Add Vehicle Details
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
                            placeholder="e.g. Honda"
                        />
                        <label>Model</label>
                        <input
                            name="model"
                            value={vehicle.model}
                            onChange={set(setVehicle)}
                            placeholder="e.g. Activa"
                        />
                    </div>
                )}

                <button type="submit" className="btn-primary">
                    Register Customer
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Customer Registered</h3>
                    <p>
                        <b>Customer ID:</b> {result.customerId}
                    </p>
                    <p>
                        <b>Name:</b> {result.fullName}
                    </p>
                    {result.vehiclesAdded > 0 && (
                        <p>
                            <b>Vehicles Added:</b> {result.vehiclesAdded}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}

export default StaffRegisterPage;

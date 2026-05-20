import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/manage-profile.css";

const API_BASE = "http://localhost:5285";

function ManageProfilePage() {
    const customerId = localStorage.getItem("customerId");

    const [customer, setCustomer] = useState(null);
    const [profileForm, setProfileForm] = useState({
        fullName: "",
        phone: "",
        email: ""
    });

    const [vehicleForm, setVehicleForm] = useState({
        vehicleNumber: "",
        brand: "",
        model: ""
    });

    const [editingVehicle, setEditingVehicle] = useState(null);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const setP = (e) =>
        setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const setV = (e) =>
        setVehicleForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const loadCustomer = async () => {
        if (!customerId) {
            setError("Customer session not found. Please login again.");
            return;
        }

        setError("");
        setMsg("");

        try {
            const res = await axios.get(`${API_BASE}/api/customers/${customerId}/details`);

            setCustomer(res.data);
            setProfileForm({
                fullName: res.data.fullName,
                phone: res.data.phone,
                email: res.data.email,
            });
        } catch (err) {
            setError(err.response?.data || "Customer profile could not be loaded.");
        }
    };

    useEffect(() => {
        loadCustomer();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");

        try {
            const res = await axios.put(
                `${API_BASE}/api/customers/${customerId}`,
                profileForm
            );

            setMsg(res.data.message);
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Update failed.");
        }
    };

    const addVehicle = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");

        try {
            const res = await axios.post(
                `${API_BASE}/api/customers/${customerId}/vehicles`,
                vehicleForm
            );

            setMsg(res.data.message);
            setVehicleForm({ vehicleNumber: "", brand: "", model: "" });
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Failed to add vehicle.");
        }
    };

    const updateVehicle = async (vehicleId) => {
        setError("");
        setMsg("");

        try {
            const res = await axios.put(
                `${API_BASE}/api/customers/${customerId}/vehicles/${vehicleId}`,
                vehicleForm
            );

            setMsg(res.data.message);
            setEditingVehicle(null);
            setVehicleForm({ vehicleNumber: "", brand: "", model: "" });
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Failed to update vehicle.");
        }
    };

    const deleteVehicle = async (vehicleId) => {
        if (!window.confirm("Remove this vehicle?")) return;

        setError("");
        setMsg("");

        try {
            const res = await axios.delete(
                `${API_BASE}/api/customers/${customerId}/vehicles/${vehicleId}`
            );

            setMsg(res.data.message);
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Failed to remove vehicle.");
        }
    };

    const startEditVehicle = (v) => {
        setEditingVehicle(v.id);
        setVehicleForm({
            vehicleNumber: v.vehicleNumber,
            brand: v.brand,
            model: v.model,
        });
    };

    return (
        <section>
            <div className="page-header">
                
                <h1>Manage Profile & Vehicles</h1>
                <p className="subtitle">
                    View and update your own profile and registered vehicles.
                </p>
            </div>

            {error && <div className="error">{String(error)}</div>}
            {msg && <div className="success-msg">✓ {msg}</div>}

            {!customer && !error && (
                <div className="card">
                    <p>Loading your profile...</p>
                </div>
            )}

            {customer && (
                <>
                    <form className="card" onSubmit={updateProfile}>
                        <h3 className="card-title">My Profile</h3>

                        <label>Full Name</label>
                        <input
                            name="fullName"
                            value={profileForm.fullName}
                            onChange={setP}
                        />

                        <label>Phone</label>
                        <input
                            name="phone"
                            value={profileForm.phone}
                            onChange={setP}
                        />

                        <label>Email</label>
                        <input
                            name="email"
                            value={profileForm.email}
                            onChange={setP}
                        />

                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </form>

                    <div className="card">
                        <h3 className="card-title">My Vehicles</h3>

                        {customer.vehicles?.length > 0 ? (
                            customer.vehicles.map((v) => (
                                <div key={v.id} className="vehicle-row">
                                    {editingVehicle === v.id ? (
                                        <div className="nested-card">
                                            <label>Vehicle Number</label>
                                            <input
                                                name="vehicleNumber"
                                                value={vehicleForm.vehicleNumber}
                                                onChange={setV}
                                            />

                                            <label>Brand</label>
                                            <input
                                                name="brand"
                                                value={vehicleForm.brand}
                                                onChange={setV}
                                            />

                                            <label>Model</label>
                                            <input
                                                name="model"
                                                value={vehicleForm.model}
                                                onChange={setV}
                                            />

                                            <div className="btn-row">
                                                <button
                                                    type="button"
                                                    onClick={() => updateVehicle(v.id)}
                                                    className="btn-primary btn-sm"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setEditingVehicle(null)}
                                                    className="btn-ghost btn-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="vehicle-info">
                                            <span className="tag">
                                                {v.vehicleNumber} — {v.brand} {v.model}
                                            </span>

                                            <div className="btn-row">
                                                <div className="vehicle-actions">
                                                    <button>Edit</button>
                                                    <button className="btn-danger">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="muted">No vehicles registered yet.</p>
                        )}
                    </div>

                    <form className="card" onSubmit={addVehicle}>
                        <h3 className="card-title">Add New Vehicle</h3>

                        <label>Vehicle Number</label>
                        <input
                            name="vehicleNumber"
                            value={vehicleForm.vehicleNumber}
                            onChange={setV}
                            placeholder="e.g. BA 1 PA 5678"
                            required
                        />

                        <label>Brand</label>
                        <input
                            name="brand"
                            value={vehicleForm.brand}
                            onChange={setV}
                            placeholder="e.g. Suzuki"
                        />

                        <label>Model</label>
                        <input
                            name="model"
                            value={vehicleForm.model}
                            onChange={setV}
                            placeholder="e.g. Swift"
                        />

                        <button type="submit" className="btn-primary">
                            Add Vehicle
                        </button>
                    </form>
                </>
            )}
        </section>
    );
}

export default ManageProfilePage;
import { useState } from "react";
import axios from "axios";
import "./Hrithik.css";

const API_BASE = "http://localhost:5285";

function Hrithik() {
    const [page, setPage] = useState("staff-register");

    const navItems = [
        { key: "staff-register", label: "F6: Register Customer", role: "Staff" },
        { key: "sales", label: "F7: Sales Invoice", role: "Staff" },
        { key: "customer-lookup", label: "F8: Customer Lookup", role: "Staff" },
        { key: "self-register", label: "F12: Self Register", role: "Customer" },
        { key: "manage-profile", label: "F12: Manage Profile", role: "Customer" },
        { key: "book-appointment", label: "F13: Book Appointment", role: "Customer" },
        { key: "part-request", label: "F13: Request Part", role: "Customer" },
        { key: "service-review", label: "F13: Review Service", role: "Customer" },
        { key: "history", label: "F14: My History", role: "Customer" },
    ];

    const staffPages = navItems.filter(n => n.role === "Staff");
    const customerPages = navItems.filter(n => n.role === "Customer");

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">🔧</span>
                    <h2>Veaco</h2>
                </div>

                <div className="nav-group">
                    <div className="nav-group-label">Staff Portal</div>
                    {staffPages.map(item => (
                        <button
                            key={item.key}
                            className={page === item.key ? "active" : ""}
                            onClick={() => setPage(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="nav-group">
                    <div className="nav-group-label">Customer Portal</div>
                    {customerPages.map(item => (
                        <button
                            key={item.key}
                            className={page === item.key ? "active" : ""}
                            onClick={() => setPage(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="content">
                {page === "staff-register" && <StaffRegisterPage />}
                {page === "sales" && <SalesInvoicePage />}
                {page === "customer-lookup" && <CustomerDetailsPage />}
                {page === "self-register" && <SelfRegisterPage />}
                {page === "manage-profile" && <ManageProfilePage />}
                {page === "book-appointment" && <BookAppointmentPage />}
                {page === "part-request" && <PartRequestPage />}
                {page === "service-review" && <ServiceReviewPage />}
                {page === "history" && <HistoryPage />}
            </main>
        </div>
    );
}

// ...existing subcomponents from App.jsx...

/* ─── Feature 6: Staff registers customer + vehicle ─── */
function StaffRegisterPage() {
    const [form, setForm] = useState({ fullName: "", phone: "", email: "" });
    const [vehicle, setVehicle] = useState({ vehicleNumber: "", brand: "", model: "" });
    const [addVehicle, setAddVehicle] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (setter) => (e) => setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setResult(null);
        try {
            const payload = {
                ...form,
                vehicle: addVehicle && vehicle.vehicleNumber ? vehicle : null
            };
            const res = await axios.post(`${API_BASE}/api/customers/register`, payload);
            setResult(res.data);
            setForm({ fullName: "", phone: "", email: "" });
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
                <input name="fullName" value={form.fullName} onChange={set(setForm)} placeholder="e.g. Ram Sharma" required />
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={set(setForm)} placeholder="e.g. 9800000000" required />
                <label>Email</label>
                <input name="email" value={form.email} onChange={set(setForm)} placeholder="e.g. ram@mail.com" required />

                <div className="toggle-row">
                    <label className="toggle-label">
                        <input type="checkbox" checked={addVehicle} onChange={() => setAddVehicle(!addVehicle)} />
                        &nbsp; Add Vehicle Details
                    </label>
                </div>

                {addVehicle && (
                    <div className="nested-card">
                        <h4>Vehicle Details</h4>
                        <label>Vehicle Number</label>
                        <input name="vehicleNumber" value={vehicle.vehicleNumber} onChange={set(setVehicle)} placeholder="e.g. BA 1 PA 1234" />
                        <label>Brand</label>
                        <input name="brand" value={vehicle.brand} onChange={set(setVehicle)} placeholder="e.g. Honda" />
                        <label>Model</label>
                        <input name="model" value={vehicle.model} onChange={set(setVehicle)} placeholder="e.g. Activa" />
                    </div>
                )}

                <button type="submit" className="btn-primary">Register Customer</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Customer Registered</h3>
                    <p><b>Customer ID:</b> {result.customerId}</p>
                    <p><b>Name:</b> {result.fullName}</p>
                    {result.vehiclesAdded > 0 && <p><b>Vehicles Added:</b> {result.vehiclesAdded}</p>}
                </div>
            )}
        </section>
    );
}

// ...rest of subcomponents (SalesInvoicePage, CustomerDetailsPage, etc.) are identical to App.jsx...

export default Hrithik;

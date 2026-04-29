import { useState } from "react";
import axios from "axios";
import "./index.css";

const API_BASE = "http://localhost:5285";

function App() {
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

/* ─── Feature 7 (existing): Sales Invoice ─── */
function SalesInvoicePage() {
    const [customerId, setCustomerId] = useState("1");
    const [vehiclePartId, setVehiclePartId] = useState("1");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const createInvoice = async (e) => {
        e.preventDefault();
        setError(""); setResult(null);
        try {
            const res = await axios.post(`${API_BASE}/api/sales/create-invoice`, {
                customerId: Number(customerId),
                items: [{ vehiclePartId: Number(vehiclePartId), quantity: Number(quantity) }],
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to create invoice.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge staff-badge">Feature 7 · Staff</span>
                <h1>Create Sales Invoice</h1>
                <p className="subtitle">Sell vehicle parts and generate a sales invoice with automatic 10% discount for orders above Rs. 5000.</p>
            </div>

            <form className="card" onSubmit={createInvoice}>
                <h3 className="card-title">Invoice Details</h3>
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Enter customer ID" />
                <label>Vehicle Part ID</label>
                <input value={vehiclePartId} onChange={(e) => setVehiclePartId(e.target.value)} placeholder="Enter part ID" />
                <label>Quantity</label>
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" />
                <button type="submit" className="btn-primary">Create Invoice</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Invoice Created</h3>
                    <p><b>Invoice ID:</b> {result.invoiceId}</p>
                    <p><b>Subtotal:</b> Rs. {result.subTotal}</p>
                    <p><b>Discount:</b> Rs. {result.discountAmount}</p>
                    <p><b>Grand Total:</b> Rs. {result.grandTotal}</p>
                </div>
            )}
        </section>
    );
}

/* ─── Feature 8 (existing): Customer Lookup ─── */
function CustomerDetailsPage() {
    const [customerId, setCustomerId] = useState("1");
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    const lookup = async () => {
        setError(""); setCustomer(null); setHistory([]);
        try {
            const [detRes, histRes] = await Promise.all([
                axios.get(`${API_BASE}/api/customers/${customerId}/details`),
                axios.get(`${API_BASE}/api/customers/${customerId}/purchase-history`),
            ]);
            setCustomer(detRes.data);
            setHistory(histRes.data.invoices || histRes.data);
        } catch (err) {
            setError(err.response?.data || "Failed to load customer.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge staff-badge">Feature 8 · Staff</span>
                <h1>Customer Lookup</h1>
                <p className="subtitle">View customer details, vehicles, and purchase history.</p>
            </div>

            <div className="card">
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Enter customer ID" />
                <button onClick={lookup} className="btn-primary">View Details</button>
            </div>

            {error && <div className="error">{String(error)}</div>}

            {customer && (
                <div className="card">
                    <h3 className="card-title">Customer Info</h3>
                    <div className="info-grid">
                        <div><span className="info-label">Name</span><span>{customer.fullName}</span></div>
                        <div><span className="info-label">Phone</span><span>{customer.phone}</span></div>
                        <div><span className="info-label">Email</span><span>{customer.email}</span></div>
                    </div>
                    <h4>Vehicles</h4>
                    {customer.vehicles?.length > 0 ? customer.vehicles.map(v => (
                        <div key={v.id} className="tag">{v.vehicleNumber} — {v.brand} {v.model}</div>
                    )) : <p className="muted">No vehicles registered.</p>}
                </div>
            )}

            {history.length > 0 && (
                <div className="card">
                    <h3 className="card-title">Purchase History</h3>
                    {history.map(inv => (
                        <div key={inv.id} className="invoice-box">
                            <p><b>Invoice #{inv.id}</b></p>
                            <p>Subtotal: Rs. {inv.subTotal} | Discount: Rs. {inv.discountAmount} | <b>Total: Rs. {inv.grandTotal}</b></p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

/* ─── Feature 12: Customer Self-Register ─── */
function SelfRegisterPage() {
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
                <input name="fullName" value={form.fullName} onChange={set(setForm)} placeholder="Your full name" required />
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={set(setForm)} placeholder="Your phone number" required />
                <label>Email</label>
                <input name="email" value={form.email} onChange={set(setForm)} placeholder="Your email" required />

                <div className="toggle-row">
                    <label className="toggle-label">
                        <input type="checkbox" checked={addVehicle} onChange={() => setAddVehicle(!addVehicle)} />
                        &nbsp; Add My Vehicle
                    </label>
                </div>

                {addVehicle && (
                    <div className="nested-card">
                        <h4>Vehicle Details</h4>
                        <label>Vehicle Number</label>
                        <input name="vehicleNumber" value={vehicle.vehicleNumber} onChange={set(setVehicle)} placeholder="e.g. BA 1 PA 1234" />
                        <label>Brand</label>
                        <input name="brand" value={vehicle.brand} onChange={set(setVehicle)} placeholder="e.g. Toyota" />
                        <label>Model</label>
                        <input name="model" value={vehicle.model} onChange={set(setVehicle)} placeholder="e.g. Vigo" />
                    </div>
                )}

                <button type="submit" className="btn-primary">Register</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Welcome to Veaco!</h3>
                    <p>{result.message}</p>
                    <p><b>Your Customer ID:</b> {result.customerId} — save this for future use.</p>
                </div>
            )}
        </section>
    );
}

/* ─── Feature 12: Manage Profile & Vehicles ─── */
function ManageProfilePage() {
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [profileForm, setProfileForm] = useState({ fullName: "", phone: "", email: "" });
    const [vehicleForm, setVehicleForm] = useState({ vehicleNumber: "", brand: "", model: "" });
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const setP = (e) => setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const setV = (e) => setVehicleForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const loadCustomer = async () => {
        setError(""); setMsg(""); setCustomer(null);
        try {
            const res = await axios.get(`${API_BASE}/api/customers/${customerId}/details`);
            setCustomer(res.data);
            setProfileForm({ fullName: res.data.fullName, phone: res.data.phone, email: res.data.email });
        } catch (err) {
            setError(err.response?.data || "Customer not found.");
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        setError(""); setMsg("");
        try {
            const res = await axios.put(`${API_BASE}/api/customers/${customerId}`, profileForm);
            setMsg(res.data.message);
        } catch (err) {
            setError(err.response?.data || "Update failed.");
        }
    };

    const addVehicle = async (e) => {
        e.preventDefault();
        setError(""); setMsg("");
        try {
            const res = await axios.post(`${API_BASE}/api/customers/${customerId}/vehicles`, vehicleForm);
            setMsg(res.data.message);
            setVehicleForm({ vehicleNumber: "", brand: "", model: "" });
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Failed to add vehicle.");
        }
    };

    const updateVehicle = async (vehicleId) => {
        setError(""); setMsg("");
        try {
            const res = await axios.put(`${API_BASE}/api/customers/${customerId}/vehicles/${vehicleId}`, vehicleForm);
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
        setError(""); setMsg("");
        try {
            const res = await axios.delete(`${API_BASE}/api/customers/${customerId}/vehicles/${vehicleId}`);
            setMsg(res.data.message);
            loadCustomer();
        } catch (err) {
            setError(err.response?.data || "Failed to remove vehicle.");
        }
    };

    const startEditVehicle = (v) => {
        setEditingVehicle(v.id);
        setVehicleForm({ vehicleNumber: v.vehicleNumber, brand: v.brand, model: v.model });
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 12 · Customer</span>
                <h1>Manage Profile & Vehicles</h1>
                <p className="subtitle">Update your profile information and manage your registered vehicles.</p>
            </div>

            <div className="card">
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Enter your customer ID" />
                <button onClick={loadCustomer} className="btn-primary">Load Profile</button>
            </div>

            {error && <div className="error">{String(error)}</div>}
            {msg && <div className="success-msg">✓ {msg}</div>}

            {customer && (
                <>
                    <form className="card" onSubmit={updateProfile}>
                        <h3 className="card-title">Update Profile</h3>
                        <label>Full Name</label>
                        <input name="fullName" value={profileForm.fullName} onChange={setP} />
                        <label>Phone</label>
                        <input name="phone" value={profileForm.phone} onChange={setP} />
                        <label>Email</label>
                        <input name="email" value={profileForm.email} onChange={setP} />
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </form>

                    <div className="card">
                        <h3 className="card-title">My Vehicles</h3>
                        {customer.vehicles?.length > 0 ? customer.vehicles.map(v => (
                            <div key={v.id} className="vehicle-row">
                                {editingVehicle === v.id ? (
                                    <div className="nested-card">
                                        <label>Vehicle Number</label>
                                        <input name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={setV} />
                                        <label>Brand</label>
                                        <input name="brand" value={vehicleForm.brand} onChange={setV} />
                                        <label>Model</label>
                                        <input name="model" value={vehicleForm.model} onChange={setV} />
                                        <div className="btn-row">
                                            <button onClick={() => updateVehicle(v.id)} className="btn-primary btn-sm">Save</button>
                                            <button onClick={() => setEditingVehicle(null)} className="btn-ghost btn-sm">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="vehicle-info">
                                        <span className="tag">{v.vehicleNumber} — {v.brand} {v.model}</span>
                                        <div className="btn-row">
                                            <button onClick={() => startEditVehicle(v)} className="btn-ghost btn-sm">Edit</button>
                                            <button onClick={() => deleteVehicle(v.id)} className="btn-danger btn-sm">Remove</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )) : <p className="muted">No vehicles registered yet.</p>}
                    </div>

                    <form className="card" onSubmit={addVehicle}>
                        <h3 className="card-title">Add New Vehicle</h3>
                        <label>Vehicle Number</label>
                        <input name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={setV} placeholder="e.g. BA 1 PA 5678" required={!editingVehicle} />
                        <label>Brand</label>
                        <input name="brand" value={vehicleForm.brand} onChange={setV} placeholder="e.g. Suzuki" />
                        <label>Model</label>
                        <input name="model" value={vehicleForm.model} onChange={setV} placeholder="e.g. Swift" />
                        <button type="submit" className="btn-primary">Add Vehicle</button>
                    </form>
                </>
            )}
        </section>
    );
}

/* ─── Feature 13: Book Appointment ─── */
function BookAppointmentPage() {
    const [form, setForm] = useState({ customerId: "", vehicleId: "", appointmentDate: "", serviceDescription: "" });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setResult(null);
        try {
            const payload = {
                customerId: Number(form.customerId),
                vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
                appointmentDate: new Date(form.appointmentDate).toISOString(),
                serviceDescription: form.serviceDescription
            };
            const res = await axios.post(`${API_BASE}/api/appointments`, payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to book appointment.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 13 · Customer</span>
                <h1>Book Appointment</h1>
                <p className="subtitle">Schedule a service appointment for your vehicle.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Appointment Details</h3>
                <label>Customer ID</label>
                <input name="customerId" value={form.customerId} onChange={set} placeholder="Your customer ID" required />
                <label>Vehicle ID (optional)</label>
                <input name="vehicleId" value={form.vehicleId} onChange={set} placeholder="Leave blank if not applicable" />
                <label>Appointment Date & Time</label>
                <input name="appointmentDate" type="datetime-local" value={form.appointmentDate} onChange={set} required />
                <label>Service Description</label>
                <textarea name="serviceDescription" value={form.serviceDescription} onChange={set} placeholder="Describe what service you need..." rows={3} required />
                <button type="submit" className="btn-primary">Book Appointment</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Appointment Booked!</h3>
                    <p><b>Appointment ID:</b> {result.appointmentId}</p>
                    <p><b>Date:</b> {new Date(result.appointmentDate).toLocaleString()}</p>
                    <p><b>Status:</b> {result.status}</p>
                </div>
            )}
        </section>
    );
}

/* ─── Feature 13: Request Unavailable Part ─── */
function PartRequestPage() {
    const [form, setForm] = useState({ customerId: "", partName: "", notes: "" });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setResult(null);
        try {
            const res = await axios.post(`${API_BASE}/api/part-requests`, {
                customerId: Number(form.customerId),
                partName: form.partName,
                notes: form.notes
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to submit request.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 13 · Customer</span>
                <h1>Request Unavailable Part</h1>
                <p className="subtitle">Can't find a part in stock? Submit a request and we'll notify you when it's available.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Part Request</h3>
                <label>Customer ID</label>
                <input name="customerId" value={form.customerId} onChange={set} placeholder="Your customer ID" required />
                <label>Part Name</label>
                <input name="partName" value={form.partName} onChange={set} placeholder="e.g. Radiator Cap for Honda City" required />
                <label>Additional Notes</label>
                <textarea name="notes" value={form.notes} onChange={set} placeholder="Any additional details about the part..." rows={3} />
                <button type="submit" className="btn-primary">Submit Request</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Request Submitted!</h3>
                    <p><b>Request ID:</b> {result.requestId}</p>
                    <p><b>Part:</b> {result.partName}</p>
                    <p><b>Status:</b> {result.status}</p>
                </div>
            )}
        </section>
    );
}

/* ─── Feature 13: Review Service ─── */
function ServiceReviewPage() {
    const [form, setForm] = useState({ customerId: "", appointmentId: "", rating: "5", comment: "" });
    const [reviews, setReviews] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loadingReviews, setLoadingReviews] = useState(false);

    const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setResult(null);
        try {
            const res = await axios.post(`${API_BASE}/api/service-reviews`, {
                customerId: Number(form.customerId),
                appointmentId: form.appointmentId ? Number(form.appointmentId) : null,
                rating: Number(form.rating),
                comment: form.comment
            });
            setResult(res.data);
            loadReviews();
        } catch (err) {
            setError(err.response?.data || "Failed to submit review.");
        }
    };

    const loadReviews = async () => {
        setLoadingReviews(true);
        try {
            const res = await axios.get(`${API_BASE}/api/service-reviews`);
            setReviews(res.data);
        } catch {
            // silent
        }
        setLoadingReviews(false);
    };

    const stars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 13 · Customer</span>
                <h1>Review Service</h1>
                <p className="subtitle">Rate and review a service you received at Veaco.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Submit Review</h3>
                <label>Customer ID</label>
                <input name="customerId" value={form.customerId} onChange={set} placeholder="Your customer ID" required />
                <label>Appointment ID (optional)</label>
                <input name="appointmentId" value={form.appointmentId} onChange={set} placeholder="Leave blank for general review" />
                <label>Rating</label>
                <select name="rating" value={form.rating} onChange={set} className="select-input">
                    <option value="5">★★★★★ Excellent</option>
                    <option value="4">★★★★☆ Good</option>
                    <option value="3">★★★☆☆ Average</option>
                    <option value="2">★★☆☆☆ Poor</option>
                    <option value="1">★☆☆☆☆ Very Poor</option>
                </select>
                <label>Comment</label>
                <textarea name="comment" value={form.comment} onChange={set} placeholder="Share your experience..." rows={3} />
                <button type="submit" className="btn-primary">Submit Review</button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && <div className="success-msg">✓ Review submitted! Thank you for your feedback.</div>}

            <div className="card">
                <div className="card-title-row">
                    <h3 className="card-title">Customer Reviews</h3>
                    <button onClick={loadReviews} className="btn-ghost btn-sm">{loadingReviews ? "Loading..." : "Load Reviews"}</button>
                </div>
                {reviews.length === 0 && <p className="muted">No reviews yet. Be the first!</p>}
                {reviews.map(r => (
                    <div key={r.id} className="review-box">
                        <div className="review-stars">{stars(r.rating)}</div>
                        <p className="review-comment">{r.comment || <em>No comment</em>}</p>
                        <p className="review-meta">— {r.customerName} · {new Date(r.reviewDate).toLocaleDateString()}</p>
                        {r.serviceDescription && <p className="review-service">Service: {r.serviceDescription}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─── Feature 14: Purchase & Service History ─── */
function HistoryPage() {
    const [customerId, setCustomerId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const loadHistory = async () => {
        setError(""); setData(null);
        try {
            const res = await axios.get(`${API_BASE}/api/customers/${customerId}/purchase-history`);
            setData(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to load history.");
        }
    };

    const statusColor = (status) => {
        if (status === "Completed") return "#16a34a";
        if (status === "Cancelled") return "#dc2626";
        if (status === "Confirmed") return "#2563eb";
        return "#d97706";
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 14 · Customer</span>
                <h1>My Purchase & Service History</h1>
                <p className="subtitle">View all your past purchases and service appointment history.</p>
            </div>

            <div className="card">
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Enter your customer ID" />
                <button onClick={loadHistory} className="btn-primary">Load My History</button>
            </div>

            {error && <div className="error">{String(error)}</div>}

            {data && (
                <>
                    <div className="card">
                        <h3 className="card-title">Purchase History ({data.invoices?.length || 0} invoices)</h3>
                        {data.invoices?.length === 0 && <p className="muted">No purchases yet.</p>}
                        {data.invoices?.map(inv => (
                            <div key={inv.id} className="invoice-box">
                                <div className="invoice-header">
                                    <b>Invoice #{inv.id}</b>
                                    <span className="invoice-date">{new Date(inv.invoiceDate).toLocaleDateString()}</span>
                                </div>
                                {inv.items?.map(item => (
                                    <p key={item.id} className="invoice-item">
                                        {item.vehiclePart?.partName} × {item.quantity} @ Rs. {item.unitPrice} = Rs. {item.lineTotal}
                                    </p>
                                ))}
                                <div className="invoice-totals">
                                    <span>Subtotal: Rs. {inv.subTotal}</span>
                                    {inv.discountAmount > 0 && <span className="discount"> | Discount: -Rs. {inv.discountAmount}</span>}
                                    <span className="grand-total"> | Grand Total: Rs. {inv.grandTotal}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <h3 className="card-title">Service Appointments ({data.appointments?.length || 0})</h3>
                        {data.appointments?.length === 0 && <p className="muted">No appointments booked yet.</p>}
                        {data.appointments?.map(appt => (
                            <div key={appt.id} className="appointment-box">
                                <div className="appt-header">
                                    <b>Appointment #{appt.id}</b>
                                    <span className="appt-status" style={{ color: statusColor(appt.status) }}>{appt.status}</span>
                                </div>
                                <p>{appt.serviceDescription}</p>
                                <p className="appt-date">📅 {new Date(appt.appointmentDate).toLocaleString()}</p>
                                {appt.vehicle && (
                                    <p className="appt-vehicle">🚗 {appt.vehicle.vehicleNumber} — {appt.vehicle.brand} {appt.vehicle.model}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default App;

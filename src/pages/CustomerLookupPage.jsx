import { useState } from "react";
import axios from "axios";
import "../styles/customer-lookup.css";

const API_BASE = "http://localhost:5285";

function CustomerLookupPage() {
    const [customerId, setCustomerId] = useState("1");
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    const lookup = async () => {
        setError("");
        setCustomer(null);
        setHistory([]);
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
                <input
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                />
                <button onClick={lookup} className="btn-primary">
                    View Details
                </button>
            </div>

            {error && <div className="error">{String(error)}</div>}

            {customer && (
                <div className="card">
                    <h3 className="card-title">Customer Info</h3>
                    <div className="info-grid">
                        <div>
                            <span className="info-label">Name</span>
                            <span>{customer.fullName}</span>
                        </div>
                        <div>
                            <span className="info-label">Phone</span>
                            <span>{customer.phone}</span>
                        </div>
                        <div>
                            <span className="info-label">Email</span>
                            <span>{customer.email}</span>
                        </div>
                    </div>
                    <h4>Vehicles</h4>
                    {customer.vehicles?.length > 0 ? (
                        customer.vehicles.map((v) => (
                            <div key={v.id} className="tag">
                                {v.vehicleNumber} — {v.brand} {v.model}
                            </div>
                        ))
                    ) : (
                        <p className="muted">No vehicles registered.</p>
                    )}
                </div>
            )}

            {history.length > 0 && (
                <div className="card">
                    <h3 className="card-title">Purchase History</h3>
                    {history.map((inv) => (
                        <div key={inv.id} className="invoice-box">
                            <p>
                                <b>Invoice #{inv.id}</b>
                            </p>
                            <p>
                                Subtotal: Rs. {inv.subTotal} | Discount: Rs. {inv.discountAmount} |{" "}
                                <b>Total: Rs. {inv.grandTotal}</b>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CustomerLookupPage;

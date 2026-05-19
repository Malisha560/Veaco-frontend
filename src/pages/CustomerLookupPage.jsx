import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/customer-lookup.css";

const API_BASE = "http://localhost:5285";

function CustomerLookupPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        setError("");

        try {
            const res = await axios.get(`${API_BASE}/api/customers`);
            setCustomers(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to load customers.");
        }
    };

    const viewCustomer = async (customerId) => {
        setError("");
        setSelectedCustomer(null);
        setHistory([]);

        try {
            const [detRes, histRes] = await Promise.all([
                axios.get(`${API_BASE}/api/customers/${customerId}/details`),
                axios.get(`${API_BASE}/api/customers/${customerId}/purchase-history`),
            ]);

            setSelectedCustomer(detRes.data);
            setHistory(histRes.data.invoices || []);
        } catch (err) {
            setError(err.response?.data || "Failed to load customer details.");
        }
    };

    const filteredCustomers = customers.filter((customer) => {
        const keyword = search.toLowerCase();

        const vehiclesText = customer.vehicles
            ?.map((v) => `${v.vehicleNumber} ${v.brand} ${v.model}`)
            .join(" ")
            .toLowerCase();

        return (
            customer.id?.toString().includes(keyword) ||
            customer.fullName?.toLowerCase().includes(keyword) ||
            customer.phone?.toLowerCase().includes(keyword) ||
            vehiclesText?.includes(keyword)
        );
    });

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge staff-badge">Feature 8 & 10 · Staff</span>
                <h1>Customer Lookup</h1>
                <p className="subtitle">
                    Search customers by ID, name, phone number, or vehicle number.
                </p>
            </div>

            <div className="card">
                <label>Search Customer</label>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by customer ID, name, phone, or vehicle number"
                />
            </div>

            {error && <div className="error">{String(error)}</div>}

            <div className="card">
                <h3 className="card-title">All Customers</h3>

                {filteredCustomers.length === 0 && (
                    <p className="muted">No customers found.</p>
                )}

                {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="customer-row">
                        <div>
                            <b>#{customer.id} — {customer.fullName}</b>
                            <p>{customer.phone} · {customer.email}</p>

                            {customer.vehicles?.length > 0 ? (
                                customer.vehicles.map((v) => (
                                    <span key={v.id} className="tag">
                                        {v.vehicleNumber} — {v.brand} {v.model}
                                    </span>
                                ))
                            ) : (
                                <p className="muted">No vehicles registered.</p>
                            )}
                        </div>

                        <button
                            className="btn-primary btn-sm"
                            onClick={() => viewCustomer(customer.id)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {selectedCustomer && (
                <div className="card">
                    <h3 className="card-title">Customer Details</h3>

                    <div className="info-grid">
                        <div>
                            <span className="info-label">Name</span>
                            <span>{selectedCustomer.fullName}</span>
                        </div>

                        <div>
                            <span className="info-label">Phone</span>
                            <span>{selectedCustomer.phone}</span>
                        </div>

                        <div>
                            <span className="info-label">Email</span>
                            <span>{selectedCustomer.email}</span>
                        </div>
                    </div>

                    <h4>Vehicles</h4>

                    {selectedCustomer.vehicles?.length > 0 ? (
                        selectedCustomer.vehicles.map((v) => (
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
                                Subtotal: Rs. {inv.subTotal} | Discount: Rs.{" "}
                                {inv.discountAmount} |{" "}
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
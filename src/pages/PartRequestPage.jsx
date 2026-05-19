import { useState } from "react";
import axios from "axios";
import "../styles/part-request.css";

const API_BASE = "http://localhost:5285";

function PartRequestPage() {
    const [form, setForm] = useState({ customerId: "", partName: "", notes: "" });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const res = await axios.post(`${API_BASE}/api/part-requests`, {
                customerId: Number(form.customerId),
                partName: form.partName,
                notes: form.notes,
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
                <p className="subtitle">
                    Can't find a part in stock? Submit a request and we'll notify you when it's available.
                </p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Part Request</h3>
                <label>Customer ID</label>
                <input
                    name="customerId"
                    value={form.customerId}
                    onChange={set}
                    placeholder="Your customer ID"
                    required
                />
                <label>Part Name</label>
                <input
                    name="partName"
                    value={form.partName}
                    onChange={set}
                    placeholder="e.g. Radiator Cap for Honda City"
                    required
                />
                <label>Additional Notes</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={set}
                    placeholder="Any additional details about the part..."
                    rows={3}
                />
                <button type="submit" className="btn-primary">
                    Submit Request
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Request Submitted!</h3>
                    <p>
                        <b>Request ID:</b> {result.requestId}
                    </p>
                    <p>
                        <b>Part:</b> {result.partName}
                    </p>
                    <p>
                        <b>Status:</b> {result.status}
                    </p>
                </div>
            )}
        </section>
    );
}

export default PartRequestPage;

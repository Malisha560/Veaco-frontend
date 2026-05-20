import { useState } from "react";
import axios from "axios";
import "../../styles/sales-invoice.css";

const API_BASE = "http://localhost:5285";

function SalesInvoicePage() {
    const [customerId, setCustomerId] = useState("");
    const [vehiclePartId, setVehiclePartId] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const createInvoice = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const res = await axios.post(`${API_BASE}/api/sales/create-invoice`, {
                customerId: Number(customerId),
                items: [
                    {
                        vehiclePartId: Number(vehiclePartId),
                        quantity: Number(quantity),
                    },
                ],
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
                <p className="subtitle">
                    Sell vehicle parts and generate a sales invoice with automatic 10% discount for orders
                    above Rs. 5000.
                </p>
            </div>

            <form className="card" onSubmit={createInvoice}>
                <h3 className="card-title">Invoice Details</h3>
                <label>Customer ID</label>
                <input
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                />
                <label>Vehicle Part ID</label>
                <input
                    value={vehiclePartId}
                    onChange={(e) => setVehiclePartId(e.target.value)}
                    placeholder="Enter part ID"
                />
                <label>Quantity</label>
                <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                />
                <button type="submit" className="btn-primary">
                    Create Invoice
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Invoice Created</h3>
                    <p>
                        <b>Invoice ID:</b> {result.invoiceId}
                    </p>
                    <p>
                        <b>Subtotal:</b> Rs. {result.subTotal}
                    </p>
                    <p>
                        <b>Discount:</b> Rs. {result.discountAmount}
                    </p>
                    <p>
                        <b>Grand Total:</b> Rs. {result.grandTotal}
                    </p>
                </div>
            )}
        </section>
    );
}

export default SalesInvoicePage;

import { useState } from "react";
import axios from "axios";
import "../styles/customer.css";

const API_BASE = "http://localhost:5285";

function CustomerDetails() {
    const [customerId, setCustomerId] = useState("1");
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");

    const fetchDetails = async () => {
        try {
            setMessage("");
            setCustomer(null);
            setHistory([]);

            const detailsResponse = await axios.get(
                `${API_BASE}/api/customers/${customerId}/details`
            );

            const historyResponse = await axios.get(
                `${API_BASE}/api/customers/${customerId}/purchase-history`
            );

            setCustomer(detailsResponse.data);
            setHistory(historyResponse.data.invoices || historyResponse.data || []);
        } catch {
            setMessage("Failed to load customer details.");
        }
    };

    return (
        <div>
            <h1>Customer Details & History</h1>

            <div className="customer-box">
                <input
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />

                <button onClick={fetchDetails}>View Customer Details</button>
            </div>

            {message && <p className="error">{message}</p>}

            {customer && (
                <div className="customer-box">
                    <h3>Customer Information</h3>
                    <p><b>Name:</b> {customer.fullName}</p>
                    <p><b>Phone:</b> {customer.phone}</p>
                    <p><b>Email:</b> {customer.email}</p>

                    <h4>Vehicles</h4>
                    {customer.vehicles?.length > 0 ? (
                        customer.vehicles.map((v) => (
                            <p key={v.id}>
                                {v.vehicleNumber} - {v.brand} {v.model}
                            </p>
                        ))
                    ) : (
                        <p>No vehicles found.</p>
                    )}
                </div>
            )}

            {Array.isArray(history) && history.length > 0 && (
                <div className="customer-box">
                    <h3>Purchase History</h3>

                    {history.map((invoice) => (
                        <div key={invoice.id}>
                            <p><b>Invoice ID:</b> {invoice.id}</p>
                            <p><b>Subtotal:</b> Rs. {invoice.subTotal}</p>
                            <p><b>Discount:</b> Rs. {invoice.discountAmount}</p>
                            <p><b>Grand Total:</b> Rs. {invoice.grandTotal}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomerDetails;
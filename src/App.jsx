import { useState } from "react";
import axios from "axios";
import "./index.css";

const API_BASE = "http://localhost:5285";

function App() {
    const [page, setPage] = useState("sales");

    return (
        <div className="app">
            <aside className="sidebar">
                <h2>Veaco</h2>
                <button onClick={() => setPage("sales")}>Sales Invoice</button>
                <button onClick={() => setPage("customer")}>Customer Details</button>
            </aside>

            <main className="content">
                {page === "sales" ? <SalesInvoicePage /> : <CustomerDetailsPage />}
            </main>
        </div>
    );
}

function SalesInvoicePage() {
    const [customerId, setCustomerId] = useState("1");
    const [vehiclePartId, setVehiclePartId] = useState("1");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const createInvoice = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        try {
            const response = await axios.post(`${API_BASE}/api/sales/create-invoice`, {
                customerId: Number(customerId),
                items: [
                    {
                        vehiclePartId: Number(vehiclePartId),
                        quantity: Number(quantity),
                    },
                ],
            });

            setResult(response.data);
        } catch (err) {
            setError(err.response?.data || "Failed to create invoice.");
        }
    };

    return (
        <section>
            <h1>Create Sales Invoice</h1>
            <p>Feature 7: Staff can sell vehicle parts and create sales invoices.</p>

            <form className="card" onSubmit={createInvoice}>
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />

                <label>Vehicle Part ID</label>
                <input value={vehiclePartId} onChange={(e) => setVehiclePartId(e.target.value)} />

                <label>Quantity</label>
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <button type="submit">Create Invoice</button>
            </form>

            {error && <div className="error">{String(error)}</div>}

            {result && (
                <div className="card success">
                    <h3>Invoice Created Successfully</h3>
                    <p><b>Invoice ID:</b> {result.invoiceId}</p>
                    <p><b>Subtotal:</b> Rs. {result.subTotal}</p>
                    <p><b>Discount:</b> Rs. {result.discountAmount}</p>
                    <p><b>Grand Total:</b> Rs. {result.grandTotal}</p>
                </div>
            )}
        </section>
    );
}

function CustomerDetailsPage() {
    const [customerId, setCustomerId] = useState("1");
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    const getCustomerDetails = async () => {
        setError("");
        setCustomer(null);
        setHistory([]);

        try {
            const detailsResponse = await axios.get(`${API_BASE}/api/customers/${customerId}/details`);
            const historyResponse = await axios.get(`${API_BASE}/api/customers/${customerId}/purchase-history`);

            setCustomer(detailsResponse.data);
            setHistory(historyResponse.data);
        } catch (err) {
            setError(err.response?.data || "Failed to load customer details.");
        }
    };

    return (
        <section>
            <h1>Customer Details & History</h1>
            <p>Feature 8: Staff can view customer details, history, and vehicle information.</p>

            <div className="card">
                <label>Customer ID</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                <button onClick={getCustomerDetails}>View Customer Details</button>
            </div>

            {error && <div className="error">{String(error)}</div>}

            {customer && (
                <div className="card">
                    <h3>Customer Information</h3>
                    <p><b>Name:</b> {customer.fullName}</p>
                    <p><b>Phone:</b> {customer.phone}</p>
                    <p><b>Email:</b> {customer.email}</p>

                    <h3>Vehicles</h3>
                    {customer.vehicles?.length > 0 ? (
                        customer.vehicles.map((v) => (
                            <p key={v.id}>{v.vehicleNumber} - {v.brand} {v.model}</p>
                        ))
                    ) : (
                        <p>No vehicle information found.</p>
                    )}
                </div>
            )}

            {history.length > 0 && (
                <div className="card">
                    <h3>Purchase History</h3>
                    {history.map((invoice) => (
                        <div key={invoice.id} className="invoice-box">
                            <p><b>Invoice ID:</b> {invoice.id}</p>
                            <p><b>Subtotal:</b> Rs. {invoice.subTotal}</p>
                            <p><b>Discount:</b> Rs. {invoice.discountAmount}</p>
                            <p><b>Grand Total:</b> Rs. {invoice.grandTotal}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default App;
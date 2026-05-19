import { useState } from "react";
import "../styles/sales.css";

const API_BASE = "http://localhost:5285";

function SalesInvoice() {
    const [customerId, setCustomerId] = useState("");
    const [vehiclePartId, setVehiclePartId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setMessage("");
        setResult(null);

        try {
            const response = await fetch(`${API_BASE}/api/sales/create-invoice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId),
                    items: [
                        {
                            vehiclePartId: parseInt(vehiclePartId),
                            quantity: parseInt(quantity),
                        },
                    ],
                }),
            });

            if (!response.ok) throw new Error();

            const data = await response.json();
            setResult(data);
            setMessage("Invoice created successfully!");
        } catch {
            setMessage("Failed to create invoice.");
        }
    };

    return (
        <div>
            <h1>Create Sales Invoice</h1>

            <div className="sales-form-card">
                <input
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />

                <input
                    placeholder="Vehicle Part ID"
                    value={vehiclePartId}
                    onChange={(e) => setVehiclePartId(e.target.value)}
                />

                <input
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button onClick={handleSubmit}>Create Invoice</button>
            </div>

            {message && <p>{message}</p>}

            {result && (
                <div className="invoice-result">
                    <h3>Invoice Created</h3>
                    <p><b>Invoice ID:</b> {result.invoiceId}</p>
                    <p><b>Subtotal:</b> Rs. {result.subTotal}</p>
                    <p><b>Loyalty Discount:</b> Rs. {result.discountAmount}</p>
                    <p><b>Grand Total:</b> Rs. {result.grandTotal}</p>

                    {result.discountAmount > 0 && (
                        <p className="discount-note">
                            10% loyalty discount applied for purchase above Rs. 5000.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SalesInvoice;
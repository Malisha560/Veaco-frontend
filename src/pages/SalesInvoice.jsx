import { useState } from "react";
import axios from "axios";
import "../styles/sales.css";

const API_BASE = "http://localhost:5285";
function SalesInvoice() {
    const [customerId, setCustomerId] = useState("");
    const [vehiclePartId, setVehiclePartId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5285/api/sales/create-invoice", {
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

            setMessage("Invoice created successfully!");
        } catch {
            setMessage("Failed to create invoice.");
        }
    };

    return (
        <div>
            <h1>Create Sales Invoice</h1>

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

            {message && <p>{message}</p>}
        </div>
    );
}

export default SalesInvoice;
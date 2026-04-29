import { useState } from "react";
import { createPurchase } from "../services/api";

export default function Purchase() {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({
        partId: "",
        quantity: "",
        price: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        if (!item.partId || !item.quantity || !item.price) {
            setError("Please fill in all fields.");
            return;
        }
        setItems([...items, item]);
        setItem({ partId: "", quantity: "", price: "" });
        setError("");
    };

    const submitInvoice = async () => {
        if (items.length === 0) {
            setError("Please add at least one item.");
            return;
        }
        const invoice = {
            vendorId: 1,
            items: items.map(i => ({
                partId: parseInt(i.partId),
                quantity: parseInt(i.quantity),
                price: parseFloat(i.price)
            }))
        };
        try {
            const result = await createPurchase(invoice);
            alert("Invoice Created! Total: " + result.totalAmount);
            setItems([]);
        } catch (err) {
            setError("Error creating invoice");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Purchase Invoice</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginBottom: "10px" }}>
                <input name="partId" placeholder="Part ID" value={item.partId} onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" value={item.quantity} onChange={handleChange} />
                <input name="price" placeholder="Price" value={item.price} onChange={handleChange} />
                <button onClick={addItem}>Add Item</button>
            </div>
            <h3>Items</h3>
            <ul>
                {items.map((i, index) => (
                    <li key={index}>
                        Part {i.partId} | Qty {i.quantity} | Price {i.price}
                    </li>
                ))}
            </ul>
            <button onClick={submitInvoice}>Submit Invoice</button>
        </div>
    );
}
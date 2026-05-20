import { useState } from "react";
import { createPurchase } from "../../services/api";
import "../../styles/purchase.css"
export default function Purchase() {
    const [items, setItems] = useState([]);
    const [submittedItems, setSubmittedItems] = useState([]);
    const [item, setItem] = useState({
        partId: "",
        quantity: "",
        price: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        setSuccess("");
    };

    const submitInvoice = async () => {
        if (items.length === 0) {
            setError("Please add at least one item.");
            return;
        }

        const purchaseItems = items.map((i) => ({
            partId: parseInt(i.partId),
            quantity: parseInt(i.quantity),
            price: parseFloat(i.price)
        }));

        try {
            await createPurchase(purchaseItems);

            setSubmittedItems(items);
            setItems([]);

            setSuccess("Purchase Invoice Created Successfully");
            setError("");
        } catch (err) {
            setError(err.message || "Error creating invoice");
            console.error(err);
        }
    };

    return (
        <div className="page-content">
            <div className="page-date">Purchase Management</div>
            <h1 className="page-title">Purchase Invoice</h1>
            <p className="page-subtitle">Create purchase invoices and update stock records.</p>

            {error && <p className="msg-error">{error}</p>}
            {success && <p className="msg-success">{success}</p>}

            <div className="form-box">
                <h3 className="form-box-title">Add Purchase Item</h3>

                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Part ID</label>
                        <input
                            name="partId"
                            placeholder="Enter part ID"
                            value={item.partId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Quantity</label>
                        <input
                            name="quantity"
                            placeholder="Enter quantity"
                            value={item.quantity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Price</label>
                        <input
                            name="price"
                            placeholder="Enter price"
                            value={item.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={addItem}>
                        Add Item
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <div className="table-header-row">
                    <h3 className="table-header-title">Items</h3>
                </div>

                <div className="items-header">
                    <span>Part ID</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span></span>
                </div>

                {items.length > 0 ? (
                    items.map((i, index) => (
                        <div className="items-row" key={index}>
                            <span>{i.partId}</span>
                            <span>{i.quantity}</span>
                            <span>Rs. {i.price}</span>
                            <button
                                className="remove-item-btn"
                                onClick={() => setItems(items.filter((_, idx) => idx !== index))}
                            >
                                ×
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="table-empty">No items added</div>
                )}

                <div className="submit-row">
                    <button className="btn btn-primary" onClick={submitInvoice}>
                        Submit Invoice
                    </button>
                </div>
            </div>

            {success && submittedItems.length > 0 && (
                <div className="table-wrapper" style={{ marginTop: "28px" }}>
                    <div className="table-header-row">
                        <h3 className="table-header-title">Invoice Summary</h3>
                    </div>

                    <div className="items-header">
                        <span>Part ID</span>
                        <span>Quantity</span>
                        <span>Price</span>
                        <span></span>
                    </div>

                    {submittedItems.map((i, index) => (
                        <div className="items-row" key={index}>
                            <span>{i.partId}</span>
                            <span>{i.quantity}</span>
                            <span>Rs. {i.price}</span>
                            <span></span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
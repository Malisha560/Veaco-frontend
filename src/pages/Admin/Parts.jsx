import { useState, useEffect } from "react";
import { getParts, addPart, updatePart, deletePart } from "../../services/api";

export default function Parts() {
    const [parts, setParts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stockQuantity: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadParts();
    }, []);

    const loadParts = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getParts();
            setParts(data || []);
        } catch (err) {
            setError(err?.message || "Failed to load parts.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setForm({
            name: "",
            category: "",
            price: "",
            stockQuantity: ""
        });
        setEditingId(null);
    };

    const handleSubmit = async () => {
        setError("");
        setMessage("");

        if (!form.name || !form.price || !form.stockQuantity) {
            setError("Name, price, and stock are required.");
            return;
        }

        const payload = {
            name: form.name,
            category: form.category,
            price: parseFloat(form.price) || 0,
            stockQuantity: parseInt(form.stockQuantity, 10) || 0,
            vendorId: null
        };

        try {
            if (editingId) {
                await updatePart(editingId, payload);
                setMessage("Part updated successfully.");
            } else {
                await addPart(payload);
                setMessage("Part added successfully.");
            }

            resetForm();
            loadParts();
        } catch (err) {
            setError(err?.message || "Failed to save part.");
        }
    };

    const handleEdit = (part) => {
        setEditingId(part.id);
        setForm({
            name: part.name || "",
            category: part.category || "",
            price: part.price || "",
            stockQuantity: part.stockQuantity || ""
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this part?")) return;

        setError("");
        setMessage("");

        try {
            await deletePart(id);
            setMessage("Part deleted successfully.");
            loadParts();
        } catch (err) {
            setError(err?.message || "Failed to delete part.");
        }
    };

    const handleRead = (part) => {
        setSelectedPart(part);
        setShowPopup(true);
    };
    
    return (
        <div className="page-content">
            <div className="page-date">Parts Management</div>
            <h1 className="page-title">Parts</h1>
            <p className="page-subtitle">Add, update, view and manage vehicle parts.</p>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="msg-error">{error}</p>}
            {message && <p className="msg-success">{message}</p>}

            <div className="form-box">
                <h3 className="form-box-title">
                    {editingId ? "Edit Part" : "Add Part"}
                </h3>

                <div className="form-grid">
                    <div className="form-field">
                        <label className="form-label">Name</label>
                        <input name="name" placeholder="Enter part name" value={form.name} onChange={handleChange} />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Category</label>
                        <input name="category" placeholder="Enter category" value={form.category} onChange={handleChange} />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Price</label>
                        <input name="price" placeholder="Enter price" value={form.price} onChange={handleChange} />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Stock</label>
                        <input name="stockQuantity" placeholder="Enter stock quantity" value={form.stockQuantity} onChange={handleChange} />
                    </div>
                </div>

                <div className="modal-actions" style={{ justifyContent: "flex-start" }}>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                        {editingId ? "Update Part" : "Add Part"}
                    </button>

                    {editingId && (
                        <button className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <div className="table-wrapper">
                <div className="table-header-row">
                    <h3 className="table-header-title">Parts List</h3>
                </div>

                <table className="veaco-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {parts.length > 0 ? (
                        parts.map((part) => (
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.name}</td>
                                <td>{part.category}</td>
                                <td>Rs. {part.price}</td>
                                <td>
                  <span
                      className={
                          part.stockQuantity === 0
                              ? "badge badge-danger"
                              : part.stockQuantity < 10
                                  ? "badge badge-warning"
                                  : "badge badge-success"
                      }
                  >
                    {part.stockQuantity}
                  </span>
                                </td>
                                <td>
                                    <div className="action-cell">
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleRead(part)}>
                                            Read
                                        </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleEdit(part)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(part.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="table-empty">
                                No parts found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {showPopup && selectedPart && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2 className="modal-title">Part Details</h2>

                        {[
                            ["ID", selectedPart.id],
                            ["Name", selectedPart.name],
                            ["Category", selectedPart.category],
                            ["Price", `Rs. ${selectedPart.price}`],
                            ["Stock", selectedPart.stockQuantity],
                            ["Vendor", selectedPart.vendorName || "N/A"],
                        ].map(([label, value]) => (
                            <div className="modal-detail-row" key={label}>
                                <span className="modal-detail-label">{label}</span>
                                <span className="modal-detail-value">{value}</span>
                            </div>
                        ))}

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

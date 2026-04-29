import { useState, useEffect } from "react";
import { getParts, addPart } from "../services/api";

export default function Parts() {
    const [parts, setParts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stockQuantity: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const loadParts = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getParts();
                if (mounted) setParts(data || []);
            } catch (err) {
                if (mounted) setError(err?.message || "Failed to load parts.");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        loadParts();
        return () => { mounted = false; };
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError("");
        try {
            const payload = {
                name: form.name,
                category: form.category,
                price: parseFloat(form.price) || 0,
                stockQuantity: parseInt(form.stockQuantity, 10) || 0
            };
            await addPart(payload);
            alert("Part Added Successfully");
            setForm({ name: "", category: "", price: "", stockQuantity: "" });
            const data = await getParts();
            setParts(data || []);
        } catch (err) {
            setError(err?.message || "Failed to add part.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Parts Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginBottom: "10px" }}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="stockQuantity" placeholder="Stock" value={form.stockQuantity} onChange={handleChange} />
                <button onClick={handleSubmit} disabled={loading}>Add Part</button>
            </div>
            <h3>Parts List</h3>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {parts.length > 0 ? (
                        parts.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td>{p.stockQuantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No parts found</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
import { useState, useEffect } from "react";
import { getStaff, registerStaff, updateStaff, deleteStaff } from "../../services/api";
import "../../styles/staff.css";

function StaffManagement() {
    const [staffList, setStaffList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "Staff" });

    useEffect(() => { fetchStaff(); }, []);

    const fetchStaff = async () => {
        try {
            const res = await getStaff();
            setStaffList(res.data);
        } catch {
            setError("Failed to load staff list.");
        }
    };

    const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); setError("");
        try {
            await registerStaff(form);
            setMessage("Staff registered successfully!");
            setForm({ fullName: "", email: "", password: "", role: "Staff" });
            setShowForm(false);
            fetchStaff();
        } catch {
            setError("Failed to register staff. Email may already exist.");
        } finally { setLoading(false); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); setError("");
        try {
            await updateStaff(editingStaff.id, {
                fullName: editingStaff.fullName,
                email: editingStaff.email,
                role: editingStaff.role,
                isActive: editingStaff.isActive
            });
            setMessage("Staff updated successfully!");
            setEditingStaff(null);
            fetchStaff();
        } catch {
            setError("Failed to update staff.");
        } finally { setLoading(false); }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete ${name}?`)) return;
        try {
            await deleteStaff(id);
            setMessage("Staff deleted.");
            fetchStaff();
        } catch { setError("Failed to delete staff."); }
    };

    return (
        <div className="staff-page">
            <div className="staff-header">
                <div>
                    <p className="staff-date">{new Date().toDateString()}</p>
                    <h1>Staff Management</h1>
                    <p className="staff-subtitle">Register and manage staff roles</p>
                </div>
                <button className="staff-register-btn" onClick={() => { setShowForm(!showForm); setEditingStaff(null); }}>
                    {showForm ? "Cancel" : "+ Register Staff"}
                </button>
            </div>

            {message && <div className="staff-success">{message}</div>}
            {error && <div className="staff-error">{error}</div>}

            {/* Register Form */}
            {showForm && (
                <div className="staff-form-card">
                    <h3>Register New Staff</h3>
                    <form onSubmit={handleRegister}>
                        <div className="staff-form-grid">
                            <div className="staff-form-group">
                                <label>Full Name</label>
                                <input name="fullName" value={form.fullName} onChange={handleFormChange} placeholder="e.g. John Doe" required />
                            </div>
                            <div className="staff-form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="e.g. john@veaco.com" required />
                            </div>
                            <div className="staff-form-group">
                                <label>Password</label>
                                <input name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Enter password" required />
                            </div>
                            <div className="staff-form-group">
                                <label>Role</label>
                                <select name="role" value={form.role} onChange={handleFormChange}>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="staff-submit-btn" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            )}

            {/* Edit Form */}
            {editingStaff && (
                <div className="staff-form-card">
                    <h3>Edit — {editingStaff.fullName}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="staff-form-grid">
                            <div className="staff-form-group">
                                <label>Full Name</label>
                                <input value={editingStaff.fullName} onChange={e => setEditingStaff({ ...editingStaff, fullName: e.target.value })} required />
                            </div>
                            <div className="staff-form-group">
                                <label>Email</label>
                                <input type="email" value={editingStaff.email} onChange={e => setEditingStaff({ ...editingStaff, email: e.target.value })} required />
                            </div>
                            <div className="staff-form-group">
                                <label>Role</label>
                                <select value={editingStaff.role} onChange={e => setEditingStaff({ ...editingStaff, role: e.target.value })}>
                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="staff-form-group">
                                <label>Status</label>
                                <select value={editingStaff.isActive} onChange={e => setEditingStaff({ ...editingStaff, isActive: e.target.value === "true" })}>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <button type="submit" className="staff-submit-btn" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                            <button type="button" className="staff-cancel-btn" onClick={() => setEditingStaff(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Staff Table */}
            <div className="staff-table-wrap">
                <table className="staff-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staffList.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="staff-empty">
                                No staff registered yet.
                            </td>
                        </tr>
                    ) : (
                        staffList
                            .filter(staff => staff.role === "Staff")
                            .map((staff, index) => (
                                <tr key={staff.id}>
                                    <td>#{index + 1}</td>
                                    <td>{staff.fullName}</td>
                                    <td>{staff.email}</td>
                                    <td>
                        <span className={`staff-role-badge ${staff.role.toLowerCase()}`}>
                            {staff.role}
                        </span>
                                    </td>
                                    <td>
                        <span className={`staff-status-badge ${staff.isActive ? "active" : "inactive"}`}>
                            {staff.isActive ? "Active" : "Inactive"}
                        </span>
                                    </td>
                                    <td>{new Date(staff.createdAt).toLocaleDateString()}</td>
                                    <td className="staff-actions">
                                        <button
                                            className="staff-edit-btn"
                                            onClick={() => {
                                                setEditingStaff(staff);
                                                setShowForm(false);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="staff-delete-btn"
                                            onClick={() => handleDelete(staff.id, staff.fullName)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffManagement;

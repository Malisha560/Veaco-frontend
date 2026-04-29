import { useState, useEffect } from "react";
import { getAllStaff, registerStaff, updateStaff, updateStaffRole, deleteStaff } from "../services/api";
import "../styles/staff.css";

function StaffManagement() {
    // List of all staff fetched from the API
    const [staffList, setStaffList] = useState([]);

    // Controls whether the register form is visible
    const [showForm, setShowForm] = useState(false);

    // Controls whether the edit form is visible, and which staff is being edited
    const [editingStaff, setEditingStaff] = useState(null);

    // Loading and feedback states
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Form fields for registering a new staff member
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "Staff"
    });

    // Load all staff when the page opens
    useEffect(() => {
        fetchStaff();
    }, []);

    // Fetch all staff from the API and update the list
    const fetchStaff = async () => {
        try {
            const data = await getAllStaff();
            setStaffList(data);
        } catch {
            setError("Failed to load staff list.");
        }
    };

    // Handle input changes in the register form
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit the register form to create a new staff member
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            await registerStaff(form);
            setMessage("Staff registered successfully!");
            setForm({ fullName: "", email: "", password: "", role: "Staff" });
            setShowForm(false);
            fetchStaff(); // Refresh the list
        } catch {
            setError("Failed to register staff. Email may already exist.");
        } finally {
            setLoading(false);
        }
    };

    // Open the edit form pre-filled with the selected staff's data
    const handleEditClick = (staff) => {
        setEditingStaff({ ...staff });
        setMessage("");
        setError("");
    };

    // Submit the edit form to update staff details
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

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
        } finally {
            setLoading(false);
        }
    };

    // Delete a staff member after confirmation
    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

        try {
            await deleteStaff(id);
            setMessage("Staff deleted successfully!");
            fetchStaff();
        } catch {
            setError("Failed to delete staff.");
        }
    };

    return (
        <div className="staff-page">
            <div className="staff-header">
                <div>
                    <h1>Staff Management</h1>
                    <p>Register and manage staff roles</p>
                </div>
                <button className="register-btn" onClick={() => { setShowForm(!showForm); setEditingStaff(null); }}>
                    {showForm ? "Cancel" : "+ Register Staff"}
                </button>
            </div>

            {/* Success / Error messages */}
            {message && <div className="success-msg">{message}</div>}
            {error && <div className="error-msg">{error}</div>}

            {/* Register new staff form */}
            {showForm && (
                <div className="staff-form-card">
                    <h2>Register New Staff</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleFormChange}
                                    placeholder="e.g. John Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleFormChange}
                                    placeholder="e.g. john@veaco.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleFormChange}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={form.role} onChange={handleFormChange}>
                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            )}

            {/* Edit staff form  shown when a staff row's Edit button is clicked */}
            {editingStaff && (
                <div className="staff-form-card">
                    <h2>Edit Staff  {editingStaff.fullName}</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    value={editingStaff.fullName}
                                    onChange={e => setEditingStaff({ ...editingStaff, fullName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editingStaff.email}
                                    onChange={e => setEditingStaff({ ...editingStaff, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    value={editingStaff.role}
                                    onChange={e => setEditingStaff({ ...editingStaff, role: e.target.value })}
                                >
                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={editingStaff.isActive}
                                    onChange={e => setEditingStaff({ ...editingStaff, isActive: e.target.value === "true" })}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" className="cancel-btn" onClick={() => setEditingStaff(null)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Staff list table */}
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
                            <td colSpan="7" className="empty-row">No staff registered yet.</td>
                        </tr>
                    ) : (
                        staffList.map(staff => (
                            <tr key={staff.id}>
                                <td>#{staff.id}</td>
                                <td>{staff.fullName}</td>
                                <td>{staff.email}</td>
                                <td>
                                        <span className={`role-badge ${staff.role.toLowerCase()}`}>
                                            {staff.role}
                                        </span>
                                </td>
                                <td>
                                        <span className={`status-badge ${staff.isActive ? "active" : "inactive"}`}>
                                            {staff.isActive ? "Active" : "Inactive"}
                                        </span>
                                </td>
                                <td>{new Date(staff.createdAt).toLocaleDateString()}</td>
                                <td className="action-btns">
                                    <button className="edit-btn" onClick={() => handleEditClick(staff)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(staff.id, staff.fullName)}>Delete</button>
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

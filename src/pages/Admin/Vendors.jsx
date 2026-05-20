import { useEffect, useState } from "react";
import {
	getVendors,
	createVendor,
	deleteVendor,
	updateVendor
} from "../../services/api";
import "../../styles/vendor.css"

export default function Vendors() {
	const [vendors, setVendors] = useState([]);

	const [form, setForm] = useState({
		id: null,
		vendorName: "",
		phone: "",
		email: "",
		address: "",
	});

	const [isEditing, setIsEditing] = useState(false);

	// ================= READ POPUP =================
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	// ================= LOAD =================
	const loadVendors = async () => {
		const data = await getVendors();
		setVendors(data);
	};

	useEffect(() => {
		loadVendors();
	}, []);

	// ================= SUBMIT =================
	const handleSubmit = async (e) => {
		e.preventDefault();

		// validation
        // validation
        if (
            !form.vendorName.trim() ||
            !form.phone.trim() ||
            !form.email.trim() ||
            !form.address.trim()
        ) {
            alert("Please fill all fields.");
            return;
        }

// email validation
        if (!form.email.includes("@") || !form.email.includes(".")) {
            alert("Please enter a valid email.");
            return;
        }

// phone validation
        if (form.phone.length < 7) {
            alert("Please enter a valid phone number.");
            return;
        }

		if (isEditing) {
			await updateVendor(form.id, form);
		} else {
			await createVendor(form);
		}

		handleCancel();
		loadVendors();
	};

	// ================= DELETE =================
	const handleDelete = async (id) => {
		await deleteVendor(id);
		loadVendors();
	};

	// ================= EDIT =================
	const handleEdit = (vendor) => {
		setForm({
			id: vendor.id,
			vendorName: vendor.vendorName,
			phone: vendor.phone,
			email: vendor.email,
			address: vendor.address,
		});

		setIsEditing(true);
	};

	// ================= CANCEL =================
	const handleCancel = () => {
		setForm({
			id: null,
			vendorName: "",
			phone: "",
			email: "",
			address: "",
		});

		setIsEditing(false);
	};

	// ================= READ =================
	const handleRead = (vendor) => {
		setSelectedVendor(vendor);
		setShowPopup(true);
	};
    
    return (
        <div className="page-content">
            <div className="page-date">Vendor Management</div>
            <h1 className="page-title">Vendors</h1>
            <p className="page-subtitle">Add, update, view and manage vendor details.</p>

            <div className="form-box">
                <h3 className="form-box-title">
                    {isEditing ? "Edit Vendor" : "Add Vendor"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-field">
                            <label className="form-label">Vendor Name</label>
                            <input
                                required
                                placeholder="Enter vendor name"
                                value={form.vendorName}
                                onChange={(e) =>
                                    setForm({ ...form, vendorName: e.target.value })
                                }
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">Phone</label>
                            <input
                                required
                                placeholder="Enter phone number"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">Email</label>
                            <input
                                required
                                placeholder="Enter email address"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label">Address</label>
                            <input
                                required
                                placeholder="Enter address"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="modal-actions" style={{ justifyContent: "flex-start" }}>
                        <button className="btn btn-primary" type="submit">
                            {isEditing ? "Update Vendor" : "Add Vendor"}
                        </button>

                        {isEditing && (
                            <button className="btn btn-secondary" type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="table-wrapper">
                <div className="table-header-row">
                    <h3 className="table-header-title">Vendors List</h3>
                </div>

                <table className="veaco-table">
                    <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {vendors.length > 0 ? (
                        vendors.map((v) => (
                            <tr key={v.id}>
                                <td>{v.vendorName}</td>
                                <td>{v.phone}</td>
                                <td>{v.email}</td>
                                <td>{v.address}</td>
                                <td>
                                    <div className="action-cell">
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleRead(v)}>
                                            Read
                                        </button>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleEdit(v)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(v.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="table-empty">
                                No vendors found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {showPopup && selectedVendor && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2 className="modal-title">Vendor Details</h2>

                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Vendor Name</span>
                            <span className="modal-detail-value">{selectedVendor.vendorName}</span>
                        </div>

                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Phone</span>
                            <span className="modal-detail-value">{selectedVendor.phone}</span>
                        </div>

                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Email</span>
                            <span className="modal-detail-value">{selectedVendor.email}</span>
                        </div>

                        <div className="modal-detail-row">
                            <span className="modal-detail-label">Address</span>
                            <span className="modal-detail-value">{selectedVendor.address}</span>
                        </div>

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
};
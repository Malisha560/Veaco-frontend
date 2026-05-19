import { useEffect, useState } from "react";
import {
	getVendors,
	createVendor,
	deleteVendor,
	updateVendor
} from "../../services/api";

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
		if (
			!form.vendorName.trim() ||
			!form.phone.trim() ||
			!form.email.trim() ||
			!form.address.trim()
		) {
			alert("Please fill all fields.");
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
		<div
			style={{
				padding: "30px",
				fontFamily: "Arial",
				maxWidth: "1200px",
				margin: "0 auto",
			}}
		>
			<h2 style={{ marginBottom: "25px" }}>
				Vendor Management
			</h2>

			{/* ================= FORM ================= */}
			<div
				style={{
					background: "#f8f8f8",
					padding: "20px",
					borderRadius: "10px",
					marginBottom: "30px",
				}}
			>
				<h3 style={{ marginBottom: "15px" }}>
					{isEditing ? "Edit Vendor" : "Add Vendor"}
				</h3>

				<form onSubmit={handleSubmit}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns:
								"repeat(auto-fit, minmax(220px, 1fr))",
							gap: "15px",
						}}
					>
						<input
							placeholder="Vendor Name"
							value={form.vendorName}
							onChange={(e) =>
								setForm({
									...form,
									vendorName: e.target.value,
								})
							}
						/>

						<input
							placeholder="Phone"
							value={form.phone}
							onChange={(e) =>
								setForm({
									...form,
									phone: e.target.value,
								})
							}
						/>

						<input
							placeholder="Email"
							value={form.email}
							onChange={(e) =>
								setForm({
									...form,
									email: e.target.value,
								})
							}
						/>

						<input
							placeholder="Address"
							value={form.address}
							onChange={(e) =>
								setForm({
									...form,
									address: e.target.value,
								})
							}
						/>
					</div>

					<div
						style={{
							display: "flex",
							gap: "10px",
							marginTop: "20px",
						}}
					>
						<button type="submit">
							{isEditing ? "Update Vendor" : "Add Vendor"}
						</button>

						{isEditing && (
							<button type="button" onClick={handleCancel}>
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>

			{/* ================= TABLE ================= */}
			<div
				style={{
					background: "#fff",
					padding: "20px",
					borderRadius: "10px",
					border: "1px solid #ddd",
				}}
			>
				<h3 style={{ marginBottom: "20px" }}>
					Vendors List
				</h3>

				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
					}}
				>
					<thead>
						<tr style={{ background: "#f0f0f0" }}>
							<th style={thStyle}>Vendor Name</th>
							<th style={thStyle}>Phone</th>
							<th style={thStyle}>Email</th>
							<th style={thStyle}>Address</th>
							<th style={thStyle}>Actions</th>
						</tr>
					</thead>

					<tbody>
						{vendors.length > 0 ? (
							vendors.map((v) => (
								<tr key={v.id}>
									<td style={tdStyle}>
										{v.vendorName}
									</td>
									<td style={tdStyle}>{v.phone}</td>
									<td style={tdStyle}>{v.email}</td>
									<td style={tdStyle}>{v.address}</td>

									<td style={tdStyle}>
										<div style={{ display: "flex", gap: "10px" }}>
											<button onClick={() => handleRead(v)}>
												Read
											</button>

											<button onClick={() => handleEdit(v)}>
												Edit
											</button>

											<button onClick={() => handleDelete(v.id)}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
									No vendors found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* ================= POPUP ================= */}
{showPopup && selectedVendor && (
	<div
		style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "rgba(0,0,0,0.6)",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 999,
		}}
	>
		<div
			style={{
				background: "white",
				padding: "30px",
				borderRadius: "12px",
				minWidth: "420px",
				boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
			}}
		>
			<h2 style={{ marginBottom: "20px", textAlign: "center" }}>
				Vendor Details
			</h2>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				<div>
					<strong>Vendor Name:</strong>
					<div>{selectedVendor.vendorName}</div>
				</div>

				<div>
					<strong>Phone:</strong>
					<div>{selectedVendor.phone}</div>
				</div>

				<div>
					<strong>Email:</strong>
					<div>{selectedVendor.email}</div>
				</div>

				<div>
					<strong>Address:</strong>
					<div>{selectedVendor.address}</div>
				</div>
			</div>

			<button
				onClick={() => setShowPopup(false)}
				style={{
					marginTop: "25px",
					width: "100%",
					padding: "10px",
					background: "#dc3545",
					color: "white",
					border: "none",
					borderRadius: "6px",
					cursor: "pointer",
				}}
			>
				Close
			</button>
		</div>
	</div>
)}
		</div>
	);
}

// ================= STYLES =================

const thStyle = {
	padding: "12px",
	textAlign: "left",
	borderBottom: "1px solid #ccc",
};

const tdStyle = {
	padding: "12px",
	borderBottom: "1px solid #eee",
};
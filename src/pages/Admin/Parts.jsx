import { useState, useEffect } from "react";
import { getParts, addPart } from "../../services/api";

export default function Parts() {
	const [parts, setParts] = useState([]);
	const [form, setForm] = useState({
		partId: "",
		name: "",
		category: "",
		price: "",
		stockQuantity: ""
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// ================= POPUP STATES =================
	const [selectedPart, setSelectedPart] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

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

		return () => {
			mounted = false;
		};
	}, []);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async () => {
		setError("");

		try {
			const payload = {
				partId: form.partId,
				name: form.name,
				category: form.category,
				price: parseFloat(form.price) || 0,
				stockQuantity: parseInt(form.stockQuantity, 10) || 0
			};

			await addPart(payload);

			setForm({
				partId: "",
				name: "",
				category: "",
				price: "",
				stockQuantity: ""
			});

			const data = await getParts();
			setParts(data || []);

		} catch (err) {
			setError(err?.message || "Failed to add part.");
		}
	};

	// ================= READ FUNCTION =================
	const handleRead = (part) => {
		setSelectedPart(part);
		setShowPopup(true);
	};

	return (
		<div
			style={{
				padding: "30px",
				fontFamily: "Arial",
				maxWidth: "1100px",
				margin: "0 auto"
			}}
		>
			<h2 style={{ marginBottom: "25px" }}>
				Parts Management
			</h2>

			{loading && <p>Loading...</p>}

			{error && (
				<p style={{ color: "red", marginBottom: "15px" }}>
					{error}
				</p>
			)}

		
			<div
				style={{
					background: "#f8f8f8",
					padding: "20px",
					borderRadius: "10px",
					marginBottom: "30px"
				}}
			>
				<h3 style={{ marginBottom: "15px" }}>
					Add Part
				</h3>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
						gap: "15px"
					}}
				>
					<input name="partId" placeholder="Part ID" value={form.partId} onChange={handleChange} />
					<input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
					<input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
					<input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
					<input name="stockQuantity" placeholder="Stock" value={form.stockQuantity} onChange={handleChange} />
				</div>

				<button
					onClick={handleSubmit}
					disabled={loading}
					style={{
						marginTop: "20px",
						padding: "10px 18px",
						cursor: "pointer"
					}}
				>
					Add Part
				</button>
			</div>

		
			<div
				style={{
					background: "#fff",
					padding: "20px",
					borderRadius: "10px",
					border: "1px solid #ddd"
				}}
			>
				<h3 style={{ marginBottom: "20px" }}>
					Parts List
				</h3>

				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr style={{ background: "#f0f0f0" }}>
							<th style={thStyle}>Part ID</th>
							<th style={thStyle}>Name</th>
							<th style={thStyle}>Category</th>
							<th style={thStyle}>Price</th>
							<th style={thStyle}>Stock</th>
							<th style={thStyle}>Action</th>
						</tr>
					</thead>

					<tbody>
						{parts.length > 0 ? (
							parts.map((p) => (
								<tr key={p.id || p.partId}>
									<td style={tdStyle}>{p.partId || p.id}</td>
									<td style={tdStyle}>{p.name}</td>
									<td style={tdStyle}>{p.category}</td>
									<td style={tdStyle}>{p.price}</td>
									<td style={tdStyle}>{p.stockQuantity}</td>

									<td style={tdStyle}>
										<button onClick={() => handleRead(p)}>
											Read
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
									No parts found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			
			{showPopup && selectedPart && (
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
						zIndex: 999
					}}
				>
					<div
						style={{
							background: "white",
							padding: "30px",
							borderRadius: "12px",
							minWidth: "420px",
							boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
						}}
					>
						<h2 style={{ marginBottom: "20px", textAlign: "center" }}>
							Part Details
						</h2>

						<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
							<div>
								<strong>Part ID:</strong>
								<div>{selectedPart.partId}</div>
							</div>

							<div>
								<strong>Name:</strong>
								<div>{selectedPart.name}</div>
							</div>

							<div>
								<strong>Category:</strong>
								<div>{selectedPart.category}</div>
							</div>

							<div>
								<strong>Price:</strong>
								<div>{selectedPart.price}</div>
							</div>

							<div>
								<strong>Stock:</strong>
								<div>{selectedPart.stockQuantity}</div>
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
								cursor: "pointer"
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



const thStyle = {
	padding: "12px",
	textAlign: "left",
	borderBottom: "1px solid #ccc"
};

const tdStyle = {
	padding: "12px",
	borderBottom: "1px solid #eee"
};
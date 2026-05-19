import { useState } from "react";
import { createPurchase } from "../../services/api";

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

		const invoice = {
			vendorId: 1,
			items: items.map(i => ({
				partId: parseInt(i.partId),
				quantity: parseInt(i.quantity),
				price: parseFloat(i.price)
			}))
		};

		try {
			await createPurchase(invoice);

			setSubmittedItems(items);
			setItems([]);

			setSuccess("Purchase Invoice Created Successfully");
			setError("");

		} catch (err) {
			setError("Error creating invoice");
			console.error(err);
		}
	};

	const colStyle = {
		display: "flex",
		padding: "6px 0"
	};

	const cellStyle = {
		width: "120px"
	};

	return (
		<div style={{ padding: "20px", fontFamily: "Arial" }}>

			<h2 style={{ marginBottom: "20px" }}>
				Purchase Invoice
			</h2>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{/* INPUT */}
			<div style={{ marginBottom: "25px", display: "flex", gap: "10px" }}>
				<input
					name="partId"
					placeholder="Part ID"
					value={item.partId}
					onChange={handleChange}
				/>
				<input
					name="quantity"
					placeholder="Quantity"
					value={item.quantity}
					onChange={handleChange}
				/>
				<input
					name="price"
					placeholder="Price"
					value={item.price}
					onChange={handleChange}
				/>

				<button onClick={addItem}>Add Item</button>
			</div>

			{/* ================= CURRENT ITEMS ================= */}
			<h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
				Items
			</h3>

			<div style={{ ...colStyle, fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
				<span style={cellStyle}>Part ID</span>
				<span style={cellStyle}>Quantity</span>
				<span style={cellStyle}>Price</span>
			</div>

			{items.map((i, index) => (
				<div key={index} style={colStyle}>
					<span style={cellStyle}>{i.partId}</span>
					<span style={cellStyle}>{i.quantity}</span>
					<span style={cellStyle}>{i.price}</span>
				</div>
			))}

			{/* SUBMIT */}
			<div style={{ marginTop: "25px" }}>
				<button onClick={submitInvoice}>
					Submit Invoice
				</button>
			</div>

			{/* ================= SUCCESS ================= */}
			{success && (
				<div style={{ marginTop: "40px" }}>

					<h3 style={{ color: "green", marginBottom: "15px" }}>
						{success}
					</h3>

					<h4 style={{ marginBottom: "10px" }}>
						Invoice Summary
					</h4>

					<div style={{ ...colStyle, fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
						<span style={cellStyle}>Part ID</span>
						<span style={cellStyle}>Quantity</span>
						<span style={cellStyle}>Price</span>
					</div>

					{submittedItems.map((i, index) => (
						<div key={index} style={colStyle}>
							<span style={cellStyle}>{i.partId}</span>
							<span style={cellStyle}>{i.quantity}</span>
							<span style={cellStyle}>{i.price}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
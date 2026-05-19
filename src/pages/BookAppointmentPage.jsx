import { useState } from "react";
import axios from "axios";
import "../styles/book-appointment.css";

const API_BASE = "http://localhost:5285";

function BookAppointmentPage() {
    const [form, setForm] = useState({
        customerId: "",
        vehicleId: "",
        appointmentDate: "",
        serviceDescription: "",
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        try {
            const payload = {
                customerId: Number(form.customerId),
                vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
                appointmentDate: new Date(form.appointmentDate).toISOString(),
                serviceDescription: form.serviceDescription,
            };
            const res = await axios.post(`${API_BASE}/api/appointments`, payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data || "Failed to book appointment.");
        }
    };

    return (
        <section>
            <div className="page-header">
                <span className="feature-badge customer-badge">Feature 13 · Customer</span>
                <h1>Book Appointment</h1>
                <p className="subtitle">Schedule a service appointment for your vehicle.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Appointment Details</h3>
                <label>Customer ID</label>
                <input
                    name="customerId"
                    value={form.customerId}
                    onChange={set}
                    placeholder="Your customer ID"
                    required
                />
                <label>Vehicle ID (optional)</label>
                <input
                    name="vehicleId"
                    value={form.vehicleId}
                    onChange={set}
                    placeholder="Leave blank if not applicable"
                />
                <label>Appointment Date & Time</label>
                <input
                    name="appointmentDate"
                    type="datetime-local"
                    value={form.appointmentDate}
                    onChange={set}
                    required
                />
                <label>Service Description</label>
                <textarea
                    name="serviceDescription"
                    value={form.serviceDescription}
                    onChange={set}
                    placeholder="Describe what service you need..."
                    rows={3}
                    required
                />
                <button type="submit" className="btn-primary">
                    Book Appointment
                </button>
            </form>

            {error && <div className="error">{String(error)}</div>}
            {result && (
                <div className="card success">
                    <h3>✓ Appointment Booked!</h3>
                    <p>
                        <b>Appointment ID:</b> {result.appointmentId}
                    </p>
                    <p>
                        <b>Date:</b> {new Date(result.appointmentDate).toLocaleString()}
                    </p>
                    <p>
                        <b>Status:</b> {result.status}
                    </p>
                </div>
            )}
        </section>
    );
}

export default BookAppointmentPage;

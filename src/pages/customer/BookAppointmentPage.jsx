import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/book-appointment.css";

const API_BASE = "http://localhost:5285";

function BookAppointmentPage() {
    const customerId = localStorage.getItem("customerId");

    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({
        vehicleId: "",
        appointmentDate: "",
        serviceDescription: "",
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const set = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    useEffect(() => {
        const loadCustomerVehicles = async () => {
            if (!customerId) {
                setError("Customer session not found. Please login again.");
                return;
            }

            try {
                const res = await axios.get(`${API_BASE}/api/customers/${customerId}/details`);
                setVehicles(res.data.vehicles || []);
            } catch {
                setError("Could not load your vehicles.");
            }
        };

        loadCustomerVehicles();
    }, [customerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        if (!customerId) {
            setError("Customer session not found. Please login again.");
            return;
        }

        try {
            const payload = {
                customerId: Number(customerId),
                vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
                appointmentDate: new Date(form.appointmentDate).toISOString(),
                serviceDescription: form.serviceDescription,
            };

            const res = await axios.post(`${API_BASE}/api/appointments`, payload);
            setResult(res.data);

            setForm({
                vehicleId: "",
                appointmentDate: "",
                serviceDescription: "",
            });
        } catch (err) {
            setError(err.response?.data || "Failed to book appointment.");
        }
    };

    return (
        <section>
            <div className="page-header">
               
                <h1>Book Appointment</h1>
                <p className="subtitle">Schedule a service appointment for your vehicle.</p>
            </div>

            <form className="card" onSubmit={handleSubmit}>
                <h3 className="card-title">Appointment Details</h3>

                <label>Vehicle</label>
                <select
                    name="vehicleId"
                    value={form.vehicleId}
                    onChange={set}
                >
                    <option value="">No vehicle selected</option>
                    {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.vehicleNumber} — {vehicle.brand} {vehicle.model}
                        </option>
                    ))}
                </select>

                <label>Appointment Date & Time</label>
                <input
                    name="appointmentDate"
                    type="datetime-local"
                    value={form.appointmentDate}
                    onChange={set}
                    required
                />

                <label>Service Description *</label>
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
                    <h3>Appointment Booked</h3>
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
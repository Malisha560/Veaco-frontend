import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/history.css";

const API_BASE = "http://localhost:5285";

function HistoryPage() {
    const customerId = localStorage.getItem("customerId");

    const [data, setData] = useState(null);
    const [partRequests, setPartRequests] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        if (!customerId) {
            setError("Customer session not found. Please login again.");
            return;
        }

        setError("");

        try {
            const historyRes = await axios.get(
                `${API_BASE}/api/customers/${customerId}/purchase-history`
            );

            const partRes = await axios.get(
                `${API_BASE}/api/part-requests/customer/${customerId}`
            );

            setData(historyRes.data);
            setPartRequests(partRes.data);
        } catch (err) {
            setError(err.response?.data || "Failed to load history.");
        }
    };

    const statusColor = (status) => {
        if (status === "Completed") return "#16a34a";
        if (status === "Cancelled") return "#dc2626";
        if (status === "Confirmed") return "#2563eb";
        return "#d97706";
    };

    return (
        <section>
            <div className="page-header">
               
                <h1>My Purchase & Service History</h1>
                <p className="subtitle">
                    View your purchases, service appointments, and part requests.
                </p>
            </div>

            {error && <div className="error">{String(error)}</div>}

            {!data && !error && (
                <div className="card">
                    <p className="muted">Loading your history...</p>
                </div>
            )}

            {data && (
                <>
                    <div className="card">
                        <h3 className="card-title">
                            Purchase History ({data.invoices?.length || 0} invoices)
                        </h3>

                        {data.invoices?.length === 0 && (
                            <p className="muted">No purchases yet.</p>
                        )}

                        {data.invoices?.map((inv) => (
                            <div key={inv.id} className="invoice-box">
                                <div className="invoice-header">
                                    <b>Invoice #{inv.id}</b>
                                    <span className="invoice-date">
                                        {new Date(inv.invoiceDate).toLocaleDateString()}
                                    </span>
                                </div>

                                {inv.items?.map((item) => (
                                    <p key={item.id} className="invoice-item">
                                        {item.vehiclePart?.partName} × {item.quantity} @ Rs.{" "}
                                        {item.unitPrice} = Rs. {item.lineTotal}
                                    </p>
                                ))}

                                <div className="invoice-totals">
                                    <span>Subtotal: Rs. {inv.subTotal}</span>

                                    {inv.discountAmount > 0 && (
                                        <span className="discount">
                                            {" "} | Discount: -Rs. {inv.discountAmount}
                                        </span>
                                    )}

                                    <span className="grand-total">
                                        {" "} | Grand Total: Rs. {inv.grandTotal}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <h3 className="card-title">
                            Service Appointments ({data.appointments?.length || 0})
                        </h3>

                        {data.appointments?.length === 0 && (
                            <p className="muted">No appointments booked yet.</p>
                        )}

                        {data.appointments?.map((appt) => (
                            <div key={appt.id} className="appointment-box">
                                <div className="appt-header">
                                    <b>Appointment #{appt.id}</b>
                                    <span
                                        className="appt-status"
                                        style={{ color: statusColor(appt.status) }}
                                    >
                                        {appt.status}
                                    </span>
                                </div>

                                <p>{appt.serviceDescription}</p>

                                <p className="appt-date">
                                     {new Date(appt.appointmentDate).toLocaleString()}
                                </p>

                                {appt.vehicle && (
                                    <p className="appt-vehicle">
                                         {appt.vehicle.vehicleNumber} — {appt.vehicle.brand}{" "}
                                        {appt.vehicle.model}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <h3 className="card-title">
                            Part Request History ({partRequests.length})
                        </h3>

                        {partRequests.length === 0 && (
                            <p className="muted">No part requests submitted yet.</p>
                        )}

                        {partRequests.map((req) => (
                            <div key={req.id} className="appointment-box">
                                <div className="appt-header">
                                    <b>Request #{req.id}</b>
                                    <span
                                        className="appt-status"
                                        style={{ color: statusColor(req.status) }}
                                    >
                                        {req.status}
                                    </span>
                                </div>

                                <p>
                                    <b>Part:</b> {req.partName}
                                </p>

                                {req.notes && <p>{req.notes}</p>}

                                <p className="appt-date">
                                     {new Date(req.requestDate).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default HistoryPage;
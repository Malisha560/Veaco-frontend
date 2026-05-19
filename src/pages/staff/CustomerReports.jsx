import { useState } from "react";
import axios from "axios";
import "../styles/customerReports.css";

const API_BASE = "http://localhost:5285";

function CustomerReports() {
    const [reportType, setReportType] = useState("regular-customers");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const loadReport = async () => {
        setError("");
        setData([]);

        try {
            const response = await axios.get(
                `${API_BASE}/api/customer-reports/${reportType}`
            );

            setData(response.data);
        } catch {
            setError("Failed to load customer report.");
        }
    };

    return (
        <section>
            <h1>Customer Reports</h1>
            <p>Feature 9: Staff can generate reports for regular customers, high spenders, and pending credits.</p>

            <div className="report-card">
                <label>Report Type</label>

                <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="regular-customers">Regular Customers</option>
                    <option value="high-spenders">High Spenders</option>
                    <option value="pending-credits">Pending Credits</option>
                </select>

                <button onClick={loadReport}>Generate Report</button>
            </div>

            {error && <p className="error">{error}</p>}

            {data.length > 0 && (
                <div className="report-card">
                    <h3>Report Results</h3>

                    {data.map((item, index) => (
                        <div className="report-row" key={index}>
                            <p><b>Name:</b> {item.fullName}</p>
                            <p><b>Phone:</b> {item.phone}</p>
                            <p><b>Email:</b> {item.email}</p>

                            {item.totalPurchases !== undefined && (
                                <p><b>Total Purchases:</b> {item.totalPurchases}</p>
                            )}

                            {item.totalSpent !== undefined && (
                                <p><b>Total Spent:</b> Rs. {item.totalSpent}</p>
                            )}

                            {item.creditBalance !== undefined && (
                                <p><b>Pending Credit:</b> Rs. {item.creditBalance}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {data.length === 0 && !error && (
                <p className="empty-text">No report data loaded yet.</p>
            )}
        </section>
    );
}

export default CustomerReports;
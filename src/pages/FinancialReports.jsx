import { useState, useEffect } from "react";
import { getDailyReport, getMonthlyReport, getYearlyReport, getReportSummary } from "../services/api";
import "../styles/reports.css";

function FinancialReports() {
    // Which tab is currently active: "summary", "daily", "monthly", "yearly"
    const [activeTab, setActiveTab] = useState("summary");

    // Summary data shown on the dashboard cards
    const [summary, setSummary] = useState(null);

    // The report data returned from the API
    const [reportData, setReportData] = useState(null);

    // Loading and error states for user feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Input fields for filtering reports
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // today's date
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    // Load the summary cards when the page first opens
    useEffect(() => {
        getReportSummary()
            .then(setSummary)
            .catch(() => setError("Failed to load summary."));
    }, []);

    // Called when the user clicks "Generate Report"
    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setReportData(null);

        try {
            let data;
            if (activeTab === "daily") {
                data = await getDailyReport(date);
            } else if (activeTab === "monthly") {
                data = await getMonthlyReport(year, month);
            } else if (activeTab === "yearly") {
                data = await getYearlyReport(year);
            }
            setReportData(data);
        } catch (err) {
            setError("Failed to load report. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reports-page">
            <div className="reports-header">
                <h1>Financial Reports</h1>
                <p>View daily, monthly, and yearly revenue summaries</p>
            </div>

            {/* Summary cards at the top  always visible */}
            {summary && (
                <div className="summary-cards">
                    <div className="summary-card">
                        <span className="card-label">Today</span>
                        <span className="card-value">Rs. {summary.today.revenue.toLocaleString()}</span>
                        <span className="card-sub">{summary.today.invoices} invoices</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">This Month</span>
                        <span className="card-value">Rs. {summary.thisMonth.revenue.toLocaleString()}</span>
                        <span className="card-sub">{summary.thisMonth.invoices} invoices</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">This Year</span>
                        <span className="card-value">Rs. {summary.thisYear.revenue.toLocaleString()}</span>
                        <span className="card-sub">{summary.thisYear.invoices} invoices</span>
                    </div>
                </div>
            )}

            {/* Tab buttons to switch report type */}
            <div className="report-tabs">
                {["daily", "monthly", "yearly"].map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                        onClick={() => { setActiveTab(tab); setReportData(null); }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Filter inputs changes depending on active tab */}
            <div className="report-filters">
                {activeTab === "daily" && (
                    <div className="filter-group">
                        <label>Select Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                )}

                {activeTab === "monthly" && (
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                min="2020" max="2100"
                            />
                        </div>
                        <div className="filter-group">
                            <label>Month</label>
                            <select value={month} onChange={e => setMonth(e.target.value)}>
                                {["January","February","March","April","May","June",
                                    "July","August","September","October","November","December"]
                                    .map((m, i) => (
                                        <option key={i+1} value={i+1}>{m}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === "yearly" && (
                    <div className="filter-group">
                        <label>Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            min="2020" max="2100"
                        />
                    </div>
                )}

                <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
                    {loading ? "Loading..." : "Generate Report"}
                </button>
            </div>

            {/* Error message */}
            {error && <div className="error-msg">{error}</div>}

            {/* Report results */}
            {reportData && (
                <div className="report-results">
                    {/* Total stats */}
                    <div className="result-stats">
                        <div className="stat-box">
                            <span>Total Revenue</span>
                            <strong>Rs. {reportData.totalRevenue?.toLocaleString()}</strong>
                        </div>
                        <div className="stat-box">
                            <span>Total Invoices</span>
                            <strong>{reportData.totalInvoices}</strong>
                        </div>
                        <div className="stat-box">
                            <span>Total Discount</span>
                            <strong>Rs. {reportData.totalDiscount?.toLocaleString()}</strong>
                        </div>
                        <div className="stat-box">
                            <span>Items Sold</span>
                            <strong>{reportData.totalItemsSold}</strong>
                        </div>
                    </div>

                    {/* Daily breakdown table for monthly report */}
                    {reportData.dailyBreakdown && (
                        <div className="breakdown-table">
                            <h3>Daily Breakdown</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Invoices</th>
                                    <th>Revenue</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reportData.dailyBreakdown.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.date}</td>
                                        <td>{row.invoices}</td>
                                        <td>Rs. {row.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Monthly breakdown table for yearly report */}
                    {reportData.monthlyBreakdown && (
                        <div className="breakdown-table">
                            <h3>Monthly Breakdown</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Invoices</th>
                                    <th>Revenue</th>
                                    <th>Discount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reportData.monthlyBreakdown.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.month}</td>
                                        <td>{row.invoices}</td>
                                        <td>Rs. {row.revenue.toLocaleString()}</td>
                                        <td>Rs. {row.discount.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Invoice list for daily report */}
                    {reportData.invoices && reportData.invoices.length > 0 && (
                        <div className="breakdown-table">
                            <h3>Invoices</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Grand Total</th>
                                    <th>Discount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reportData.invoices.map((inv, i) => (
                                    <tr key={i}>
                                        <td>#{inv.id}</td>
                                        <td>{inv.customer}</td>
                                        <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                                        <td>Rs. {inv.grandTotal.toLocaleString()}</td>
                                        <td>Rs. {inv.discountAmount.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Empty state */}
                    {reportData.invoices?.length === 0 && !reportData.dailyBreakdown && !reportData.monthlyBreakdown && (
                        <p className="empty-msg">No data found for this period.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default FinancialReports;

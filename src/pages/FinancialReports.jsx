import { useState, useEffect } from "react";
import { getDailyReport, getMonthlyReport, getYearlyReport, getReportSummary } from "../services/api";
import "../styles/reports.css";

function FinancialReports() {
    const [activeTab, setActiveTab] = useState("daily");
    const [summary, setSummary] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        getReportSummary()
            .then(res => setSummary(res.data))
            .catch(() => setError("Failed to load summary."));
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setReportData(null);
        try {
            let res;
            if (activeTab === "daily") res = await getDailyReport(date);
            else if (activeTab === "monthly") res = await getMonthlyReport(year, month);
            else res = await getYearlyReport(year);
            setReportData(res.data);
        } catch {
            setError("Failed to load report. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    };

    const monthNames = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];

    return (
        <div className="reports-page">
            <div className="reports-header">
                <div>
                    <p className="reports-date">{new Date().toDateString()}</p>
                    <h1>Financial Reports</h1>
                    <p className="reports-subtitle">View daily, monthly, and yearly revenue summaries</p>
                </div>
            </div>

            {/* Summary Cards */}
            {summary && (
                <div className="reports-summary-grid">
                    <div className="report-stat-card">
                        <span>Today's Revenue</span>
                        <h2>Rs. {summary.today?.revenue?.toLocaleString() ?? 0}</h2>
                        <p>{summary.today?.invoices ?? 0} invoices</p>
                    </div>
                    <div className="report-stat-card">
                        <span>This Month</span>
                        <h2>Rs. {summary.thisMonth?.revenue?.toLocaleString() ?? 0}</h2>
                        <p>{summary.thisMonth?.invoices ?? 0} invoices</p>
                    </div>
                    <div className="report-stat-card">
                        <span>This Year</span>
                        <h2>Rs. {summary.thisYear?.revenue?.toLocaleString() ?? 0}</h2>
                        <p>{summary.thisYear?.invoices ?? 0} invoices</p>
                    </div>
                </div>
            )}

            {/* Tab + Filter Row */}
            <div className="reports-controls">
                <div className="reports-tabs">
                    {["daily", "monthly", "yearly"].map(tab => (
                        <button
                            key={tab}
                            className={`report-tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => { setActiveTab(tab); setReportData(null); }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="reports-filter-row">
                    {activeTab === "daily" && (
                        <input
                            type="date"
                            className="report-input"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    )}
                    {activeTab === "monthly" && (
                        <>
                            <input
                                type="number"
                                className="report-input"
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                placeholder="Year"
                            />
                            <select
                                className="report-input"
                                value={month}
                                onChange={e => setMonth(e.target.value)}
                            >
                                {monthNames.map((m, i) => (
                                    <option key={i+1} value={i+1}>{m}</option>
                                ))}
                            </select>
                        </>
                    )}
                    {activeTab === "yearly" && (
                        <input
                            type="number"
                            className="report-input"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            placeholder="Year"
                        />
                    )}
                    <button className="report-generate-btn" onClick={handleGenerate} disabled={loading}>
                        {loading ? "Loading..." : "Generate Report"}
                    </button>
                </div>
            </div>

            {error && <div className="report-error">{error}</div>}

            {/* Report Results */}
            {reportData && (
                <div className="report-results">
                    <div className="report-totals-grid">
                        <div className="report-total-card">
                            <span>Total Revenue</span>
                            <h2>Rs. {reportData.totalRevenue?.toLocaleString()}</h2>
                        </div>
                        <div className="report-total-card">
                            <span>Total Invoices</span>
                            <h2>{reportData.totalInvoices}</h2>
                        </div>
                        <div className="report-total-card">
                            <span>Total Discount</span>
                            <h2>Rs. {reportData.totalDiscount?.toLocaleString()}</h2>
                        </div>
                        <div className="report-total-card">
                            <span>Items Sold</span>
                            <h2>{reportData.totalItemsSold}</h2>
                        </div>
                    </div>

                    {/* Daily invoices breakdown */}
                    {reportData.invoices && reportData.invoices.length > 0 && (
                        <div className="report-table-wrap">
                            <h3>Invoice Breakdown</h3>
                            <table className="report-table">
                                <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Subtotal</th>
                                    <th>Discount</th>
                                    <th>Grand Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reportData.invoices.map((inv, i) => (
                                    <tr key={i}>
                                        <td>#{inv.id}</td>
                                        <td>{inv.customer}</td>
                                        <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                                        <td>Rs. {inv.subTotal?.toLocaleString()}</td>
                                        <td>Rs. {inv.discountAmount?.toLocaleString()}</td>
                                        <td>Rs. {inv.grandTotal?.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Monthly daily breakdown */}
                    {reportData.dailyBreakdown && (
                        <div className="report-table-wrap">
                            <h3>Daily Breakdown</h3>
                            <table className="report-table">
                                <thead>
                                <tr><th>Date</th><th>Invoices</th><th>Revenue</th></tr>
                                </thead>
                                <tbody>
                                {reportData.dailyBreakdown.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.date}</td>
                                        <td>{row.invoices}</td>
                                        <td>Rs. {row.revenue?.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Yearly monthly breakdown */}
                    {reportData.monthlyBreakdown && (
                        <div className="report-table-wrap">
                            <h3>Monthly Breakdown</h3>
                            <table className="report-table">
                                <thead>
                                <tr><th>Month</th><th>Invoices</th><th>Revenue</th><th>Discount</th></tr>
                                </thead>
                                <tbody>
                                {reportData.monthlyBreakdown.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.month}</td>
                                        <td>{row.invoices}</td>
                                        <td>Rs. {row.revenue?.toLocaleString()}</td>
                                        <td>Rs. {row.discount?.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {reportData.invoices?.length === 0 && !reportData.dailyBreakdown && !reportData.monthlyBreakdown && (
                        <p className="report-empty">No data found for this period.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default FinancialReports;

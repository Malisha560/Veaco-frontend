import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReportSummary, getNotificationSummary, getStaff, getMonthlyReport } from "../../services/api";
import "../../styles/dashboard.css";
import bellImage from "../../assets/notification.png";
export default function Dashboard() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [staff, setStaff] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Get logged in user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        fetchDashboardData();
        fetchChartData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [reportRes, notificationRes, staffRes] = await Promise.all([
                getReportSummary(),
                getNotificationSummary(),
                getStaff(),
            ]);
            setSummary(reportRes.data);
            setNotifications(notificationRes.data);
            setStaff(staffRes.data);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    };

    // Fetch last 6 months of revenue for the chart
    const fetchChartData = async () => {
        const months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({ year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString("default", { month: "short" }) });
        }
        const results = await Promise.all(
            months.map(m => getMonthlyReport(m.year, m.month).then(r => ({ label: m.label, revenue: r.data.totalRevenue || 0 })).catch(() => ({ label: m.label, revenue: 0 })))
        );
        setChartData(results);
    };

    const alertCount = notifications?.lowStockItems?.length ?? 0;

    // Get hour-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    // Logout — clear storage and go to login
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    // Quick action navigation
    const handleQuickAction = (action) => {
        if (action === "Register staff") navigate("/admin/staff");
        else if (action === "Add part") navigate("/admin/parts");
        else if (action === "Create purchase invoice") navigate("/admin/purchase");
        else if (action === "Add vendor") navigate("/admin/vendors");
    };

    // Chart max value for scaling bars
    const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-date">{new Date().toDateString()}</p>
                    <h1>{getGreeting()}, {user.fullName?.split(" ")[0] || "Admin"}</h1>
                    <p className="dashboard-subtitle">Here's what's happening across the workshop today.</p>
                </div>

                <div className="dashboard-header-right">
                    <input
                        className="dashboard-search"
                        placeholder="Search parts, invoices, customers..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter" && searchQuery.trim()) {
                                navigate(`/customers?search=${searchQuery}`);
                            }
                        }}
                    />

                    {/* Bell notification icon */}
                    <div className="bell-wrap">
                        <button
                            className="bell-btn"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >

                            <img src={bellImage} alt="Notifications" className="bell-icon" />

                            {alertCount > 0 && (
                                <span className="bell-badge">{alertCount}</span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="notif-dropdown">
                                <div className="notif-dropdown-header">
                                    <h4>Notifications</h4>
                                    <button className="notif-close" onClick={() => setShowNotifications(false)}>✕</button>
                                </div>
                                {alertCount > 0 ? (
                                    notifications.lowStockItems.map((item, i) => (
                                        <div className="notif-item" key={i}>
                                            
                                            <div>
                                                <p className="notif-title">{item.partName}</p>
                                                <p className="notif-sub">Only {item.stockQuantity} units left</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="notif-empty">No alerts right now</p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <span>Today's sales</span>
                    <h2>Rs. {summary?.today?.revenue?.toLocaleString() ?? 0}</h2>
                    <p>Revenue generated today</p>
                </div>
                <div className="stat-card">
                    <span>This month</span>
                    <h2>Rs. {summary?.thisMonth?.revenue?.toLocaleString() ?? 0}</h2>
                    <p>Monthly revenue</p>
                </div>
                <div className="stat-card">
                    <span>Low stock items</span>
                    <h2>{alertCount}</h2>
                    <p>Below threshold</p>
                </div>
                <div className="stat-card">
                    <span>Pending credits</span>
                    <h2>{summary?.pendingCredits ?? 0}</h2>
                    <p>Outstanding customers</p>
                </div>
                <div className="stat-card">
                    <span>Active staff</span>
                    <h2>{staff.filter(s => s.role === "Staff").length}</h2>
                    <p>Staff accounts</p>
                </div>
                <div className="stat-card">
                    <span>This year</span>
                    <h2>Rs. {summary?.thisYear?.revenue?.toLocaleString() ?? 0}</h2>
                    <p>Total yearly revenue</p>
                </div>
            </div>

            {/* Chart + Quick Actions row */}
            <div className="dashboard-bottom">
                <div className="attention-panel">
                    {/* Revenue Chart */}
                    <div className="section-header">
                        <h3>Revenue — Last 6 Months</h3>
                    </div>
                    <div className="bar-chart">
                        {chartData.map((d, i) => (
                            <div className="bar-col" key={i}>
                                <div className="bar-label-top">
                                    {d.revenue > 0 ? `Rs.${(d.revenue/1000).toFixed(0)}k` : ""}
                                </div>
                                <div
                                    className="bar"
                                    style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                                />
                                <div className="bar-label">{d.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Needs attention */}
                    <div className="section-header" style={{ marginTop: "32px" }}>
                        <h3>Needs your attention</h3>
                    </div>
                    <div className="attention-list">
                        {alertCount > 0 ? (
                            notifications.lowStockItems.map((item, i) => (
                                <div className="attention-item" key={i}>
                                    <div>
                                        <h4>{item.partName}</h4>
                                        <p>Stock: {item.stockQuantity} units remaining</p>
                                    </div>
                                    <button onClick={() => navigate("/sales")}>Restock</button>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: "#7B8576", fontSize: "14px" }}>No low stock alerts</p>
                        )}
                    </div>
                </div>

                <div className="quick-actions">
                    <h3>Quick actions</h3>
                    {["Add part", "Add vendor", "Create purchase invoice", "Register staff"].map(action => (
                        <button key={action} onClick={() => handleQuickAction(action)}>
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

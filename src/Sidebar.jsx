import { Link } from "react-router-dom";
import "./Sidebar.jsx.css";

function Sidebar() {
    const navItems = [
        { key: "staff-register", label: "F6: Register Customer", role: "Staff", path: "/staff-register" },
        { key: "sales", label: "F7: Sales Invoice", role: "Staff", path: "/sales" },
        { key: "customer-lookup", label: "F8: Customer Lookup", role: "Staff", path: "/customer-lookup" },
        { key: "self-register", label: "F12: Self Register", role: "Customer", path: "/self-register" },
        { key: "manage-profile", label: "F12: Manage Profile", role: "Customer", path: "/manage-profile" },
        { key: "book-appointment", label: "F13: Book Appointment", role: "Customer", path: "/book-appointment" },
        { key: "part-request", label: "F13: Request Part", role: "Customer", path: "/part-request" },
        { key: "service-review", label: "F13: Review Service", role: "Customer", path: "/service-review" },
        { key: "history", label: "F14: My History", role: "Customer", path: "/history" },
    ];

    const staffPages = navItems.filter((n) => n.role === "Staff");
    const customerPages = navItems.filter((n) => n.role === "Customer");

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="logo-icon">🔧</span>
                <h2>Veaco</h2>
            </div>

            <div className="nav-group">
                <div className="nav-group-label">Staff Portal</div>
                {staffPages.map((item) => (
                    <Link key={item.key} to={item.path} className="nav-link">
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="nav-group">
                <div className="nav-group-label">Customer Portal</div>
                {customerPages.map((item) => (
                    <Link key={item.key} to={item.path} className="nav-link">
                        {item.label}
                    </Link>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

function Sidebar() {
    const staffPages = [
        { label: "Register Customer", path: "/staff-register" },
        { label: "Sales Invoice", path: "/sales" },
        { label: "Customer Lookup", path: "/customer-lookup" },
    ];

    const customerPages = [
        { label: "Manage Profile", path: "/manage-profile" },
        { label: "Book Appointment", path: "/book-appointment" },
        { label: "Request Part", path: "/part-request" },
        { label: "Review Service", path: "/service-review" },
        { label: "My History", path: "/history" },
    ];

    return (
        <aside className="sidebar">
            <div className="brand">
                <img src={logo} alt="Veaco logo" className="brand-logo" />
            </div>

            <div className="nav-group">
                <p className="sidebar-label">Staff Portal</p>
                {staffPages.map((item) => (
                    <Link key={item.path} to={item.path}>
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="nav-group">
                <p className="sidebar-label sidebar-label-gap">Customer Portal</p>
                {customerPages.map((item) => (
                    <Link key={item.path} to={item.path}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
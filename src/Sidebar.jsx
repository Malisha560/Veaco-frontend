import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function Sidebar() {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const staffPages = [
        { label: "Register Customer", path: "/staff/register-customer" },
        { label: "Sales Invoice", path: "/staff/sales" },
        { label: "Customer Lookup", path: "/staff/customer-lookup" },
        { label: "Customer Reports", path: "/staff/customer-reports" },
    ];

    const customerPages = [
        { label: "Manage Profile", path: "/customer/manage-profile" },
        { label: "Book Appointment", path: "/customer/book-appointment" },
        { label: "Request Part", path: "/customer/part-request" },
        { label: "Review Service", path: "/customer/service-review" },
        { label: "My History", path: "/customer/history" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("customerId");
        localStorage.removeItem("adminLoggedIn");

        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="brand">
                <img src={logo} alt="Veaco logo" className="brand-logo" />
            </div>

            {role === "Staff" && (
                <div className="nav-group">
                    <p className="sidebar-label">Staff Portal</p>
                    {staffPages.map((item) => (
                        <Link key={item.path} to={item.path}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

            {role === "Customer" && (
                <div className="nav-group">
                    <p className="sidebar-label">Customer Portal</p>
                    {customerPages.map((item) => (
                        <Link key={item.path} to={item.path}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

            {(role === "Staff" || role === "Customer") && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </aside>
    );
}

export default Sidebar;
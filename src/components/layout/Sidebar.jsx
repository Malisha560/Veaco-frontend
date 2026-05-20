import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Parts", path: "/admin/parts" },
        { name: "Vendors", path: "/admin/vendors" },
        { name: "Purchase", path: "/admin/purchase" },
        { name: "Reports", path: "/admin/reports" },
        { name: "Staff", path: "/admin/staff" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin");
    };

    // Get logged in user name
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <aside className="admin-sidebar">
            <div>
                <div className="brand">
                    <img src={logo} alt="Veaco logo" className="brand-logo" />
                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* User info + logout at the bottom */}
            <div className="sidebar-footer">
                <button className="sidebar-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

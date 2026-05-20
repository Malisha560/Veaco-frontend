import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Customers", path: "/customers" },
        { name: "Reports", path: "/reports" },
        { name: "Staff", path: "/staff" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    // Get logged in user name
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <aside className="sidebar">
            <div>
                <h1 className="sidebar-logo">Veaco</h1>

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
                <div className="sidebar-user">
                    <div className="sidebar-avatar">
                        {user.fullName?.charAt(0) || "A"}
                    </div>
                    <div>
                        <p className="sidebar-user-name">{user.fullName || "Admin"}</p>
                        <p className="sidebar-user-role">{user.role || "Admin"}</p>
                    </div>
                </div>
                <button className="sidebar-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

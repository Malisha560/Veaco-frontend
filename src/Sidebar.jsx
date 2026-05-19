import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
                <img src={logo} alt="Veaco logo" className="brand-logo" />
            </div>

            <p className="sidebar-label">Workspace</p>

            <Link to="/">Sales</Link>
            <Link to="/customer">Customer</Link>
            <Link to="/customer-reports">Customer Reports</Link>
        </aside>
    );
}

export default Sidebar;
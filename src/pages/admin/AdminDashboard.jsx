import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin-login");
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Admin protected area.</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default AdminDashboard;
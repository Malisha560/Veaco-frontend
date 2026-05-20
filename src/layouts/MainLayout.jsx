import AdminSidebar from "../components/layout/Sidebar";
import "../styles/sidebar.css";

function MainLayout({ children }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;
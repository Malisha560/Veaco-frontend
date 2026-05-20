import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            <Sidebar />

            <main style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;
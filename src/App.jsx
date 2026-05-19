import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CustomerRegister from "./pages/CustomerRegister";
import StaffLogin from "./pages/StaffLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/customer-register" element={<CustomerRegister />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboard />
                        </ProtectedAdminRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
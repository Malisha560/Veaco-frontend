import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import FinancialReports from "./pages/FinancialReports";
import SalesInvoice from "./pages/SalesInvoice";
import StaffManagement from "./pages/StaffManagement";
import CustomerDetails from "./pages/CustomerDetails";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";

// Protects routes — redirects to login if not logged in
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login Page */}
                <Route path="/" element={<Login />} />

                {/* Protected Main Layout */}
                <Route element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sales" element={<SalesInvoice />} />
                    <Route path="/customers" element={<CustomerDetails />} />
                    <Route path="/reports" element={<FinancialReports />} />
                    <Route path="/staff" element={<StaffManagement />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

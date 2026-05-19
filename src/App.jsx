import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import StaffLogin from "./pages/StaffLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import Sidebar from "./Sidebar";

import StaffRegisterPage from "./pages/StaffRegisterPage";
import SalesInvoicePage from "./pages/SalesInvoicePage";
import CustomerLookupPage from "./pages/CustomerLookupPage";

import SelfRegisterPage from "./pages/SelfRegisterPage";
import ManageProfilePage from "./pages/ManageProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import PartRequestPage from "./pages/PartRequestPage";
import ServiceReviewPage from "./pages/ServiceReviewPage";
import HistoryPage from "./pages/HistoryPage";

import "./index.css";

function DashboardLayout({ children }) {
    return (
        <div className="app">
            <Sidebar />
            <main className="content">{children}</main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/customer-register" element={<SelfRegisterPage />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Staff pages */}
                <Route
                    path="/staff/register-customer"
                    element={
                        <DashboardLayout>
                            <StaffRegisterPage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/staff/sales"
                    element={
                        <DashboardLayout>
                            <SalesInvoicePage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/staff/customer-lookup"
                    element={
                        <DashboardLayout>
                            <CustomerLookupPage />
                        </DashboardLayout>
                    }
                />

                {/* Customer pages */}
                <Route
                    path="/customer/manage-profile"
                    element={
                        <DashboardLayout>
                            <ManageProfilePage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/customer/book-appointment"
                    element={
                        <DashboardLayout>
                            <BookAppointmentPage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/customer/part-request"
                    element={
                        <DashboardLayout>
                            <PartRequestPage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/customer/service-review"
                    element={
                        <DashboardLayout>
                            <ServiceReviewPage />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/customer/history"
                    element={
                        <DashboardLayout>
                            <HistoryPage />
                        </DashboardLayout>
                    }
                />

                {/* Admin */}
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
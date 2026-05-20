import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import Sidebar from "./Sidebar";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import StaffRegisterPage from "./pages/staff/StaffRegisterPage";
import SalesInvoicePage from "./pages/SalesInvoicePage";
import CustomerLookupPage from "./pages/CustomerLookupPage";
import CustomerReports from "./pages/staff/CustomerReports";

import SelfRegisterPage from "./pages/SelfRegisterPage";

import ManageProfilePage from "./pages/customer/ManageProfilePage";
import BookAppointmentPage from "./pages/customer/BookAppointmentPage";
import PartRequestPage from "./pages/customer/PartRequestPage";
import ServiceReviewPage from "./pages/customer/ServiceReviewPage";
import HistoryPage from "./pages/customer/HistoryPage";

import Vendors from "./pages/Vendors";
import CustomerSearch from "./pages/CustomerSearch";

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

                {/* Public Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/customer-register" element={<SelfRegisterPage />} />

                {/* STAFF ROUTES */}

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

                <Route
                    path="/staff/customer-reports"
                    element={
                        <DashboardLayout>
                            <CustomerReports />
                        </DashboardLayout>
                    }
                />

                <Route
                    path="/staff/customer-search"
                    element={
                        <DashboardLayout>
                            <CustomerSearch />
                        </DashboardLayout>
                    }
                />

                {/* CUSTOMER ROUTES */}

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

                {/* ADMIN ROUTES */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboard />
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/vendors"
                    element={
                        <DashboardLayout>
                            <Vendors />
                        </DashboardLayout>
                    }
                />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
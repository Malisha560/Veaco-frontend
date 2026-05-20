import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

import Sidebar from "./Sidebar";
import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/admin/Dashboard";
import MainLayout from "./layouts/MainLayout";
import FinancialReports from "./pages/admin/FinancialReports";
import StaffManagement from "./pages/admin/StaffManagement";

import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.jsx";

import StaffRegisterPage from "./pages/staff/StaffRegisterPage";
import SalesInvoicePage from "./pages/staff/SalesInvoicePage";
import CustomerLookupPage from "./pages/staff/CustomerLookupPage";
import CustomerReports from "./pages/staff/CustomerReports";

import SelfRegisterPage from "./pages/SelfRegisterPage";

import ManageProfilePage from "./pages/customer/ManageProfilePage";
import BookAppointmentPage from "./pages/customer/BookAppointmentPage";
import PartRequestPage from "./pages/customer/PartRequestPage";
import ServiceReviewPage from "./pages/customer/ServiceReviewPage";
import HistoryPage from "./pages/customer/HistoryPage";

import "./index.css";
import Parts from "./pages/admin/Parts.jsx";
import Purchase from "./pages/admin/Purchase.jsx";
import Vendors from "./pages/admin/Vendors.jsx";


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

                <Route path="/admin" element={<AdminLoginPage />} />
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

                <Route path="/admin" element={<AdminLoginPage />} />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <Dashboard />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />
                <Route
                    path="/admin/parts"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <Parts />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/vendors"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <Vendors />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/purchase"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <Purchase />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <FinancialReports />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/staff"
                    element={
                        <ProtectedAdminRoute>
                            <MainLayout>
                                <StaffManagement />
                            </MainLayout>
                        </ProtectedAdminRoute>
                    }
                />

               

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
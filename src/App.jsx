import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Sidebar />
                <main className="content">
                    <Routes>
                        <Route path="/staff-register" element={<StaffRegisterPage />} />
                        <Route path="/sales" element={<SalesInvoicePage />} />
                        <Route path="/customer-lookup" element={<CustomerLookupPage />} />
                        <Route path="/self-register" element={<SelfRegisterPage />} />
                        <Route path="/manage-profile" element={<ManageProfilePage />} />
                        <Route path="/book-appointment" element={<BookAppointmentPage />} />
                        <Route path="/part-request" element={<PartRequestPage />} />
                        <Route path="/service-review" element={<ServiceReviewPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/" element={<StaffRegisterPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
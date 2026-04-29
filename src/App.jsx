import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SalesInvoice from "./pages/SalesInvoice";
import CustomerDetails from "./pages/CustomerDetails";
import FinancialReports from "./pages/FinancialReports";
import StaffManagement from "./pages/StaffManagement";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <aside className="sidebar">
                    <h2>Veaco</h2>

                    {/* Malisha's pages */}
                    <Link to="/">Sales</Link>
                    <Link to="/customer">Customer</Link>

                    {/* Aayush's pages */}
                    <Link to="/reports">Financial Reports</Link>
                    <Link to="/staff">Staff Management</Link>
                </aside>

                <main className="content">
                    <Routes>
                        {/* Malisha's routes */}
                        <Route path="/" element={<SalesInvoice />} />
                        <Route path="/customer" element={<CustomerDetails />} />

                        {/* Aayush's routes */}
                        <Route path="/reports" element={<FinancialReports />} />
                        <Route path="/staff" element={<StaffManagement />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;

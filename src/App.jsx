import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SalesInvoice from "./pages/SalesInvoice";
import CustomerDetails from "./pages/CustomerDetails";

import "./index.css";
function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <aside className="sidebar">
                    <h2>Veaco</h2>

                    <Link to="/">Sales</Link>
                    <Link to="/customer">Customer</Link>
                    
                </aside>

                <main className="content">
                    <Routes>
                        <Route path="/" element={<SalesInvoice />} />
                        <Route path="/customer" element={<CustomerDetails />} />
                        
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
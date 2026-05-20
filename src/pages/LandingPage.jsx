import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/landing.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="nav-spacer"></div>

                <div className="landing-brand">
                    <img src={logo} alt="Veaco Logo" />
                </div>

                <div className="nav-spacer"></div>
            </nav>

            <section className="hero-section">
                <div className="hero-left">
                    <div className="dashboard-preview">
                        <div className="preview-card">
                            <h3>Service Management</h3>
                            <p>Organise appointments, vehicle records and service updates in one place.</p>
                        </div>

                        <div className="preview-card">
                            <h3>Parts Inventory</h3>
                            <p>Track vehicle parts, stock levels and purchase records easily.</p>
                        </div>

                        <div className="preview-card">
                            <h3>Billing & Reports</h3>
                            <p>Create invoices and view simple reports for daily workshop operations.</p>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <p className="hero-badge">
                        Vehicle Parts & Service Management
                    </p>

                    <h1>
                        Smarter Vehicle <br />
                        Service Management
                    </h1>

                    <p className="hero-description">
                        Manage customers, invoices, vehicle parts,
                        appointments, reports, and inventory through
                        one modern management system.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/customer-register" className="primary-btn">
                            Customer Register
                        </Link>

                        <Link to="/login" className="secondary-btn">
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
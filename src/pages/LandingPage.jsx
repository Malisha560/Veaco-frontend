import { Link } from "react-router-dom";
import logo from "../assets/veaco-logo.png";
import "../styles/landing.css";

function LandingPage() {
    return (
        <div className="landing-page">

            <nav className="landing-nav">
                <div className="landing-brand">
                    <img src={logo} alt="Veaco Logo" />
                </div>

                <div className="landing-links">
                    <a href="#">Features</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                </div>
            </nav>

            <section className="hero-section">

                <div className="hero-left">
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

                        <Link to="/customer-login" className="secondary-btn">
                            Customer Login
                        </Link>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="dashboard-preview">

                        <div className="preview-card">
                            <h3>Invoices Today</h3>
                            <h1>42</h1>
                            <p>+12% from yesterday</p>
                        </div>

                        <div className="preview-card">
                            <h3>Revenue</h3>
                            <h1>$14,280</h1>
                            <p>Monthly overview</p>
                        </div>

                        <div className="preview-card">
                            <h3>Low Stock Parts</h3>
                            <h1>8</h1>
                            <p>Need restocking</p>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    );
}

export default LandingPage;
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpeg";
import "../styles/landing.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="nav-left">
                    <span className="nav-logo">Veaco</span>
                </div>

                <div className="nav-right">
                    <Link to="/login" className="nav-login-btn">
                        Login
                    </Link>
                </div>
            </nav>

            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Manage your workshop
                        <br />
                        like never before.
                    </h1>

                    <p className="hero-subtitle">
                        Parts inventory, sales invoices,
                        financial reports, and customer
                        management — all in one modern
                        platform built for vehicle service centers.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/customer-register"
                            className="primary-btn"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="secondary-btn"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                <div className="hero-image-wrap">
                    <img
                        className="hero-image"
                        src={heroImage}
                        alt="Workshop"
                    />
                </div>
            </section>

            <section className="features-section">
                <div className="feature-item">
                    <h3>Parts Inventory</h3>
                    <p>
                        Track stock levels, get low stock alerts,
                        and manage vendors all in one place.
                    </p>
                </div>

                <div className="feature-item">
                    <h3>Sales & Invoices</h3>
                    <p>
                        Create sales invoices, apply loyalty
                        discounts, and email them directly
                        to customers.
                    </p>
                </div>

                <div className="feature-item">
                    <h3>Financial Reports</h3>
                    <p>
                        View daily, monthly, and yearly revenue
                        with detailed breakdowns and summaries.
                    </p>
                </div>

                <div className="feature-item">
                    <h3>Staff Management</h3>
                    <p>
                        Register staff, assign roles,
                        and manage accounts with full admin control.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
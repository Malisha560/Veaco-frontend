import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div style={{
            width: "220px",
            background: "#0b1b35",
            color: "white",
            padding: "20px",
            minHeight: "100vh"
        }}>
            <h2>Veaco</h2>

            <Link to="/" style={linkStyle}>Sales Invoice</Link>
            <Link to="/customer" style={linkStyle}>Customer Details</Link>

            {/* Team members add links here */}
        </div>
    );
}

const linkStyle = {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px"
};

export default Sidebar;
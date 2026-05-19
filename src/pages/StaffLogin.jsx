import "../styles/auth.css";

function StaffLogin() {
    return (
        <div className="auth-page">
            <form className="auth-card">
                <h1>Staff Login</h1>
                <p>Login to access staff workspace.</p>

                <label>Email</label>
                <input />

                <label>Password</label>
                <input type="password" />

                <button type="button">Login</button>
            </form>
        </div>
    );
}

export default StaffLogin;
import { useState, useEffect } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (admin) {
        navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const res = await axios.get(
        `/admins?email=${email}&password=${password}`
        );

        if (res.data.length === 0) {
        setError("Invalid email or password");
        return;
        }

        localStorage.setItem("admin", JSON.stringify(res.data[0]));
        navigate("/dashboard");
    };

    return (
        <div className="auth-page">
        <form className="auth-card" onSubmit={handleLogin}>
            <h2>Admin Login</h2>

            {error && <div className="error-msg">{error}</div>}

            <div className="input-group">
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>

            <div className="input-group password-group">
            <label>Password</label>

            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <i
                className={`fa-solid ${
                showPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
            ></i>
            </div>

            <button type="submit">Login</button>

            <p className="switch-auth">
            Don&apos;t have an account?{" "}
            <Link to="/admin-register">Register</Link>
            </p>
        </form>
        </div>
    );
};

export default AdminLogin;

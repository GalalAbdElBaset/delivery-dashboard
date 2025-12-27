import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const check = await axios.get(`/admins?email=${email}`);
    if (check.data.length > 0) {
      setError("Email already registered");
      return;
    }

    await axios.post("/admins", {
      email,
      password,
      role: "admin",
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(
      "admin",
      JSON.stringify({ email, role: "admin" })
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Admin Register</h2>

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

        <button type="submit">Register</button>

        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/admin-login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;

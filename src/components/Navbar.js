import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="navbar">
      <h2>
        <i className="fa-solid fa-truck-fast"></i> Delivery Dashboard
      </h2>

      <div style={{ display: "flex", gap: "10px" }}>

        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <>
              <i className="fa-solid fa-moon"></i> Dark
            </>
          ) : (
            <>
              <i className="fa-solid fa-sun"></i> Light
            </>
          )}
        </button>


        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

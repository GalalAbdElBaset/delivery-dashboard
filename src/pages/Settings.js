import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("admin");
    setShowConfirm(false);
    setShowToast(true);

    setTimeout(() => {
      navigate("/admin-login");
    }, 1200);
  };

  return (
    <div className="page">
      <h2>
        <i className="fa-solid fa-gear"></i> Settings
      </h2>


      <div className="card settings-card">
        <h3>Theme</h3>
        <p>Switch between Light and Dark mode</p>

        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <>
              <i className="fa-solid fa-moon"></i> Enable Dark Mode
            </>
          ) : (
            <>
              <i className="fa-solid fa-sun"></i> Enable Light Mode
            </>
          )}
        </button>
      </div>

      <div className="card settings-card danger">
        <h3>Logout</h3>
        <p>You will be logged out from the admin dashboard</p>

        <button
          className="logout-btn"
          onClick={() => setShowConfirm(true)}
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Toast */}
      {showToast && <Toast message="Logged out successfully" />}
    </div>
  );
};

export default Settings;

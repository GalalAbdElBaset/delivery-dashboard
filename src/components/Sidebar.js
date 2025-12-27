import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" end>
        <i className="fa-solid fa-chart-line"></i> Dashboard
      </NavLink>

      <NavLink to="/orders">
        <i className="fa-solid fa-boxes-stacked"></i> Orders
      </NavLink>

      <NavLink to="/settings">
        <i className="fa-solid fa-gear"></i> Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;

import axios from "../api/axiosConfig";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/orders").then(res => setOrders(res.data));
  }, []);

  const pending = orders.filter(o => o.status === "Pending").length;
  const onWay = orders.filter(o => o.status === "On The Way").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;

  return (
    <div className="page shimmer skeleton-card">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat-card">
          <i className="fa-solid fa-box"></i>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>

        <div className="stat-card pending">
          <i className="fa-solid fa-clock"></i>
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card way">
          <i className="fa-solid fa-truck"></i>
          <h3>{onWay}</h3>
          <p>On The Way</p>
        </div>

        <div className="stat-card delivered">
          <i className="fa-solid fa-circle-check"></i>
          <h3>{delivered}</h3>
          <p>Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

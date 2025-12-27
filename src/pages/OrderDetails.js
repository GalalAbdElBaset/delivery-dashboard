import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  const updateStatus = e => {
    axios.patch(`/orders/${id}`, { status: e.target.value })
      .then(res => setOrder(res.data));
  };

  if (!order) return null;

  return (
    <div className="page">
      <div className="card">
        <h2>{order.customerName}</h2>
        <p>Address: {order.address}</p>
        <p>Phone: {order.phone}</p>
        <p>Price: {order.price}</p>

        <select value={order.status} onChange={updateStatus}>
          <option>Pending</option>
          <option>On The Way</option>
          <option>Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default OrderDetails;

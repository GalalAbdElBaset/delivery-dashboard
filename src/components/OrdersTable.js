import { Link } from "react-router-dom";

const highlightText = (text, searchText) => {
  if (!searchText) return text;

  const parts = text.split(new RegExp(`(${searchText})`, "i"));

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
    <mark style={{ backgroundColor: " #0e57aaff", color: "#ffffffff",
      padding:"5px 8px", borderRadius:"10px 0px 0px 10px" }} key={index}>{part}</mark>

    ) : (
      part
    )
  );
};

const OrdersTable = ({ orders, onDelete, onEdit, search }) => {
  if (orders.length === 0) {
    return (
      <p className="not-found">
        <i className="fas fa-warning"></i>
        <span>No orders found</span>
      </p>
    );
  }

  return (
    <table cellPadding="10">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Status</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{highlightText(order.customerName, search)}</td>
            <td>
              <span className={`status ${
                order.status === "Delivered"
                  ? "delivered"
                  : order.status === "Pending"
                  ? "pending"
                  : order.status === "Canceled"
                  ? "canceled"
                  : order.status === "On The Way"
                  ? "on-the-way"
                  : ""
              }`}>
              <span className="status-icon"></span>
              {order.status}
              </span>
            </td>


            <td>{order.price} EGP</td>
            <td>
      
              <Link to={`/orders/${order.id}`}>
                <button>View</button>
              </Link>
              {" "}
              <button onClick={() => onEdit(order)}>Edit</button>

              {" "}
              <button onClick={() => onDelete(order.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;

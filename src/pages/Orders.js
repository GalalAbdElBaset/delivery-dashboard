import { useEffect, useState } from "react";
import axios from "axios";

import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";

const API_URL = "http://localhost:3001/orders";

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, "a")
    .replace(/ا/g, "a")
    .replace(/ى/g, "a")
    .replace(/ة/g, "h")
    .replace(/\s+/g, " ")
    .trim();
};

const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchMode, setSearchMode] = useState("first"); 

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get(API_URL);
    setOrders(response.data);
  };

  const addOrUpdateOrder = async (order) => {
    if (order.id) {
      await axios.put(`${API_URL}/${order.id}`, order);
    } else {
      await axios.post(API_URL, order);
    }

    setEditingOrder(null);
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchOrders();
  };

  const filteredOrders = orders.filter((order) => {
    const name = normalizeText(order.customerName);
    const searchText = normalizeText(debouncedSearch);

    let nameMatch = true;

    if (searchText) {
      if (searchMode === "first") {
        nameMatch = name.startsWith(searchText);
      } else {
        nameMatch = name.includes(searchText);
      }
    }

    const statusMatch =
      statusFilter === "All" || order.status === statusFilter;

    return nameMatch && statusMatch;
  });

  return (
    <>
    <div className="fillter-container">
        <input
          type="text"
          placeholder="Search customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ margin: "10px 0" }}>
          <button
            onClick={() => setSearchMode("first")}
            style={{ marginRight: 10, opacity: searchMode === "first" ? 1 : 0.5 }}
          >
            First Name
          </button>

          <button
            onClick={() => setSearchMode("full")}
            style={{ opacity: searchMode === "full" ? 1 : 0.5 }}
          >
            Full Name
          </button>
        </div>

        <select className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="On The Way">On The Way</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <OrderForm
        onSubmit={addOrUpdateOrder}
        editingOrder={editingOrder}
        cancelEdit={() => setEditingOrder(null)}
      />

      <OrdersTable 
        orders={filteredOrders}
        onDelete={deleteOrder}
        onEdit={setEditingOrder}
        search={debouncedSearch}
      />
    </>
  );
};

export default Orders;

import { useEffect, useState } from "react";

const initialFormState = {
  customerName: "",
  address: "",
  phone: "",
  price: "",
  status: "Pending"
};

const OrderForm = ({ onSubmit, editingOrder, cancelEdit }) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (editingOrder) {
      setForm(editingOrder);
    }
  }, [editingOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input
        name="customerName"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={handleChange}
        required
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <select name="status" value={form.status} onChange={handleChange} required>
        <option value="Pending">Pending</option>
        <option value="On The Way">On The Way</option>
        <option value="Delivered">Delivered</option>
      </select>

      <button type="submit" className="UpdateButton">
        {editingOrder ? "Update Order" : "Add Order"}
      </button>

      {editingOrder && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default OrderForm;

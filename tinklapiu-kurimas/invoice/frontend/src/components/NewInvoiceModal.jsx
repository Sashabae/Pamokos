import { useState } from "react";
import axios from "axios";

export default function NewInvoiceModal({ isOpen, onClose, refreshInvoices }) {
  const [data, setData] = useState({
    date: "",
    fullname: "",
    price: "",
    status: "",
  });


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3005/api/v1/invoices", data)
      .then((response) => {
        console.log(response.data);
        refreshInvoices();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-base-300 p-6 rounded-lg shadow-lg w-96 border-2 border-purple-500">
        <h2 className="text-xl font-bold mb-4">New Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            placeholder="Price (£)"
            className="input input-bordered w-full"
            required
          />
          <select
            name="status"
            value={data.status}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled selected>
              Select status
            </option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary">
              Add Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

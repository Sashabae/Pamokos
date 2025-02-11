import { useState, useEffect } from "react";
import axios from "axios";
import NewInvoiceModal from "./NewInvoiceModal";
import InvoiceModal from "./InvoiceModal";

export default function TableList() {
  const [invoices, setInvoices] = useState([]);
  const [isNewInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);
  const [isEditInvoiceModalOpen, setEditInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchInvoices = async (status = "") => {
    try {
      let url = `http://localhost:3005/api/v1/invoices`;

      if (status) {
        url += `?status=${encodeURIComponent(status)}`;
      }

      const response = await axios.get(url);
      setInvoices(response.data.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Formats as "15 February 2025"
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setEditInvoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 ml-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p>There are {invoices.length} total invoices</p>
          </div>

          {/* Dropdown for filters */}
          <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="btn m-1">
              Filter by status ⬇️
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a onClick={() => fetchInvoices("")}>All</a>
              </li>
              <li>
                <a onClick={() => fetchInvoices("Draft")}>Draft</a>
              </li>
              <li>
                <a onClick={() => fetchInvoices("Pending")}>Pending</a>
              </li>
              <li>
                <a onClick={() => fetchInvoices("Paid")}>Paid</a>
              </li>
            </ul>
          </div>
          {/* New invoice button */}
          <button
            className="btn btn-secondary rounded-4xl"
            onClick={() => setNewInvoiceModalOpen(true)}
          >
            + New Invoice
          </button>
        </div>

        {/* Table */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-wrap justify-between items-center p-4 rounded-lg bg-base-300"
            >
              <div className="font-bold text-lg"><span className="text-indigo-900">#</span>{invoice.id}</div>

              <div>Due {formatDate(invoice.date)}</div>

              <div>{invoice.fullname}</div>

              <div className="font-semibold text-lg">£{invoice.price}</div>

              {/* Status */}
              <span
                className={`flex items-center font-semibold ${
                  invoice.status === "Paid"
                    ? "badge badge-soft badge-success"
                    : invoice.status === "Pending"
                    ? "badge badge-soft badge-warning"
                    : "badge badge-soft text-white"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    invoice.status === "Paid"
                      ? "bg-green-500"
                      : invoice.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                ></span>
                {invoice.status}
              </span>

              {/* Invoice info with edit/delete options */}
              <button
                className="btn btn-soft btn-secondary text-sm rounded-full"
                onClick={() => handleEdit(invoice)}
              >
                ˃
              </button>
            </div>
          ))}
        </div>
      </div>

      <NewInvoiceModal
        isOpen={isNewInvoiceModalOpen}
        onClose={() => setNewInvoiceModalOpen(false)}
        refreshInvoices={fetchInvoices}
      />
      <InvoiceModal
        isOpen={isEditInvoiceModalOpen && selectedInvoice}
        onClose={() => setEditInvoiceModalOpen(false)}
        invoice={selectedInvoice}
        refreshInvoices={fetchInvoices}
      />
    </div>
  );
}

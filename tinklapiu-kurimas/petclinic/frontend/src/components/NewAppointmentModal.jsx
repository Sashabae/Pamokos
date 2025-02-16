import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const NewAppointmentModal = ({ refreshAppointments }) => {
  const [formData, setFormData] = useState({
    petname: "",
    ownername: "",
    notes: "",
    date: "",
    time: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/appointments`, formData, {
        withCredentials: true,
      });

      setFormData({
        petname: "",
        ownername: "",
        notes: "",
        date: "",
        time: "",
      });
      refreshAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-300">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="petname"
          placeholder="Pet Name"
          value={formData.petname}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          type="text"
          name="ownername"
          placeholder="Owner Name"
          value={formData.ownername}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="textarea textarea-bordered w-full mb-3"
        ></textarea>

        <button type="submit" className="btn bg-purple-900 text-white">
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default NewAppointmentModal;

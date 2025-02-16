import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const EditAppointmentModal = ({
  appointment,
  closeModal,
  refreshAppointments,
}) => {
  const [petname, setPetname] = useState(appointment.petname);
  const [ownername, setOwnername] = useState(appointment.ownername);
  const [notes, setNotes] = useState(appointment.notes);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);

  useEffect(() => {
    if (appointment.date) {
      setDate(new Date(appointment.date).toISOString().split("T")[0]);
    }
  }, [appointment.date]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${API_URL}/appointments/${appointment.id}`,
        {
          petname,
          ownername,
          notes,
          date,
          time,
        },
        { withCredentials: true }
      );
      refreshAppointments();
      closeModal();
    } catch (error) {
      console.error("Error editing appointment:", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg w-full p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Edit Appointment
        </h2>
        <form onSubmit={handleEditSubmit}>
          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-600">
              Pet Name
            </label>
            <input
              type="text"
              className="border-zinc-300 rounded w-full py-2 px-4 text-lg"
              value={petname}
              onChange={(e) => setPetname(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-600">
              Owner Name
            </label>
            <input
              type="text"
              className="border-zinc-300 rounded w-full py-2 px-4 text-lg"
              value={ownername}
              onChange={(e) => setOwnername(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              className="border-zinc-300 rounded w-full py-2 px-4 text-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-600">
              Time
            </label>
            <input
              type="time"
              className="border-zinc-300 rounded w-full py-2 px-4 text-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-600">
              Notes
            </label>
            <textarea
              className="border-zinc-300 rounded w-full py-2 px-4 text-lg"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          <div className="modal-action justify-between mt-6">
            <button
              type="button"
              className="btn btn-primary py-2 px-4 rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-purple-900 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;

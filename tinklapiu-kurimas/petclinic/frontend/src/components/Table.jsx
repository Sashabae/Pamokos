import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { logout } from "../utils/logout";
import NewAppointmentModal from "./NewAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

const API_URL = import.meta.env.VITE_API_URL;

const Table = () => {
  const { user, loading, setUser } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("petname");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/appointments?search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data.data.appointments;
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, loading, searchTerm, sortBy, sortOrder]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment);
    setIsEditModalOpen(true);
  };

  if (!user) {
    return <div>You need to log in to view appointments.</div>;
  }

  return (
    <div className="p-6">
      {/* Add Appointment Button */}
      <div className="flex justify-center">
        <button
          className="btn bg-purple-900 text-white max-w-150 w-full ml-50 mr-50"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          + Add Appointment
        </button>
      </div>

      {/* Search Input */}
      <div className="mt-4 flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search appointments"
          className="border-zinc-300 focus:ring-purple-500 rounded py-1 px-4 text-lg max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <div className="flex items-center">
          <select
            className="border-zinc-300 rounded py-1 px-4 text-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="petname">Pet Name</option>
            <option value="date">Date</option>
            <option value="ownername">Owner</option>
          </select>
          <select
            className="border-zinc-300 rounded py-1 px-4 text-lg ml-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* Dropdown Modal */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isModalOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <NewAppointmentModal refreshAppointments={fetchAppointments} />
      </div>

      {/* Edit Appointment Modal */}
      {isEditModalOpen && (
        <EditAppointmentModal
          appointment={appointmentToEdit}
          closeModal={() => setIsEditModalOpen(false)}
          refreshAppointments={fetchAppointments}
        />
      )}

      {/* Appointment Table */}
      <div className="m-10 max-h-[500px] overflow-y-auto">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const formattedDate = new Date(appointment.date).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            );

            const formattedTime = new Date(
              `1970-01-01T${appointment.time}`
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={appointment.id}
                className="flex border-b border-gray-400 p-3 gap-5"
              >
                {/* Delete Button */}
                <div className="w-10 text-center">
                  <button
                    className="btn btn-outline w-0.5 h-8 rounded"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    X
                  </button>
                </div>

                {/* Pet Name, Owner Name, Notes */}
                <div className="flex-1">
                  <div className="font-bold text-purple-800 text-2xl">
                    {appointment.petname}
                  </div>

                  <div className="font-bold text-gray-500 text-lg">
                    Owner:{" "}
                    <span className="text-black font-normal">
                      {appointment.ownername}
                    </span>
                  </div>

                  <div className="text-black">{appointment.notes}</div>
                </div>

                {/* Date and Time + Edit Button */}
                <div className="w-40 text-center flex flex-col items-end">
                  <i className="text-black text-lg">
                    {formattedDate} &nbsp;
                    {formattedTime}
                  </i>

                  <button
                    className="btn btn-outline w-0.5 h-8 rounded mt-2"
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-4xl text-center">No appointments found</div>
        )}
      </div>

      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="btn btn-error text-white px-4 py-2 rounded mb-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Table;

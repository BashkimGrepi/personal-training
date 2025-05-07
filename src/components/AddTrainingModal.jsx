import { useEffect, useState } from "react";
import { createTraining } from "../services/TrainingsService";
import { API_URL } from "../services/BaseUrlService"
import { getCustomers } from "../services/CustomersService";

function AddTrainingModal({ isOpen, setIsOpen, OnTrainingAdded }) {
  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    duration: "",
    customeriD: "",
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getCustomers().then(setCustomers);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainingData = {
      date: formData.date,
      activity: formData.activity,
      duration: parseInt(formData.duration),
      customer: `${API_URL}/customers/${formData.customerId}`
    };

    try {
      await createTraining(trainingData);
      alert("Training added!");
      setIsOpen(false);
      OnTrainingAdded();
    } catch (error) {
      alert("Failed to add training");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Training</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="activity"
            placeholder="Activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstname} {c.lastname}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTrainingModal;

import { useState } from "react";
import AddTrainingModal from "../components/AddTrainingModal";
import TrainingsGrid from "../components/TrainingsGrid";
import { getTrainings } from "../services/TrainingsService";

function Trainings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trainings</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Training
      </button>

      <AddTrainingModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        OnTrainingAdded={getTrainings}
      />

      <TrainingsGrid trainings={ Trainings } />
    </div>
  );
}

export default Trainings;

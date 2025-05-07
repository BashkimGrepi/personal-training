import { useState } from "react";
import AddTrainingModal from "../components/AddTrainingModal";
import TrainingsGrid from "../components/TrainingsGrid";
import { getTrainings } from "../services/TrainingsService";
import { PlusIcon } from "lucide-react";

function Trainings() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trainings</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        <PlusIcon className="w-4 h-4 inline mr-1" />
        Add Training
      </button>

      <AddTrainingModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        OnTrainingAdded={getTrainings}
      />

      <TrainingsGrid  />
    </div>
  );
}

export default Trainings;

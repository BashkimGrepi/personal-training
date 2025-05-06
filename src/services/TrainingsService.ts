import axios from "axios";
import { API_URL } from "./BaseUrlService";
import { format ,parseISO } from "date-fns";

//the base url is imported from the BaseUrlService file.



export const getTrainings = async () => {
    try {
        const response = await axios.get(`${API_URL}/gettrainings`)
        const trainings = response.data;
        console.log("training object: ", trainings)


        const trainingsWithCustomers = trainings.map((training: any) => ({
            ...training,
            customer: `${training.customer.firstname} ${training.customer.lastname}`,
            date: format(parseISO(training.date), 'yyyy.MM-dd')
        }));
        console.log("customer object: ", trainingsWithCustomers)
        return trainingsWithCustomers;
    } catch (error) {
        console.error("Error fetching trainings: ", error);
        return []
    }
}

//create new training
export const createTraining = async (trainingData) => {
    try {
        const response = await axios.post(`${API_URL}/trainings`, trainingData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating a training: ", error)
        throw error;
    }
}

//delete training by id
export const deleteTraining = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/trainings/${id}`);
    } catch (error) {
        console.error(`Error deleting training with ID ${id}:`, error);
        throw error;
    }
};


import axios from "axios";
import { API_URL } from "./BaseUrlService";
import { href } from "react-router-dom";

//the base url is imported from the BaseUrlService file.



export const getTrainings = async () => {
    try {
        const response = await axios.get(`${API_URL}/gettrainings`)
        const trainings = response.data;


        const trainingsWithCustomers = trainings.map((training: any) => ({
            ...training, customer: `${training.customer.firstname} ${training.customer.lastname}`,

        }));
        return trainingsWithCustomers;
    } catch (error) {
        console.error("Error fetching trainings: ", error);
        return []
    }
}


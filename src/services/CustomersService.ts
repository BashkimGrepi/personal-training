import axios from "axios";
import { API_URL } from "./BaseUrlService";

//the base url is importet from the BaseUrlService file. 

export const getCustomers = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers`);
        const customers = response.data._embedded.customers;
        return customers;
    }
    catch (error) {
        console.error("Error fetching customers:", error);
    }
}


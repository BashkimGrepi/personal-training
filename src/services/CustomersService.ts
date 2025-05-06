import axios from "axios";
import { API_URL } from "./BaseUrlService";


//the base url is importet from the BaseUrlService file.

//get all customers
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

// getCustomer by his id
export const getCustomersById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/customers/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with ID ${id}:`, error);
        throw error;
    }
}

export const createCustomer = async (customerData) => {
    try {
        const response = await axios.post(`${API_URL}/customers`, customerData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error creating a customer: ", error)
        throw error;
    }
}


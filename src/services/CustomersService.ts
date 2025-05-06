import axios from "axios";
import { API_URL } from "./BaseUrlService";


//the base url is importet from the BaseUrlService file.

//get all customers
export const getCustomers = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers`);
        const rawCustomers = response.data._embedded.customers;

        const customers = rawCustomers.map((customer) => {
            const href = customer._links.self.href;
            const id = href.split("/").pop() //this extracts the id from url
            return { ...customer, id }
        });


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

// create a new customer
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

//update the existing customer
export const updateCustomer = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/customers/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating customer ${id}:`, error)
        throw error;
    }
}

//delete customer
export const deleteCustomer = async (id) => {
     try {
        await axios.delete(`${API_URL}/customers/${id}`);
    } catch (error) {
        console.error(`Error deleting customer ${id}:`, error);
        throw error;
  }
};


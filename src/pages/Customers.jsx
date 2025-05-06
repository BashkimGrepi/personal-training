import CustomersGrid from "../components/CustomersGrid";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import { useState } from "react";

const Customers = () => {

    

    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <AddCustomerModal /> 
            <CustomersGrid />
        </div>
    );
}

export default Customers;
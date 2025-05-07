import CustomersGrid from "../components/CustomersGrid";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import ExportCSV from "../components/ExportCSV";
import { useEffect, useState } from "react";
import { getCustomers } from "../services/CustomersService";

const Customers = () => {

    const [customers, setCustomers] = useState([]);

   useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);
    
    return (
        <div className="p-4">
            
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <div className="flex justify-between gap-2 mb-4"> 
                    <AddCustomerModal />
                    <ExportCSV data={customers} />    
                </div>
                <CustomersGrid customers={customers} setCustomers={setCustomers} />
                
            
        </div>
    );
}

export default Customers;
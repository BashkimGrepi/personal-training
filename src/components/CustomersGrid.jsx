import { useEffect, useMemo, useState } from "react";
import { getCustomers } from "../services/CustomersService";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import EditCustomerModal from "./EditCustomerModal";
import { deleteCustomer } from "../services/CustomersService";



ModuleRegistry.registerModules([ClientSideRowModelModule]);

// this component uses newest ag grid version and it is rendered in the customers page
// the data is fetched from the customersService and displayed in a grid format
//in addition this page has the functionality for deleting the customer


const CustomersGrid = ({customers, setCustomers}) => {
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quickFilterText, setQuickFilterText] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    


    const ActionsRenderer = (props) => {
    const { data } = props;
        return (
        <div className="flex gap-4 items-center justify-center">
        <button
            className="text-blue-600 underline hover:text-blue-800"
            onClick={() => handleEditClick(data)}
        >
            Edit
        </button>
                
         <button
            className="text-red-600 underline hover:text-red-800"
            onClick={() => handleDeleteClick(data)}
            >
            Delete
        </button>
    </div>
    );
};

     const columnDefs = [
        { headerName: "First Name", field: "firstname"},
        { headerName: "Last Name", field: "lastname"},
        { headerName: "Street Address", field: "streetaddress"},
        { headerName: "Postcode", field: "postcode"},
        { headerName: "City", field: "city"},
        { headerName: "Email", field: "email" },
         { headerName: "Phone", field: "phone" },
         {
            headerName: "Actions",
            field: "actions",
            cellRenderer: ActionsRenderer, 
            width: 120,
            sortable: false,
            filter: false,
        }
        
    ];



    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
    }), []);

    useEffect(() => {

        // Fetch customers data from the API 
        // using the getCustomers function from the customersService
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const customersData = await getCustomers();
                setCustomers(customersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customers:", error);
                setError("Failed to load customers.");
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    // Check if the data is still loading or...
    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    // ...if there was an error
    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }


    const handleEditClick = (customer) => {
        console.log("Selected customer:", customer);
        setSelectedCustomer(customer);
        setEditModalOpen(true);
    };

    const handleDeleteClick = async (customer) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`);
        if (!confirmDelete) return;

        try {
            await deleteCustomer(customer.id);
            alert("Customer deleted.");
            const updated = await getCustomers();
            setCustomers(updated);
        } catch (error) {
            alert("Failed to delete customer");
            console.error("Delete error:", error);
        }
    }
    return (
         <div className="p-4">
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
               <input
                type="text"
                placeholder="Search Customers..."
                className="mb-4 p-2 border rounded "
                value={quickFilterText}
                onChange={(e) => setQuickFilterText(e.target.value)}
            />
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={customers}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableSorting={true}
                    
                    
                />
                <EditCustomerModal
                    isOpen={editModalOpen}
                    setIsOpen={setEditModalOpen}
                    customer={selectedCustomer}
                    onUpdated={() => {
                        getCustomers().then(setCustomers);
                    }}
                />
                
            </div>
            
        </div>
    )
}

export default CustomersGrid;

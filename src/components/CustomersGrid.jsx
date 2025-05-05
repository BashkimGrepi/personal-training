import { useEffect, useMemo, useState } from "react";
import { getCustomers } from "../services/customersService";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// this component uses newest ag grid version and it is used in the customers page
// the data is fetched from the customersService and displayed in a grid format


const CustomersGrid = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quickFilterText, setQuickFilterText] = useState("");


     const columnDefs = [
        { headerName: "First Name", field: "firstname"},
        { headerName: "Last Name", field: "lastname"},
        { headerName: "Street Address", field: "streetaddress"},
        { headerName: "Postcode", field: "postcode"},
        { headerName: "City", field: "city"},
        { headerName: "Email", field: "email" },
        { headerName: "Phone", field: "phone" },
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

    return (
         <div className="p-4">
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
               <input
                type="text"
                placeholder="Search Trainings..."
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
            </div>
        </div>
    )
}

export default CustomersGrid;

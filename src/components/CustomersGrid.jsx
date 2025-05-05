import { useEffect, useMemo, useState } from "react";
import { getCustomers } from "../services/customersService";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const CustomersGrid = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


     const columnDefs = [
        { headerName: "First Name", field: "firstname", sortable: true, filter: true, width: 150 },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true, width: 150 },
        { headerName: "Street Address", field: "streetaddress", sortable: true, filter: true, width: 200 },
        { headerName: "Postcode", field: "postcode", sortable: true, filter: true, width: 120 },
        { headerName: "City", field: "city", sortable: true, filter: true, width: 150 },
        { headerName: "Email", field: "email", sortable: true, filter: true, width: 200 },
        { headerName: "Phone", field: "phone", sortable: true, filter: true, width: 150 },
    ];

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        rezizable: true,
        flex: 1,
        minWidth: 100,
    }), []);

    useEffect(() => {

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

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
         <div className="p-4">
            
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={customers}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableSorting={true}
                    enableFilter={true}
                />
            </div>
        </div>
    )
}

export default CustomersGrid;
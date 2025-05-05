import { getTrainings } from "../services/TrainingsService";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);


// this component is for using the getTrainings method which fetches data from the api
// This component is used in trainings page

const TrainingsGrid = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quickFilterText, setQuickFilterText] = useState("");

    const columnDefs = [
        { headerName:  "Customer", field: "customer", filter: true},
        { headerName:  "Duration (min)", field: "duration", filter: true},
        { headerName:  "Activity", field: "activity", filter: true},
        { headerName:  "Date", field: "date", filter: true},
    ]

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 100,
    }), [])

    useEffect(() => {

        const fetchTrainingsAndCustomers = async () => {
            try {
                setLoading(true);
                const trainingData = await getTrainings();
                setTrainings(trainingData);          
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customers: ", error);
                setError("Failed to load customers.")
                setLoading(false);
            }
        }
        fetchTrainingsAndCustomers();
    }, []);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>
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
                    rowData={trainings}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableSorting={true}
                    quickFilterText={quickFilterText}
                />
            </div>
        </div>
    )
    
}

export default TrainingsGrid
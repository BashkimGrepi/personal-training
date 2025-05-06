import { CSVLink } from "react-csv"

function ExportCSV({data}) {
    
    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Street Address", key: "streetaddress" },
        { label: "Postcode", key: "postcode" },
        { label: "City", key: "city" }
    ];


    return (
        <CSVLink
            data={data}
            headers={headers}
            filename="customers_export.csv"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
            Export CSV

        </CSVLink>
    )
}

export default ExportCSV;
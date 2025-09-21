// "use client";
// import React, { useState, useMemo, useEffect } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { Search, Plus, Menu, User } from 'lucide-react';
// import 'ag-grid-community/styles/ag-grid.css'; // base styles
// import 'ag-grid-community/styles/ag-theme-quartz.css'; // quartz theme
// import { useRouter } from 'next/navigation';
// const SimpleDashboard = () => {


//   const [searchTerm, setSearchTerm] = useState('');
 
 
//   const [rowData, setRowData] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const columnDefs = [
//     { headerName: "Reference", field: "moNumber", sortable: true, filter: true },
//     { headerName: "Start Date", field: "scheduleStart", sortable: true, filter: true },
//     { headerName: "Finished Product", field: "finishedProduct", sortable: true, filter: true },
//     { headerName: "Component Status", field: "componentStatus", sortable: true, filter: true },
//     { headerName: "Quantity", field: "quantity", sortable: true, filter: true },
//     { headerName: "Status", field: "status", sortable: true, filter: true },
//   ];

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await fetch("/api/manufacturing-orders");
//         const result = await res.json();
//         if (!res.ok) throw new Error(result.message || "Failed to fetch orders");

//         const mappedData = result.data.map(order => ({
//           moNumber: order.moNumber,
//           scheduleStart: order.scheduleStart ? new Date(order.scheduleStart).toLocaleDateString() : "Not Scheduled",
//           finishedProduct: order.product?.name || "Unknown",
//           componentStatus: order.componentStatus,
//           quantity: order.quantity + " Units",
//           status: order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("_", "-")
//         }));

//         setRowData(mappedData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//    const filters = ['All', 'Confirmed', 'In-Progress', 'To Close', 'Late', 'Not Assigned'];


//   const filteredData = useMemo(() => {
//     let filtered = rowData;
    
//     if (activeFilter !== 'All') {
//       filtered = filtered.filter(row => row.status === activeFilter);
//     }
    
//     if (searchTerm) {
//       filtered = filtered.filter(row => 
//         row.moNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.finishedProduct.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     return filtered;
//   }, [rowData, activeFilter, searchTerm]);

//   const handleNewOrder = async () => {
//     try {
//       const res = await fetch("/api/manufacturing-orders/new", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" }
//       });

//       if (!res.ok) throw new Error("Failed to create new order");

//       const data = await res.json();
//       router.push(`/dashboard/manufacturing-orders/?ref=${data.reference}`);
//     } catch (err) {
//       console.error("Error creating new order:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
    

//       <div className="p-6">
//         {/* Top Controls */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <button onClick={handleNewOrder} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
//             <Plus className="w-4 h-4" />
//             New Manufacturing Order
//           </button>
          
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search orders..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 activeFilter === filter
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
//             <AgGridReact
//               rowData={filteredData}
//               columnDefs={columnDefs}
//               theme={"quartz"}
//               defaultColDef={{
//                 sortable: true,
//                 resizable: true,
//                 filter: true
//               }}
//               rowSelection="multiple"
//               animateRows={true}
//               pagination={true}
//               paginationPageSize={10}
//               suppressRowClickSelection={true}
//               headerHeight={50}
//               rowHeight={50}
//             />
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .ag-theme-alpine {
//           --ag-header-background-color: #f8fafc;
//           --ag-odd-row-background-color: #f9fafb;
//         }
        
//         .ag-header-cell-label {
//           font-weight: 600;
//           color: #374151;
//         }
        
//         .ag-cell {
//           display: flex;
//           align-items: center;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SimpleDashboard;
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Search, Plus } from "lucide-react";
import "ag-grid-community/styles/ag-grid.css"; // base styles
import "ag-grid-community/styles/ag-theme-quartz.css"; // quartz theme
import { useRouter } from "next/navigation";

const SimpleDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowData, setRowData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const columnDefs = [
    { headerName: "Reference", field: "moNumber", sortable: true, filter: true },
    { headerName: "Start Date", field: "scheduleStart", sortable: true, filter: true },
    { headerName: "Finished Product", field: "finishedProduct", sortable: true, filter: true },
    { headerName: "Component Status", field: "componentStatus", sortable: true, filter: true },
    { headerName: "Quantity", field: "quantity", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/manufacturing-orders");
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Failed to fetch orders");

        const mappedData = result.data.map((order) => ({
          moNumber: order.moNumber,
          scheduleStart: order.scheduleStart
            ? new Date(order.scheduleStart).toLocaleDateString()
            : "Not Scheduled",
          finishedProduct: order.product?.name || "Unknown",
          componentStatus: order.componentStatus,
          quantity: order.quantity + " Units",
          status:
            order.status.charAt(0).toUpperCase() +
            order.status.slice(1).replace("_", "-"),
        }));

        setRowData(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filters = [
    "All",
    "Confirmed",
    "In-Progress",
    "To Close",
    "Late",
    "Not Assigned",
  ];

  const filteredData = useMemo(() => {
    let filtered = rowData;

    if (activeFilter !== "All") {
      filtered = filtered.filter((row) => row.status === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (row) =>
          row.moNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.finishedProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [rowData, activeFilter, searchTerm]);

  const handleNewOrder = async () => {
    try {
      const res = await fetch("/api/manufacturing-orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to create new order");

      const data = await res.json();
      router.push(`/dashboard/manufacturing-orders/?ref=${data.reference}`);
    } catch (err) {
      console.error("Error creating new order:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <button
            onClick={handleNewOrder}
            className="bg-amber-300 text-white px-4 cursor-pointer py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Manufacturing Order
          </button>

          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by reference or product..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-all shadow-sm ${
                activeFilter === filter
                  ? "bg-amber-200 text-gray-800"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
            <div
              className="ag-theme-quartz"
              style={{ height: 600, width: "100%" }}
            >
              <AgGridReact
                rowData={filteredData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  filter: true,
                  flex: 1,
                }}
                rowSelection="multiple"
                animateRows={true}
                pagination={true}
                paginationPageSize={10}
                suppressRowClickSelection={true}
                headerHeight={50}
                rowHeight={50}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .ag-theme-quartz {
          --ag-header-background-color: #f8fafc;
          --ag-odd-row-background-color: #f9fafb;
          --ag-font-size: 14px;
        }

        .ag-header-cell-label {
          font-weight: 600;
          color: #374151;
        }

        .ag-cell {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default SimpleDashboard;

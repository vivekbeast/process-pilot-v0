"use client";
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Search, Plus, Menu, User } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css'; // base styles
import 'ag-grid-community/styles/ag-theme-quartz.css'; // quartz theme
import { useRouter } from 'next/navigation';
const SimpleDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();
  // Sample manufacturing orders data
  const rowData = [
    {
      reference: 'MO-000001',
      startDate: 'Tomorrow',
      finishedProduct: 'Dining Table',
      componentStatus: 'Not Available',
      quantity: '5.00 Units',
      state: 'Confirmed'
    },
    {
      reference: 'MO-000002',
      startDate: 'Yesterday',
      finishedProduct: 'Drawer',
      componentStatus: 'Available',
      quantity: '2.00 Units',
      state: 'In-Progress'
    },
    {
      reference: 'MO-000003',
      startDate: '2024-01-15',
      finishedProduct: 'Office Chair',
      componentStatus: 'Available',
      quantity: '10.00 Units',
      state: 'To Close'
    },
    {
      reference: 'MO-000004',
      startDate: '2024-01-10',
      finishedProduct: 'Kitchen Cabinet',
      componentStatus: 'Partially Available',
      quantity: '3.00 Units',
      state: 'Late'
    },
    {
      reference: 'MO-000005',
      startDate: '2024-01-20',
      finishedProduct: 'Bookshelf',
      componentStatus: 'Available',
      quantity: '7.00 Units',
      state: 'Not Assigned'
    }
  ];


    const handleNewOrder = async () => {
    try {
      const res = await fetch("/api/manufacturing-orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("Failed to create new order");

      const data = await res.json(); // e.g., { reference: "MO-000006" }

      // Navigate to create page with the new reference ID
      router.push(`/dashboard/manufacturing-orders/?ref=${data.reference}`);
    } catch (err) {
      console.error("Error creating new order:", err);
    }
  };

  // Status badge component
  const StatusBadge = ({ value }) => {
    const colors = {
      'Confirmed': 'bg-blue-100 text-blue-800',
      'In-Progress': 'bg-yellow-100 text-yellow-800',
      'To Close': 'bg-green-100 text-green-800',
      'Late': 'bg-red-100 text-red-800',
      'Not Assigned': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
        {value}
      </span>
    );
  };

  const ComponentStatusBadge = ({ value }) => {
    const colors = {
      'Available': 'bg-green-100 text-green-800',
      'Not Available': 'bg-red-100 text-red-800',
      'Partially Available': 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value] || 'bg-gray-100 text-gray-800'}`}>
        {value}
      </span>
    );
  };

  // AG Grid column definitions
  const columnDefs = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50
    },
    {
      headerName: 'Reference',
      field: 'reference',
      width: 120,
      cellClass: 'font-medium text-blue-600'
    },
    {
      headerName: 'Start Date',
      field: 'startDate',
      width: 120
    },
    {
      headerName: 'Finished Product',
      field: 'finishedProduct',
      width: 160,
      flex: 1
    },
    {
      headerName: 'Component Status',
      field: 'componentStatus',
      width: 160,
      cellRenderer: ComponentStatusBadge
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      width: 100
    },
    {
      headerName: 'State',
      field: 'state',
      width: 120,
      cellRenderer: StatusBadge
    }
  ];

  // Filter tabs
  const filters = ['All', 'Confirmed', 'In-Progress', 'To Close', 'Late', 'Not Assigned'];

  // Filter data based on active filter and search
  const filteredData = useMemo(() => {
    let filtered = rowData;
    
    if (activeFilter !== 'All') {
      filtered = filtered.filter(row => row.state === activeFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(row => 
        row.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.finishedProduct.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
            <h1 className="text-xl font-bold text-gray-900">ProcessPilot</h1>
          </div>
          <User className="w-6 h-6 text-gray-600 cursor-pointer" />
        </div>
      </header> */}

      <div className="p-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button onClick={handleNewOrder} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Manufacturing Order
          </button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
              rowData={filteredData}
              columnDefs={columnDefs}
              theme={"quartz"}
              defaultColDef={{
                sortable: true,
                resizable: true,
                filter: true
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
        </div>
      </div>

      <style jsx global>{`
        .ag-theme-alpine {
          --ag-header-background-color: #f8fafc;
          --ag-odd-row-background-color: #f9fafb;
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
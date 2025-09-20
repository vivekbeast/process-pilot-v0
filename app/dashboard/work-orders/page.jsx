"use client"
import React, { useState, useMemo } from 'react';
import { Search, Menu, Grid, List } from 'lucide-react';

const WorkOrdersInterface = () => {
  const [selectedMenu, setSelectedMenu] = useState('Work Orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');

  // Sample work orders data
  const [workOrders] = useState([
    {
      id: 1,
      operation: 'Assembly-1',
      workCenter: 'Work Center -1',
      finishedProduct: 'Product A',
      expectedDuration: '60:00',
      realDuration: '00:00',
      status: 'To Do',
      progress: 0
    },
    {
      id: 2,
      operation: 'Welding-2',
      workCenter: 'Work Center -2',
      finishedProduct: 'Product B',
      expectedDuration: '45:00',
      realDuration: '20:30',
      status: 'In Progress',
      progress: 45
    },
    {
      id: 3,
      operation: 'Painting-1',
      workCenter: 'Work Center -3',
      finishedProduct: 'Product C',
      expectedDuration: '90:00',
      realDuration: '90:00',
      status: 'Completed',
      progress: 100
    },
    {
      id: 4,
      operation: 'Testing-1',
      workCenter: 'Work Center -1',
      finishedProduct: 'Product D',
      expectedDuration: '30:00',
      realDuration: '00:00',
      status: 'To Do',
      progress: 0
    },
    {
      id: 5,
      operation: 'Machining-3',
      workCenter: 'Work Center -2',
      finishedProduct: 'Product E',
      expectedDuration: '120:00',
      realDuration: '75:00',
      status: 'In Progress',
      progress: 62
    }
  ]);

  const menuItems = [
    'Manufacturing Orders',
    'Work Orders',
    'Bills of Materials',
    'Work Center',
    'Stock Ledger'
  ];

  // Filter work orders based on search term
  const filteredWorkOrders = useMemo(() => {
    if (!searchTerm) return workOrders;
    
    return workOrders.filter(order =>
      order.operation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.workCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.finishedProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [workOrders, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'To Do':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-500 text-gray-800">


      <div className="flex">
     

        {/* Main Content */}
        <div className="flex-1 p-6">
    

          {/* Work Orders Panel */}
          <div className="bg-gray-800 border  rounded-lg">
            {/* Panel Header */}
            <div className="border-b  p-4">
              <div className="flex items-center justify-between">
            
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search work orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-300"
                    />
                  </div>
                  {/* <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-600' : 'bg-gray-700'}`}
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-600' : 'bg-gray-700'}`}
                  >
                    <Grid size={18} />
                  </button> */}
                </div>
              </div>
              
            </div>

            {/* Table Header */}
            <div className="bg-gray-750 border-b border-gray-600">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-300">
                <div className="col-span-2">Operation</div>
                <div className="col-span-2">Work Center</div>
                <div className="col-span-2">Finished Product</div>
                <div className="col-span-2">Expected Duration</div>
                <div className="col-span-2">Real Duration</div>
                <div className="col-span-2">Status</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="max-h-96 overflow-y-auto">
              {filteredWorkOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <div className="col-span-2 text-gray-300">{order.operation}</div>
                  <div className="col-span-2 text-gray-300">{order.workCenter}</div>
                  <div className="col-span-2 text-gray-300">{order.finishedProduct}</div>
                  <div className="col-span-2 text-gray-300">{order.expectedDuration}</div>
                  <div className="col-span-2 text-gray-300">{order.realDuration}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                    <span className="text-gray-300">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
           
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{workOrders.length}</div>
              <div className="text-sm text-gray-400">Total Orders</div>
            </div>
            
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">
                {workOrders.filter(o => o.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {workOrders.filter(o => o.status === 'In Progress').length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">
                {workOrders.filter(o => o.status === 'To Do').length}
              </div>
              <div className="text-sm text-gray-400">To Do</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrdersInterface;
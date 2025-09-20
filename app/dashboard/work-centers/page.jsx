"use client";
import React, { useState, useEffect } from 'react';

const WorkCenterManagement = () => {
  const [workCenters] = useState([
    { id: 1, name: 'Work Center -1', cost: 50 },
    { id: 2, name: 'Assembly Station A', cost: 75 },
    { id: 3, name: 'Quality Control', cost: 60 },
    { id: 4, name: 'Packaging Unit', cost: 40 },
    { id: 5, name: 'Testing Lab', cost: 95 }
  ]);

  const [filteredWorkCenters, setFilteredWorkCenters] = useState(workCenters);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('work-center');
  const [currentView, setCurrentView] = useState('list');
  const [notification, setNotification] = useState({ show: false, message: '' });

  const menuItems = [
    { id: 'manufacturing-orders', label: 'Manufacturing Orders' },
    { id: 'work-orders', label: 'Work Orders' },
    { id: 'bills-materials', label: 'Bills of Materials' },
    { id: 'work-center', label: 'Work Center' },
    { id: 'stock-ledger', label: 'Stock Ledger' }
  ];

  useEffect(() => {
    const filtered = workCenters.filter(wc =>
      wc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkCenters(filtered);
  }, [searchTerm, workCenters]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const handleMenuClick = (menuId) => {
    setActiveMenuItem(menuId);
    showNotification(`Navigating to ${menuId.replace('-', ' ')}`);
  };

  const handleViewToggle = (viewType) => {
    setCurrentView(viewType);
    showNotification(`Switched to ${viewType} view`);
  };

  const handleWorkCenterSelect = (workCenter) => {
    showNotification(`Selected: ${workCenter.name}`);
  };

  const handleNewWorkCenter = () => {
    showNotification('Opening new Work Center form...');
  };

  const handleExport = () => {
    showNotification('Exporting work center data...');
  };

  const handlePrint = () => {
    showNotification('Preparing print view...');
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-500 text-gray-800 flex">


      {/* Main Content */}
      <div className="flex-1  rounded-lg m-5 mr-5 ml-0 flex flex-col">
        {/* Header */}
      

        {/* Work Center Table */}
        <div className="flex-1 m-5">
          <div className="grid grid-cols-[1fr_150px] bg-gray-800 text-white p-4 rounded-md font-bold mb-3">
            <div>Work Center</div>
            <div className="text-right">Cost per hour</div>
          </div>
          
          {filteredWorkCenters.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-red-400/60 text-lg">
              No work centers found
            </div>
          ) : (
            <div className="space-y-2">
              {filteredWorkCenters.map((workCenter) => (
                <div
                  key={workCenter.id}
                  onClick={() => handleWorkCenterSelect(workCenter)}
                  className="grid grid-cols-[1fr_150px] p-4 border border-gray-400 text-white  rounded bg-gray-400/5 hover:bg-gray-400/15 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-fadeIn"
                >
                  <div>{workCenter.name}</div>
                  <div className="text-right font-bold text-white">{workCenter.cost}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-5 right-5 bg-gray-800 text-white px-5 py-3 rounded-md z-50 transform transition-transform duration-300 animate-slideIn">
          {notification.message}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default WorkCenterManagement;
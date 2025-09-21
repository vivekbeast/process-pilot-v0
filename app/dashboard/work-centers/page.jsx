"use client";
import { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Edit, Trash2, X, Search } from 'lucide-react';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 w-full max-w-lg p-6 relative animate-fade-in-down">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Work Center Form Component ---
const WorkCenterForm = ({ onClose, onSave, workCenter }) => {
  const [name, setName] = useState(workCenter?.name || '');
  const [code, setCode] = useState(workCenter?.code || '');
  const [costPerHour, setCostPerHour] = useState(workCenter?.costPerHour || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const url = workCenter?._id ? `/api/work-centers?id=${workCenter._id}` : '/api/work-centers';
    const method = workCenter?._id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code, costPerHour }),
      });
      const result = await res.json();

      if (result.success) {
        onSave(result.data, !workCenter?._id);
        onClose();
      } else {
        setError(result.message || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded-lg text-sm">{error}</div>}
      <div>
        <label className="text-gray-400 block mb-2">Work Center Name *</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#333] p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          required 
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 block mb-2">Code *</label>
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full bg-[#333] p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            required 
          />
        </div>
        <div>
          <label className="text-gray-400 block mb-2">Cost Per Hour *</label>
          <input 
            type="number"
            value={costPerHour}
            onChange={(e) => setCostPerHour(Number(e.target.value))}
            className="w-full bg-[#333] p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="bg-amber-300 hover:bg-amber-400 cursor-pointer disabled:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg">
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

// --- Main Work Centers Page Component ---
const WorkCentersPage = () => {
  const [workCenters, setWorkCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkCenter, setEditingWorkCenter] = useState(null);
  const [deletingWorkCenter, setDeletingWorkCenter] = useState(null);

  const fetchWorkCenters = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/work-centers');
      const data = await res.json();
      if (data.success) {
        setWorkCenters(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkCenters();
  }, []);
  
  const filteredWorkCenters = useMemo(() => {
    return workCenters.filter(wc =>
      wc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wc.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [workCenters, searchTerm]);

  const handleOpenModal = (workCenter = null) => {
    setEditingWorkCenter(workCenter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingWorkCenter(null);
    setIsModalOpen(false);
  };
  
  const handleSave = (savedWorkCenter, isNew) => {
    if (isNew) {
      setWorkCenters(prev => [...prev, savedWorkCenter].sort((a,b) => a.name.localeCompare(b.name)));
    } else {
      setWorkCenters(prev => prev.map(wc => wc._id === savedWorkCenter._id ? savedWorkCenter : wc).sort((a,b) => a.name.localeCompare(b.name)));
    }
  };
  
  const handleDelete = async () => {
    if (!deletingWorkCenter) return;
    
    try {
      const res = await fetch(`/api/work-centers?id=${deletingWorkCenter._id}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      if(result.success){
        setWorkCenters(prev => prev.filter(wc => wc._id !== deletingWorkCenter._id));
        setDeletingWorkCenter(null);
      } else {
         setError(result.message);
      }
    } catch(err){
      setError("Failed to delete work center.");
    }
  };

  return (
    <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Work Center</h1>
           <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-amber-300 hover:bg-amber-400 cursor-pointer text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
            >
              <PlusCircle size={20} />
              New
            </button>
          </div>
        </div>
        {error && <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded-lg text-sm mb-4">{error}</div>}

        {/* --- Main Content: Table --- */}
        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-gray-400">Loading work centers...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#333] text-gray-400 uppercase text-sm">
                <tr>
                  <th className="p-4">Work Center</th>
                  <th className="p-4 text-right">Cost per hour</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredWorkCenters.map((wc) => (
                  <tr key={wc._id} className="hover:bg-[#333]">
                    <td className="p-4 font-semibold text-white">{wc.name}</td>
                    <td className="p-4 text-right text-green-400 font-semibold">${(wc.costPerHour || 0).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => handleOpenModal(wc)} className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                        <button onClick={() => setDeletingWorkCenter(wc)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                 {filteredWorkCenters.length === 0 && (
                     <tr>
                        <td colSpan="3" className="text-center p-8 text-gray-500">No work centers found.</td>
                    </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- Modals for Create/Edit and Delete Confirmation --- */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingWorkCenter ? 'Edit Work Center' : 'Create Work Center'}>
        <WorkCenterForm onClose={handleCloseModal} onSave={handleSave} workCenter={editingWorkCenter} />
      </Modal>

      <Modal isOpen={!!deletingWorkCenter} onClose={() => setDeletingWorkCenter(null)} title="Confirm Deletion">
        <div className="text-gray-300">
            <p>Are you sure you want to delete the work center <strong className="text-white">{deletingWorkCenter?.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={() => setDeletingWorkCenter(null)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">Cancel</button>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">Delete</button>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkCentersPage;


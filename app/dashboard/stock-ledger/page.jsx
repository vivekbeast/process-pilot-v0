// "use client";
// import { useState, useEffect, useMemo } from 'react';
// import { Search, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// // --- Main Stock Ledger Page Component ---
// const StockLedgerPage = () => {
//   const [stockEntries, setStockEntries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//   });

//   // --- Data Fetching Effect ---
//   useEffect(() => {
//     const fetchStock = async (page = 1) => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`/api/stock?page=${page}&limit=20`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch stock data');
//         }
//         const data = await response.json();
//         setStockEntries(data.data || []);
//         setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchStock(pagination.currentPage);
//   }, [pagination.currentPage]);

//   // --- Client-side Filtering Logic ---
//   const filteredEntries = useMemo(() => {
//     if (!searchTerm) {
//       return stockEntries;
//     }
//     return stockEntries.filter(entry =>
//       entry.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [stockEntries, searchTerm]);
  
//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//         setPagination(prev => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   return (
//     <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
//       <div className="max-w-7xl mx-auto">
//         {/* --- Header --- */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-white">Stock Ledger</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by product..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all">
//               <PlusCircle size={20} />
//               New Entry
//             </button>
//           </div>
//         </div>

//         {/* --- Main Content: Table --- */}
//         <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
//           {isLoading ? (
//             <div className="p-10 text-center text-gray-400">Loading stock data...</div>
//           ) : error ? (
//             <div className="p-10 text-center text-red-400">Error: {error}</div>
//           ) : (
//             <table className="w-full text-left">
//               <thead className="bg-[#333] text-gray-400 uppercase text-sm">
//                 <tr>
//                   <th className="p-4">Product</th>
//                   <th className="p-4 text-right">Unit Cost</th>
//                   <th className="p-4">Unit</th>
//                   <th className="p-4 text-right">Total Value</th>
//                   <th className="p-4 text-right">On Hand</th>
//                   <th className="p-4 text-right">Free to Use</th>
//                   <th className="p-4 text-right">Incoming</th>
//                   <th className="p-4 text-right">Reserved (Outgoing)</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {filteredEntries.length > 0 ? (
//                   filteredEntries.map((entry) => {
//                     const totalValue = (entry.quantityOnHand || 0) * (entry.averageCost || 0);
//                     const freeToUse = entry.quantityAvailable ?? ((entry.quantityOnHand || 0) - (entry.quantityReserved || 0));
                    
//                     return (
//                       <tr key={entry._id} className="hover:bg-[#333] transition-colors">
//                         <td className="p-4 font-semibold text-white">{entry.product?.name || 'N/A'}</td>
//                         <td className="p-4 text-right">${entry.averageCost?.toFixed(2) || '0.00'}</td>
//                         <td className="p-4 text-gray-400">{entry.product?.unitOfMeasure || 'N/A'}</td>
//                         <td className="p-4 text-right font-bold text-green-400">${totalValue.toFixed(2)}</td>
//                         <td className="p-4 text-right font-semibold text-lg">{entry.quantityOnHand || 0}</td>
//                         <td className="p-4 text-right text-blue-400 font-semibold text-lg">{freeToUse}</td>
//                         <td className="p-4 text-right text-gray-400">{0}</td>
//                         <td className="p-4 text-right text-orange-400">{entry.quantityReserved || 0}</td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center p-8 text-gray-500">
//                       No stock entries found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
        
//         {/* --- Pagination Controls --- */}
//         {!isLoading && !error && filteredEntries.length > 0 && (
//             <div className="flex justify-end items-center mt-6 gap-4">
//                 <span className="text-gray-400">
//                     Page {pagination.currentPage} of {pagination.totalPages}
//                 </span>
//                 <div className="flex gap-2">
//                     <button 
//                         onClick={() => handlePageChange(pagination.currentPage - 1)}
//                         disabled={pagination.currentPage <= 1}
//                         className="bg-[#333] p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <ChevronLeft size={20} />
//                     </button>
//                     <button 
//                         onClick={() => handlePageChange(pagination.currentPage + 1)}
//                         disabled={pagination.currentPage >= pagination.totalPages}
//                         className="bg-[#333] p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <ChevronRight size={20} />
//                     </button>
//                 </div>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StockLedgerPage;

"use client";
import { useState, useEffect, useMemo } from 'react';
import { Search, PlusCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 w-full max-w-2xl p-6 relative animate-fade-in-down">
        <div className="flex justify-between items-center mb-4">
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

// --- New/Update Stock Entry Form Component (Corrected Logic) ---
const StockEntryForm = ({ onClose, onFormSuccess, existingStockEntries }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState(0);
  const [averageCost, setAverageCost] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [existingEntry, setExistingEntry] = useState(null);

  // Fetch all products to populate the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        } else {
          setError('Failed to load products.');
        }
      } catch (err) {
        setError('An error occurred while fetching products.');
      }
    };
    fetchProducts();
  }, []);

  // Effect to check for an existing stock entry when a product is selected
  useEffect(() => {
    if (selectedProduct && existingStockEntries.length > 0) {
      const entry = existingStockEntries.find(e => e.product?._id === selectedProduct);
      if (entry) {
        setExistingEntry(entry);
        setQuantityOnHand(entry.quantityOnHand);
        setAverageCost(entry.averageCost);
      } else {
        setExistingEntry(null);
        setQuantityOnHand(0);
        setAverageCost(0);
      }
    } else {
        setExistingEntry(null);
    }
  }, [selectedProduct, existingStockEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!selectedProduct) {
      setError('Please select a product.');
      setIsLoading(false);
      return;
    }

    let response;
    try {
      if (existingEntry) {
        // --- UPDATE EXISTING STOCK ---
        response = await fetch(`/api/stock?id=${existingEntry._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantityOnHand, averageCost }),
        });
      } else {
        // --- CREATE NEW STOCK ---
        response = await fetch('/api/stock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product: selectedProduct, quantityOnHand, averageCost }),
        });
      }

      const result = await response.json();

      if (result.success) {
        onFormSuccess(result.data, !!existingEntry); // Pass data and update flag to parent
        onClose();
      } else {
        setError(result.message || 'Failed to save stock entry.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const selectedProductDetails = products.find(p => p._id === selectedProduct);
  const totalValue = quantityOnHand * averageCost;
  const formTitle = existingEntry ? "Update Stock Entry" : "Create New Stock Entry";

  return (
    <>
      <h3 className="text-lg font-semibold text-amber-400 mb-4">{formTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded-lg text-sm">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 block mb-2">Product *</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-[#333] p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select a Product</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 block mb-2">Unit Cost</label>
              <input
                type="number"
                value={averageCost}
                onChange={(e) => setAverageCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#333] p-2 rounded-md border border-gray-600"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2">Unit</label>
              <input
                type="text"
                value={selectedProductDetails?.unitOfMeasure || 'N/A'}
                readOnly
                className="w-full bg-[#444] p-2 rounded-md border border-gray-600 cursor-not-allowed text-gray-500"
              />
            </div>
             <div>
              <label className="text-gray-400 block mb-2">Total Value</label>
              <input
                type="text"
                value={`$${totalValue.toFixed(2)}`}
                readOnly
                className="w-full bg-[#444] p-2 rounded-md border border-gray-600 cursor-not-allowed font-bold text-green-400"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 block mb-2">On Hand</label>
              <input
                type="number"
                value={quantityOnHand}
                onChange={(e) => setQuantityOnHand(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-[#333] p-2 rounded-md border border-gray-600"
                min="0"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-2">Free to Use</label>
              <input type="text" value={existingEntry ? (quantityOnHand - existingEntry.quantityReserved) : quantityOnHand} readOnly className="w-full bg-[#444] p-2 rounded-md border border-gray-600 cursor-not-allowed text-gray-500" />
            </div>
            <div>
              <label className="text-gray-400 block mb-2">Outgoing</label>
              <input type="text" value={existingEntry?.quantityReserved || 0} readOnly className="w-full bg-[#444] p-2 rounded-md border border-gray-600 cursor-not-allowed text-gray-500" />
            </div>
             <div>
              <label className="text-gray-400 block mb-2">Incoming</label>
              <input type="text" value="0" readOnly className="w-full bg-[#444] p-2 rounded-md border border-gray-600 cursor-not-allowed text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-6 rounded-lg">
            Back
          </button>
          <button type="submit" disabled={isLoading} className="bg-amber-300 hover:bg-amber-400 cursor-pointer disabled:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </>
  );
};


// --- Main Stock Ledger Page Component ---
const StockLedgerPage = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Data Fetching Effect ---
  const fetchStock = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stock?page=${page}&limit=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      setStockEntries(data.data || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStock(pagination.currentPage);
  }, [pagination.currentPage]);

  // --- Client-side Filtering Logic ---
  const filteredEntries = useMemo(() => {
    if (!searchTerm) {
      return stockEntries;
    }
    return stockEntries.filter(entry =>
      entry.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stockEntries, searchTerm]);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
        setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };
  
  const handleFormSuccess = (newOrUpdatedStock, isUpdate) => {
      if (isUpdate) {
          // Find and replace the updated entry in the list
          setStockEntries(prev => prev.map(e => e._id === newOrUpdatedStock._id ? newOrUpdatedStock : e));
      } else {
          // Add the new entry to the top of the list
          setStockEntries(prev => [newOrUpdatedStock, ...prev]);
      }
  };

  return (
    <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Stock Ledger</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-500 cursor-pointer text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
            >
              <PlusCircle size={20} />
              New Entry
            </button>
          </div>
        </div>

        {/* --- Main Content: Table --- */}
        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-gray-400">Loading stock data...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-400">Error: {error}</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#333] text-gray-400 uppercase text-sm">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4 text-right">Unit Cost</th>
                  <th className="p-4">Unit</th>
                  <th className="p-4 text-right">Total Value</th>
                  <th className="p-4 text-right">On Hand</th>
                  <th className="p-4 text-right">Free to Use</th>
                  <th className="p-4 text-right">Incoming</th>
                  <th className="p-4 text-right">Reserved (Outgoing)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => {
                    const totalValue = (entry.quantityOnHand || 0) * (entry.averageCost || 0);
                    const freeToUse = entry.quantityAvailable ?? ((entry.quantityOnHand || 0) - (entry.quantityReserved || 0));
                    
                    return (
                      <tr key={entry._id} className="hover:bg-[#333] transition-colors">
                        <td className="p-4 font-semibold text-white">{entry.product?.name || 'N/A'}</td>
                        <td className="p-4 text-right">${entry.averageCost?.toFixed(2) || '0.00'}</td>
                        <td className="p-4 text-gray-400">{entry.product?.unitOfMeasure || 'N/A'}</td>
                        <td className="p-4 text-right font-bold text-green-400">${totalValue.toFixed(2)}</td>
                        <td className="p-4 text-right font-semibold text-lg">{entry.quantityOnHand || 0}</td>
                        <td className="p-4 text-right text-blue-400 font-semibold text-lg">{freeToUse}</td>
                        <td className="p-4 text-right text-gray-400">{0}</td>
                        <td className="p-4 text-right text-orange-400">{entry.quantityReserved || 0}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-8 text-gray-500">
                      No stock entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* --- Pagination Controls --- */}
        {!isLoading && !error && filteredEntries.length > 0 && (
            <div className="flex justify-end items-center mt-6 gap-4">
                <span className="text-gray-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage <= 1}
                        className="bg-[#333] p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage >= pagination.totalPages}
                        className="bg-[#333] p-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        )}
      </div>
      
      {/* --- Modal for New/Update Entry --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Manage Stock Entry">
        <StockEntryForm 
          onClose={() => setIsModalOpen(false)} 
          onFormSuccess={handleFormSuccess}
          existingStockEntries={stockEntries}
        />
      </Modal>
    </div>
  );
};

export default StockLedgerPage;


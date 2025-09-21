// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Search, 
//   Edit, 
//   Eye, 
//   Trash2, 
//   Save, 
//   X, 
//   Menu,
//   ChevronDown,
//   Calculator,
//   Clock,
//   Package,
//   Settings,
//   FileText,
//   ArrowLeft
// } from 'lucide-react';

// const BOMManagement = () => {
//   const [activeView, setActiveView] = useState('list');
//   const [boms, setBoms] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showMasterMenu, setShowMasterMenu] = useState(false);
//   const [editingBOM, setEditingBOM] = useState(null);

//   // Sample data to simulate API responses
//   const sampleProducts = [
//     { _id: '1', name: 'Drawer', unitOfMeasure: 'pcs' },
//     { _id: '2', name: 'Chair', unitOfMeasure: 'pcs' },
//     { _id: '3', name: 'Table', unitOfMeasure: 'pcs' },
//     { _id: '4', name: 'Wood Panel', unitOfMeasure: 'sq ft' },
//     { _id: '5', name: 'Screws', unitOfMeasure: 'pcs' },
//     { _id: '6', name: 'Hinges', unitOfMeasure: 'pcs' }
//   ];

//   const sampleBOMs = [
//     {
//       _id: '1',
//       name: 'Supportive Cormorant',
//       version: '1.0',
//       finishedProduct: { _id: '1', name: 'Drawer', unitOfMeasure: 'pcs' },
//       status: 'active',
//       description: 'Main/Zone Gold, fetch from stock ledger',
//       totalMaterialCost: 150.50,
//       totalLaborCost: 75.25,
//       totalEstimatedCost: 225.75,
//       components: [
//         {
//           product: { _id: '4', name: 'Wood Panel', unitOfMeasure: 'sq ft' },
//           quantity: 2,
//           unitOfMeasure: 'sq ft',
//           scrapPercentage: 5
//         },
//         {
//           product: { _id: '5', name: 'Screws', unitOfMeasure: 'pcs' },
//           quantity: 10,
//           unitOfMeasure: 'pcs',
//           scrapPercentage: 0
//         }
//       ],
//       operations: [
//         {
//           sequenceNumber: 1,
//           operationName: 'Cut Wood',
//           setupTime: 15,
//           cycleTime: 30,
//           description: 'Cut wood panels to size'
//         },
//         {
//           sequenceNumber: 2,
//           operationName: 'Assembly',
//           setupTime: 10,
//           cycleTime: 45,
//           description: 'Assemble drawer components'
//         }
//       ]
//     }
//   ];

//   const [formData, setFormData] = useState({
//     name: '',
//     version: '1.0',
//     finishedProduct: '',
//     status: 'draft',
//     description: '',
//     notes: '',
//     components: [],
//     operations: []
//   });

//   useEffect(() => {
//     loadBOMs();
//     setProducts(sampleProducts);
//   }, [currentPage, selectedProductId]);

//   const loadBOMs = async () => {
//     setLoading(true);
//     try {
//       // Simulate API call
//       setTimeout(() => {
//         setBoms(sampleBOMs);
//         setTotalPages(1);
//         setLoading(false);
//       }, 500);
//     } catch (error) {
//       console.error('Error loading BOMs:', error);
//       setLoading(false);
//     }
//   };

//   const handleCreateBOM = () => {
//     setEditingBOM(null);
//     setFormData({
//       name: '',
//       version: '1.0',
//       finishedProduct: '',
//       status: 'draft',
//       description: '',
//       notes: '',
//       components: [],
//       operations: []
//     });
//     setActiveView('form');
//   };

//   const handleEditBOM = (bom) => {
//     setEditingBOM(bom);
//     setFormData({
//       name: bom.name,
//       version: bom.version,
//       finishedProduct: bom.finishedProduct._id,
//       status: bom.status,
//       description: bom.description || '',
//       notes: bom.notes || '',
//       components: bom.components || [],
//       operations: bom.operations || []
//     });
//     setActiveView('form');
//   };

//   const handleSaveBOM = async () => {
//     try {
//       const bomData = {
//         ...formData,
//         finishedProduct: formData.finishedProduct
//       };

//       console.log('Saving BOM:', bomData);
      
//       // Simulate API call
//       alert('BOM saved successfully!');
//       setActiveView('list');
//       loadBOMs();
//     } catch (error) {
//       console.error('Error saving BOM:', error);
//       alert('Error saving BOM');
//     }
//   };

//   const addComponent = () => {
//     setFormData({
//       ...formData,
//       components: [
//         ...formData.components,
//         {
//           product: '',
//           quantity: 1,
//           unitOfMeasure: 'pcs',
//           scrapPercentage: 0,
//           notes: ''
//         }
//       ]
//     });
//   };

//   const removeComponent = (index) => {
//     const newComponents = formData.components.filter((_, i) => i !== index);
//     setFormData({ ...formData, components: newComponents });
//   };

//   const updateComponent = (index, field, value) => {
//     const newComponents = [...formData.components];
//     newComponents[index] = { ...newComponents[index], [field]: value };
//     setFormData({ ...formData, components: newComponents });
//   };

//   const addOperation = () => {
//     setFormData({
//       ...formData,
//       operations: [
//         ...formData.operations,
//         {
//           sequenceNumber: formData.operations.length + 1,
//           operationName: '',
//           setupTime: 0,
//           cycleTime: 0,
//           description: ''
//         }
//       ]
//     });
//   };

//   const removeOperation = (index) => {
//     const newOperations = formData.operations.filter((_, i) => i !== index);
//     // Renumber sequence
//     newOperations.forEach((op, i) => {
//       op.sequenceNumber = i + 1;
//     });
//     setFormData({ ...formData, operations: newOperations });
//   };

//   const updateOperation = (index, field, value) => {
//     const newOperations = [...formData.operations];
//     newOperations[index] = { ...newOperations[index], [field]: value };
//     setFormData({ ...formData, operations: newOperations });
//   };

//   const MasterMenu = () => (
//     <div className={`fixed left-0 top-0 h-full w-64  bg-[#2a2a2a] border-r border-red-600 transform transition-transform duration-300 z-50 ${showMasterMenu ? 'translate-x-0' : '-translate-x-full'}`}>
//       <div className="p-4 border-b border-red-600">
//         <div className="flex items-center justify-between">
//           <h2 className="text-white font-semibold">Master Menu</h2>
//           <button 
//             onClick={() => setShowMasterMenu(false)}
//             className="text-white hover:text-red-300"
//           >
//             <X size={20} />
//           </button>
//         </div>
//       </div>
//       <div className="p-4 space-y-2">
//         <div className="text-white text-sm mb-4">Master Menu</div>
//         <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded ">
//           Manufacturing Orders
//         </button>
//         <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded ">
//           Work Orders
//         </button>
//         <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded  bg-red-900/50">
//           Bills of Materials
//         </button>
//         <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded ">
//           Work Centers
//         </button>
//         <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded ">
//           Stock Ledger
//         </button>
//       </div>
//     </div>
//   );

//   const ListView = () => (
//     <div className="min-h-screen bg-[#1e1e1e] text-gray-200 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
     

//         {/* BOM Header */}
//         <div className="bg-[#2a2a2a] border border-gray-700  rounded-lg p-4 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-white">View</span>
//                 <select className="bg-black  text-white px-3 py-1 rounded">
//                   <option>List</option>
//                 </select>
//               </div>
//               <h1 className="text-2xl font-bold text-white">Bills of Materials</h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <Search size={20} className="text-white" />
//               <button className="p-2  rounded text-white hover:bg-red-900/30">
//                 <FileText size={16} />
//               </button>
//               <button className="p-2  rounded text-white hover:bg-red-900/30">
//                 <Settings size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Search and Filter */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-white text-sm mb-1">Finished Product</label>
//               <select 
//                 value={selectedProductId}
//                 onChange={(e) => setSelectedProductId(e.target.value)}
//                 className="w-full bg-black  text-white px-3 py-2 rounded"
//               >
//                 <option value="">All Products</option>
//                 {products.map(product => (
//                   <option key={product._id} value={product._id}>{product.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-white text-sm mb-1">Reference</label>
//               <input 
//                 type="text"
//                 placeholder="[00001]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-black  text-white px-3 py-2 rounded "
//               />
//             </div>
//           </div>

//           <div className="text-white text-sm mb-4">
//             Allow user to search work order based on Finished Product
//           </div>
//         </div>

//         {/* BOM List */}
//         <div className="bg-[#2a2a2a] rounded-lg p-4">
//           {loading ? (
//             <div className="text-center py-8">
//               <div className="text-white">Loading BOMs...</div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {boms.map((bom) => (
//                 <div key={bom._id} className="bg-black  rounded-lg p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <h3 className="text-white font-semibold text-lg">{bom.name}</h3>
//                       <div className="text-white text-sm">v{bom.version} | {bom.finishedProduct.name}</div>
//                     </div>
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => handleEditBOM(bom)}
//                         className="p-2  rounded text-white hover:bg-red-900/30"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button className="p-2  rounded text-white hover:bg-red-900/30">
//                         <Eye size={16} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <span className="text-white">Status:</span> 
//                       <span className="text-white ml-2">{bom.status}</span>
//                     </div>
//                     <div>
//                       <span className="text-white">Components:</span> 
//                       <span className="text-white ml-2">{bom.components?.length || 0}</span>
//                     </div>
//                     <div>
//                       <span className="text-white">Cost:</span> 
//                       <span className="text-white ml-2">${bom.totalEstimatedCost?.toFixed(2) || '0.00'}</span>
//                     </div>
//                   </div>
                  
//                   {bom.description && (
//                     <div className="mt-2 text-white text-sm">{bom.description}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="mt-6 flex justify-center">
//             <button 
//               onClick={handleCreateBOM}
//               className="bg-amber-300 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold"
//             >
//               + New BOM
//             </button>
//           </div>
//         </div>
// {/* 
//         <div className="text-center mt-4">
//           <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
//             Elegant Ape
//           </span>
//         </div> */}
//       </div>
//     </div>
//   );

//   const FormView = () => (
//     <div className="min-h-screen bg-[#1e1e1e] text-gray-200 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setActiveView('list')}
//               className="p-2  rounded text-white hover:bg-red-900/30"
//             >
//               <ArrowLeft size={20} />
//               <span className="ml-2">Back</span>
//             </button>
//             <h1 className="text-2xl font-bold text-white">
//               {editingBOM ? 'Edit Bill of Materials' : 'New Bill of Materials'}
//             </h1>
//           </div>
//           <div className="flex gap-2">
//             <button 
//               onClick={handleSaveBOM}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
//             >
//               <Save size={16} />
//               Save
//             </button>
//             <button 
//               onClick={() => setActiveView('list')}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
//             >
//               <X size={16} />
//               Cancel
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Basic Information */}
//           <div className="bg-[#2a2a2a]  rounded-lg p-6">
//             <h2 className="text-white font-semibold mb-4">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-white text-sm mb-1">BOM Name *</label>
//                 <input 
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full bg-black  text-white px-3 py-2 rounded"
//                   placeholder="Enter BOM name"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-white text-sm mb-1">Version</label>
//                   <input 
//                     type="text"
//                     value={formData.version}
//                     onChange={(e) => setFormData({...formData, version: e.target.value})}
//                     className="w-full bg-black  text-white px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-white text-sm mb-1">Status</label>
//                   <select 
//                     value={formData.status}
//                     onChange={(e) => setFormData({...formData, status: e.target.value})}
//                     className="w-full bg-black  text-white px-3 py-2 rounded"
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                     <option value="obsolete">Obsolete</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-white text-sm mb-1">Finished Product *</label>
//                 <select 
//                   value={formData.finishedProduct}
//                   onChange={(e) => setFormData({...formData, finishedProduct: e.target.value})}
//                   className="w-full bg-black  text-white px-3 py-2 rounded"
//                 >
//                   <option value="">Select Product</option>
//                   {products.map(product => (
//                     <option key={product._id} value={product._id}>{product.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-white text-sm mb-1">Description</label>
//                 <textarea 
//                   value={formData.description}
//                   onChange={(e) => setFormData({...formData, description: e.target.value})}
//                   className="w-full bg-black  text-white px-3 py-2 rounded h-20 resize-none"
//                   placeholder="BOM description"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Cost Summary */}
//           <div className="bg-[#2a2a2a]   rounded-lg p-6">
//             <h2 className="text-white font-semibold mb-4">Cost Summary</h2>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-white">Material Cost:</span>
//                 <span className="text-white">$0.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-white">Labor Cost:</span>
//                 <span className="text-white">$0.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-white">Overhead Cost:</span>
//                 <span className="text-white">$0.00</span>
//               </div>
//               <div className="border-t border-red-600 pt-2 flex justify-between font-semibold">
//                 <span className="text-white">Total Cost:</span>
//                 <span className="text-white">$0.00</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Components */}
//         <div className="mt-6 bg-[#2a2a2a]  rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-white font-semibold">Components</h2>
//             <button 
//               onClick={addComponent}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
//             >
//               <Plus size={16} />
//               Add Component
//             </button>
//           </div>

//           <div className="space-y-4">
//             {formData.components.map((component, index) => (
//               <div key={index} className=" rounded p-4">
//                 <div className="grid grid-cols-6 gap-4 items-end">
//                   <div className="col-span-2">
//                     <label className="block text-white text-sm mb-1">Product</label>
//                     <select 
//                       value={component.product}
//                       onChange={(e) => updateComponent(index, 'product', e.target.value)}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                     >
//                       <option value="">Select Product</option>
//                       {products.map(product => (
//                         <option key={product._id} value={product._id}>{product.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-white text-sm mb-1">Quantity</label>
//                     <input 
//                       type="number"
//                       value={component.quantity}
//                       onChange={(e) => updateComponent(index, 'quantity', parseFloat(e.target.value))}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       min="0"
//                       step="0.01"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-white text-sm mb-1">Unit</label>
//                     <input 
//                       type="text"
//                       value={component.unitOfMeasure}
//                       onChange={(e) => updateComponent(index, 'unitOfMeasure', e.target.value)}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-white text-sm mb-1">Scrap %</label>
//                     <input 
//                       type="number"
//                       value={component.scrapPercentage}
//                       onChange={(e) => updateComponent(index, 'scrapPercentage', parseFloat(e.target.value))}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       min="0"
//                       max="100"
//                     />
//                   </div>
//                   <div>
//                     <button 
//                       onClick={() => removeComponent(index)}
//                       className="p-2  rounded text-white hover:bg-red-900/30"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Operations */}
//         <div className="mt-6 bg-[#2a2a2a]   rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-white font-semibold">Work Orders / Operations</h2>
//             <button 
//               onClick={addOperation}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
//             >
//               <Plus size={16} />
//               Add Operation
//             </button>
//           </div>

//           <div className="space-y-4">
//             {formData.operations.map((operation, index) => (
//               <div key={index} className=" rounded p-4">
//                 <div className="grid grid-cols-6 gap-4 items-end">
//                   <div>
//                     <label className="block text-white text-sm mb-1">Sequence</label>
//                     <input 
//                       type="number"
//                       value={operation.sequenceNumber}
//                       onChange={(e) => updateOperation(index, 'sequenceNumber', parseInt(e.target.value))}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       min="1"
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <label className="block text-white text-sm mb-1">Operation Name</label>
//                     <input 
//                       type="text"
//                       value={operation.operationName}
//                       onChange={(e) => updateOperation(index, 'operationName', e.target.value)}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       placeholder="e.g., Cut, Assembly"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-white text-sm mb-1">Setup Time (min)</label>
//                     <input 
//                       type="number"
//                       value={operation.setupTime}
//                       onChange={(e) => updateOperation(index, 'setupTime', parseFloat(e.target.value))}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-white text-sm mb-1">Cycle Time (min)</label>
//                     <input 
//                       type="number"
//                       value={operation.cycleTime}
//                       onChange={(e) => updateOperation(index, 'cycleTime', parseFloat(e.target.value))}
//                       className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <button 
//                       onClick={() => removeOperation(index)}
//                       className="p-2  rounded text-white hover:bg-red-900/30"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <label className="block text-white text-sm mb-1">Description</label>
//                   <input 
//                     type="text"
//                     value={operation.description || ''}
//                     onChange={(e) => updateOperation(index, 'description', e.target.value)}
//                     className="w-full bg-black  text-white px-3 py-2 rounded text-sm"
//                     placeholder="Operation description"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 text-white text-sm">
//             On New Button, create a template which can be used in manufacturing orders
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <MasterMenu />
//       {showMasterMenu && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setShowMasterMenu(false)}
//         />
//       )}
      
//       {activeView === 'list' ? <ListView /> : <FormView />}
//     </>
//   );
// };

// export default BOMManagement;

"use client";

import React, { useState, useEffect } from 'react';

import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  Save, 
  X, 
  Menu,
  ChevronDown,
  Calculator,
  Clock,
  Package,
  Settings,
  FileText,
  ArrowLeft
} from 'lucide-react';

const BOMManagement = () => {
  const [activeView, setActiveView] = useState('list');
  const [boms, setBoms] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMasterMenu, setShowMasterMenu] = useState(false);
  const [editingBOM, setEditingBOM] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    version: '1.0',
    finishedProduct: '',
    status: 'draft',
    description: '',
    notes: '',
    components: [],
    operations: []
  });

  useEffect(() => {
    loadBOMs();
    loadProducts();
  }, [currentPage, selectedProductId, searchTerm]);

  // API Functions
  const loadBOMs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      if (selectedProductId) {
        params.append('productId', selectedProductId);
      }

      const response = await fetch(`/api/boms?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch BOMs: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setBoms(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        throw new Error(data.message || 'Failed to load BOMs');
      }
    } catch (error) {
      console.error('Error loading BOMs:', error);
      setError(error.message);
      setBoms([]);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        console.warn('Failed to load products:', data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
  };

  const handleCreateBOM = () => {
    setEditingBOM(null);
    setFormData({
      name: '',
      version: '1.0',
      finishedProduct: '',
      status: 'draft',
      description: '',
      notes: '',
      components: [],
      operations: []
    });
    setActiveView('form');
  };

  const handleEditBOM = (bom) => {
    setEditingBOM(bom);
    setFormData({
      name: bom.name,
      version: bom.version,
      finishedProduct: bom.finishedProduct?._id || '',
      status: bom.status,
      description: bom.description || '',
      notes: bom.notes || '',
      components: bom.components?.map(comp => ({
        product: comp.product?._id || '',
        quantity: comp.quantity,
        unitOfMeasure: comp.unitOfMeasure || 'pcs',
        scrapPercentage: comp.scrapPercentage || 0,
        notes: comp.notes || ''
      })) || [],
      operations: bom.operations?.map(op => ({
        sequenceNumber: op.sequenceNumber,
        operationName: op.operationName,
        setupTime: op.setupTime || 0,
        cycleTime: op.cycleTime || 0,
        description: op.description || '',
        workCenter: op.workCenter?._id || ''
      })) || []
    });
    setActiveView('form');
  };

  const handleSaveBOM = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('BOM name is required');
      }
      if (!formData.finishedProduct) {
        throw new Error('Finished product is required');
      }

      const bomData = {
        name: formData.name.trim(),
        version: formData.version,
        finishedProduct: formData.finishedProduct,
        status: formData.status,
        description: formData.description,
        notes: formData.notes,
        components: formData.components.filter(comp => comp.product && comp.quantity > 0),
        operations: formData.operations.filter(op => op.operationName.trim())
      };

      const url = editingBOM ? `/api/boms/${editingBOM._id}` : '/api/boms';
      const method = editingBOM ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bomData),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save BOM');
      }

      alert(`BOM ${editingBOM ? 'updated' : 'created'} successfully!`);
      setActiveView('list');
      loadBOMs();
    } catch (error) {
      console.error('Error saving BOM:', error);
      alert(`Error saving BOM: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBOM = async (bomId) => {
    if (!confirm('Are you sure you want to delete this BOM?')) {
      return;
    }

    try {
      const response = await fetch(`/api/boms/${bomId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete BOM');
      }

      alert('BOM deleted successfully!');
      loadBOMs();
    } catch (error) {
      console.error('Error deleting BOM:', error);
      alert(`Error deleting BOM: ${error.message}`);
    }
  };

  const addComponent = () => {
    setFormData({
      ...formData,
      components: [
        ...formData.components,
        {
          product: '',
          quantity: 1,
          unitOfMeasure: 'pcs',
          scrapPercentage: 0,
          notes: ''
        }
      ]
    });
  };

  const removeComponent = (index) => {
    const newComponents = formData.components.filter((_, i) => i !== index);
    setFormData({ ...formData, components: newComponents });
  };

  const updateComponent = (index, field, value) => {
    const newComponents = [...formData.components];
    newComponents[index] = { ...newComponents[index], [field]: value };
    setFormData({ ...formData, components: newComponents });
  };

  const addOperation = () => {
    setFormData({
      ...formData,
      operations: [
        ...formData.operations,
        {
          sequenceNumber: formData.operations.length + 1,
          operationName: '',
          setupTime: 0,
          cycleTime: 0,
          description: '',
          workCenter: ''
        }
      ]
    });
  };

  const removeOperation = (index) => {
    const newOperations = formData.operations.filter((_, i) => i !== index);
    // Renumber sequence
    newOperations.forEach((op, i) => {
      op.sequenceNumber = i + 1;
    });
    setFormData({ ...formData, operations: newOperations });
  };

  const updateOperation = (index, field, value) => {
    const newOperations = [...formData.operations];
    newOperations[index] = { ...newOperations[index], [field]: value };
    setFormData({ ...formData, operations: newOperations });
  };

  // Filter BOMs based on search term
  const filteredBOMs = boms.filter(bom => {
    if (!searchTerm) return true;
    return bom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           bom.finishedProduct?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const MasterMenu = () => (
    <div className={`fixed left-0 top-0 h-full w-64 bg-[#2a2a2a] border-r border-red-600 transform transition-transform duration-300 z-50 ${showMasterMenu ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b border-red-600">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Master Menu</h2>
          <button 
            onClick={() => setShowMasterMenu(false)}
            className="text-white hover:text-red-300"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="text-white text-sm mb-4">Master Menu</div>
        <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded">
          Manufacturing Orders
        </button>
        <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded">
          Work Orders
        </button>
        <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded bg-red-900/50">
          Bills of Materials
        </button>
        <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded">
          Work Centers
        </button>
        <button className="w-full text-left p-2 text-white hover:bg-red-900/30 rounded">
          Stock Ledger
        </button>
      </div>
    </div>
  );

  const ListView = () => (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* BOM Header */}
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-2">
                <span className="text-white">View</span>
                <select className="bg-black text-white px-3 py-1 rounded">
                  <option>List</option>
                </select>
              </div> */}
              <h1 className="text-2xl font-bold text-white">Bills of Materials</h1>
            </div>
            <div className="flex items-center gap-2">
              <Search size={20} className="text-white" />
              <button className="p-2 rounded text-white hover:bg-red-900/30">
                <FileText size={16} />
              </button>
              <button className="p-2 rounded text-white hover:bg-red-900/30">
                <Settings size={16} />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white text-sm mb-1">Finished Product</label>
              <select 
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-black text-white px-3 py-2 rounded"
              >
                <option value="">All Products</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div>
              {/* <label className="block text-white text-sm mb-1">Search BOM</label>
              <input 
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black text-white px-3 py-2 rounded"
              /> */}
            </div>
          </div>

          <div className="text-white text-sm mb-4">
            Search BOMs by finished product or BOM name
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mb-6">
            <div className="text-red-200">Error: {error}</div>
          </div>
        )}

        {/* BOM List */}
        <div className="bg-[#2a2a2a] rounded-lg p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-white">Loading BOMs...</div>
            </div>
          ) : filteredBOMs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-white">No BOMs found</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBOMs.map((bom) => (
                <div key={bom._id} className="bg-black rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{bom.name}</h3>
                      <div className="text-white text-sm">v{bom.version} | {bom.finishedProduct?.name || 'Unknown Product'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditBOM(bom)}
                        className="p-2 rounded text-white hover:bg-red-900/30"
                        title="Edit BOM"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-2 rounded text-white hover:bg-red-900/30"
                        title="View BOM"
                      >
                        <Eye size={16} />
                      </button>
                      {bom.status === 'draft' && (
                        <button 
                          onClick={() => handleDeleteBOM(bom._id)}
                          className="p-2 rounded text-white hover:bg-red-900/30"
                          title="Delete BOM"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-white">Status:</span> 
                      <span className={`text-white ml-2 px-2 py-1 rounded text-xs ${
                        bom.status === 'active' ? 'bg-green-600' :
                        bom.status === 'draft' ? 'bg-yellow-600' :
                        bom.status === 'inactive' ? 'bg-gray-600' :
                        'bg-red-600'
                      }`}>
                        {bom.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-white">Components:</span> 
                      <span className="text-white ml-2">{bom.components?.length || 0}</span>
                    </div>
                    <div>
                      <span className="text-white">Cost:</span> 
                      <span className="text-white ml-2">${bom.totalEstimatedCost?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                  
                  {bom.description && (
                    <div className="mt-2 text-white text-sm">{bom.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleCreateBOM}
              className="bg-amber-300 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              + New BOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FormView = () => (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveView('list')}
              className="p-2 rounded text-white hover:bg-red-900/30"
            >
              <ArrowLeft size={20} />
              <span className="ml-2">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">
              {editingBOM ? 'Edit Bill of Materials' : 'New Bill of Materials'}
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleSaveBOM}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={() => setActiveView('list')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-1">BOM Name *</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black text-white px-3 py-2 rounded"
                  placeholder="Enter BOM name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm mb-1">Version</label>
                  <input 
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    className="w-full bg-black text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-black text-white px-3 py-2 rounded"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="obsolete">Obsolete</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm mb-1">Finished Product *</label>
                <select 
                  value={formData.finishedProduct}
                  onChange={(e) => setFormData({...formData, finishedProduct: e.target.value})}
                  className="w-full bg-black text-white px-3 py-2 rounded"
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black text-white px-3 py-2 rounded h-20 resize-none"
                  placeholder="BOM description"
                />
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Cost Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white">Material Cost:</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Labor Cost:</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Overhead Cost:</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="border-t border-red-600 pt-2 flex justify-between font-semibold">
                <span className="text-white">Total Cost:</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Components */}
        <div className="mt-6 bg-[#2a2a2a] rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">Components</h2>
            <button 
              onClick={addComponent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} />
              Add Component
            </button>
          </div>

          <div className="space-y-4">
            {formData.components.map((component, index) => (
              <div key={index} className="rounded p-4 border border-gray-600">
                <div className="grid grid-cols-6 gap-4 items-end">
                  <div className="col-span-2">
                    <label className="block text-white text-sm mb-1">Product</label>
                    <select 
                      value={component.product}
                      onChange={(e) => updateComponent(index, 'product', e.target.value)}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Quantity</label>
                    <input 
                      type="number"
                      value={component.quantity}
                      onChange={(e) => updateComponent(index, 'quantity', parseFloat(e.target.value))}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Unit</label>
                    <input 
                      type="text"
                      value={component.unitOfMeasure}
                      onChange={(e) => updateComponent(index, 'unitOfMeasure', e.target.value)}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Scrap %</label>
                    <input 
                      type="number"
                      value={component.scrapPercentage}
                      onChange={(e) => updateComponent(index, 'scrapPercentage', parseFloat(e.target.value))}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <button 
                      onClick={() => removeComponent(index)}
                      className="p-2 rounded text-white hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operations */}
        <div className="mt-6 bg-[#2a2a2a] rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">Work Orders / Operations</h2>
            <button 
              onClick={addOperation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} />
              Add Operation
            </button>
          </div>

          <div className="space-y-4">
            {formData.operations.map((operation, index) => (
              <div key={index} className="rounded p-4 border border-gray-600">
                <div className="grid grid-cols-6 gap-4 items-end">
                  <div>
                    <label className="block text-white text-sm mb-1">Sequence</label>
                    <input 
                      type="number"
                      value={operation.sequenceNumber}
                      onChange={(e) => updateOperation(index, 'sequenceNumber', parseInt(e.target.value))}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      min="1"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-white text-sm mb-1">Operation Name</label>
                    <input 
                      type="text"
                      value={operation.operationName}
                      onChange={(e) => updateOperation(index, 'operationName', e.target.value)}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      placeholder="e.g., Cut, Assembly"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Setup Time (min)</label>
                    <input 
                      type="number"
                      value={operation.setupTime}
                      onChange={(e) => updateOperation(index, 'setupTime', parseFloat(e.target.value))}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">Cycle Time (min)</label>
                    <input 
                      type="number"
                      value={operation.cycleTime}
                      onChange={(e) => updateOperation(index, 'cycleTime', parseFloat(e.target.value))}
                      className="w-full bg-black text-white px-3 py-2 rounded text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <button 
                      onClick={() => removeOperation(index)}
                      className="p-2 rounded text-white hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <label className



// Continued from your provided code...
="block text-white text-sm mb-1">Description</label>
                                        <textarea
                                            value={operation.description}
                                            onChange={(e) => updateOperation(index, 'description', e.target.value)}
                                            className="w-full bg-black text-white px-3 py-2 rounded text-sm h-16 resize-none"
                                            placeholder="Operation instructions or notes..."
                                        />
                                    </div>
                                </div>
                            // </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-[#1e1e1e]">
            <MasterMenu />
            <div className={`transition-all duration-300 ${showMasterMenu ? 'ml-64' : 'ml-0'}`}>
                {/* A small button to toggle the master menu */}
                {/* <button
                    onClick={() => setShowMasterMenu(!showMasterMenu)}
                    className="fixed top-4 left-4 z-40 p-2 bg-[#2a2a2a] rounded text-white hover:bg-red-900/50"
                    title="Toggle Master Menu"
                >
                    <Menu size={20} />
                </button> */}

                {activeView === 'list' ? <ListView /> : <FormView />}
            </div>
        </div>
    );
};

export default BOMManagement;
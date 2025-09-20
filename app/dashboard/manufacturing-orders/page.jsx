// // export default ManufacturingOrderPage;
// "use client"
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, PlayCircle, Plus, X } from "lucide-react";

// // Mock data for products and BOMs
// const MOCK_PRODUCTS = [
//   { _id: "prod1", name: "Dining Table", unitOfMeasure: "pcs" },
//   { _id: "prod2", name: "Office Chair", unitOfMeasure: "pcs" },
//   { _id: "prod3", name: "Coffee Table", unitOfMeasure: "pcs" },
//   { _id: "prod4", name: "Bookshelf", unitOfMeasure: "pcs" },
//   { _id: "prod5", name: "Wardrobe", unitOfMeasure: "pcs" },
//   { _id: "prod6", name: "Study Desk", unitOfMeasure: "pcs" }
// ];

// const MOCK_BOMS = [
//   { 
//     _id: "bom1", 
//     name: "Dining Table BOM",
//     productId: "prod1",
//     components: [
//       { product: { _id: "comp1", name: "Wood Panel", unitOfMeasure: "sq ft" }, quantity: 4 },
//       { product: { _id: "comp2", name: "Table Legs", unitOfMeasure: "pcs" }, quantity: 4 },
//       { product: { _id: "comp3", name: "Screws", unitOfMeasure: "pcs" }, quantity: 16 },
//       { product: { _id: "comp4", name: "Wood Finish", unitOfMeasure: "ltr" }, quantity: 0.5 }
//     ]
//   },
//   { 
//     _id: "bom2", 
//     name: "Office Chair BOM",
//     productId: "prod2",
//     components: [
//       { product: { _id: "comp5", name: "Chair Base", unitOfMeasure: "pcs" }, quantity: 1 },
//       { product: { _id: "comp6", name: "Seat Cushion", unitOfMeasure: "pcs" }, quantity: 1 },
//       { product: { _id: "comp7", name: "Armrests", unitOfMeasure: "pcs" }, quantity: 2 },
//       { product: { _id: "comp8", name: "Wheels", unitOfMeasure: "pcs" }, quantity: 5 }
//     ]
//   }
// ];

// const AVAILABLE_COMPONENTS = [
//   { _id: "comp1", name: "Wood Panel", unitOfMeasure: "sq ft" },
//   { _id: "comp2", name: "Table Legs", unitOfMeasure: "pcs" },
//   { _id: "comp3", name: "Screws", unitOfMeasure: "pcs" },
//   { _id: "comp4", name: "Wood Finish", unitOfMeasure: "ltr" },
//   { _id: "comp5", name: "Chair Base", unitOfMeasure: "pcs" },
//   { _id: "comp6", name: "Seat Cushion", unitOfMeasure: "pcs" },
//   { _id: "comp7", name: "Armrests", unitOfMeasure: "pcs" },
//   { _id: "comp8", name: "Wheels", unitOfMeasure: "pcs" },
//   { _id: "comp9", name: "Metal Frame", unitOfMeasure: "pcs" },
//   { _id: "comp10", name: "Glass Top", unitOfMeasure: "pcs" },
//   { _id: "comp11", name: "Hinges", unitOfMeasure: "pcs" },
//   { _id: "comp12", name: "Handles", unitOfMeasure: "pcs" }
// ];

// // --- Helper Components ---
// const StateProgressBar = ({ currentState }) => {
//   const states = ["Draft", "Confirmed", "In-Progress", "To Close", "Done"];
//   const currentIndex = states.indexOf(currentState);

//   return (
//     <div className="flex items-center space-x-2">
//       {states.map((state, index) => (
//         <div key={state} className="flex items-center">
//           <div
//             className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
//               index <= currentIndex
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-600 text-gray-300"
//             }`}
//           >
//             {state}
//           </div>
//           {index < states.length - 1 && (
//             <div
//               className={`w-8 h-0.5 ${
//                 index < currentIndex ? "bg-green-500" : "bg-gray-600"
//               }`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const BOMManager = ({ bom, setBom, quantityToProduce }) => {
//   const [showAddComponent, setShowAddComponent] = useState(false);
//   const [newComponent, setNewComponent] = useState({
//     product: null,
//     quantity: 1
//   });

//   const addComponent = () => {
//     if (!newComponent.product) return;
    
//     const updatedComponents = [...(bom.components || []), {
//       product: newComponent.product,
//       quantity: newComponent.quantity
//     }];
    
//     setBom({ ...bom, components: updatedComponents });
//     setNewComponent({ product: null, quantity: 1 });
//     setShowAddComponent(false);
//   };

//   const removeComponent = (index) => {
//     const updatedComponents = bom.components.filter((_, i) => i !== index);
//     setBom({ ...bom, components: updatedComponents });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold text-white">BOM Components</h3>
//         <button
//           onClick={() => setShowAddComponent(true)}
//           className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm flex items-center gap-2"
//         >
//           <Plus size={16} />
//           Add Component
//         </button>
//       </div>

//       {showAddComponent && (
//         <div className="bg-[#333] p-4 rounded-lg border border-gray-600">
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="text-gray-400 text-sm">Component</label>
//               <select
//                 value={newComponent.product?._id || ""}
//                 onChange={(e) => {
//                   const selected = AVAILABLE_COMPONENTS.find(c => c._id === e.target.value);
//                   setNewComponent({ ...newComponent, product: selected });
//                 }}
//                 className="w-full bg-[#444] p-2 rounded-md mt-1 border border-gray-600"
//               >
//                 <option value="">Select Component...</option>
//                 {AVAILABLE_COMPONENTS.map(component => (
//                   <option key={component._id} value={component._id}>
//                     {component.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="text-gray-400 text-sm">Quantity</label>
//               <input
//                 type="number"
//                 value={newComponent.quantity}
//                 onChange={(e) => setNewComponent({ ...newComponent, quantity: Number(e.target.value) })}
//                 className="w-full bg-[#444] p-2 rounded-md mt-1 border border-gray-600"
//                 min="0.1"
//                 step="0.1"
//               />
//             </div>
//             <div className="flex items-end gap-2">
//               <button
//                 onClick={addComponent}
//                 className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
//               >
//                 Add
//               </button>
//               <button
//                 onClick={() => setShowAddComponent(false)}
//                 className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="w-full text-left">
//         <thead className="text-gray-400 border-b border-gray-700">
//           <tr>
//             <th className="p-2">Component</th>
//             <th className="p-2">Unit Qty</th>
//             <th className="p-2">Total Qty</th>
//             <th className="p-2">Unit</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(bom.components || []).length > 0 ? (
//             bom.components.map((component, index) => (
//               <tr key={component.product?._id || index} className="border-b border-gray-800">
//                 <td className="p-3">{component.product?.name || "Unknown Component"}</td>
//                 <td className="p-3">{component.quantity}</td>
//                 <td className="p-3 text-green-400 font-semibold">
//                   {(component.quantity * quantityToProduce).toFixed(2)}
//                 </td>
//                 <td className="p-3">{component.product?.unitOfMeasure || "Units"}</td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => removeComponent(index)}
//                     className="text-red-400 hover:text-red-300"
//                   >
//                     <X size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr className="border-b border-gray-800">
//               <td colSpan="5" className="p-3 text-center text-gray-500">
//                 No components added
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const ManufacturingOrderPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("ref");
  
//   const [order, setOrder] = useState({
//     reference: "NEW",
//     state: "Draft",
//     productToManufacture: { _id: "", name: "Select Product..." },
//     quantityToProduce: 1,
//     bom: { _id: "", name: "Select BOM...", components: [] },
//     componentStatus: "Not Available",
//     startDate: new Date().toISOString().split("T")[0],
//   });
  
//   const [activeTab, setActiveTab] = useState("components");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [availableBOMs, setAvailableBOMs] = useState([]);

//   // Filter BOMs based on selected product
//   useEffect(() => {
//     if (order.productToManufacture._id) {
//       const filteredBOMs = MOCK_BOMS.filter(bom => bom.productId === order.productToManufacture._id);
//       setAvailableBOMs(filteredBOMs);
      
//       // Auto-select BOM if only one available
//       if (filteredBOMs.length === 1) {
//         setOrder(prev => ({
//           ...prev,
//           bom: filteredBOMs[0]
//         }));
//       } else {
//         // Reset BOM selection if product changes
//         setOrder(prev => ({
//           ...prev,
//           bom: { _id: "", name: "Select BOM...", components: [] }
//         }));
//       }
//     } else {
//       setAvailableBOMs([]);
//     }
//   }, [order.productToManufacture._id]);

//   const handleProductChange = (productId) => {
//     const selectedProduct = MOCK_PRODUCTS.find(p => p._id === productId);
//     if (selectedProduct) {
//       setOrder(prev => ({
//         ...prev,
//         productToManufacture: selectedProduct
//       }));
//     }
//   };

//   const handleBOMChange = (bomId) => {
//     const selectedBOM = MOCK_BOMS.find(b => b._id === bomId);
//     if (selectedBOM) {
//       setOrder(prev => ({
//         ...prev,
//         bom: selectedBOM
//       }));
//     }
//   };

//   const handleAction = async (action) => {
//     setIsLoading(true);
//     setError("");

//     try {
//       // Prepare comprehensive payload
//       const payload = {
//         action,
//         reference: id,
//         productToManufacture: {
//           _id: order.productToManufacture._id,
//           name: order.productToManufacture.name,
//           unitOfMeasure: order.productToManufacture.unitOfMeasure
//         },
//         quantityToProduce: order.quantityToProduce,
//         bom: {
//           _id: order.bom._id,
//           name: order.bom.name,
//           components: order.bom.components
//         },
//         startDate: order.startDate,
//         state: order.state
//       };

//       console.log("Sending payload:", payload);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Update order state based on action
//       if (action === "confirm") {
//         setOrder(prev => ({
//           ...prev,
//           state: "Confirmed",
//           reference: `MO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
//         }));
//       }

//       // In real implementation:
//       const res = await fetch(`/api/manufacturing-orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || "An error occurred.");
//       setOrder(result.data);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <button onClick={() => router.back()} className="hover:text-green-400">
//             <ArrowLeft size={24} />
//           </button>
//           <h1 className="text-2xl font-bold text-white">
//             Manufacturing Order: {order.reference}
//           </h1>
//         </div>
//         <StateProgressBar currentState={order.state} />
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6 flex items-center gap-4">
//         {order.state === "Draft" && (
//           <button
//             onClick={() => handleAction("confirm")}
//             disabled={isLoading || !order.productToManufacture._id || !order.bom._id}
//             className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-md font-bold"
//           >
//             {isLoading ? "Processing..." : "Confirm Order"}
//           </button>
//         )}
//         {order.state === "Confirmed" && (
//           <button
//             onClick={() => handleAction("start")}
//             disabled={isLoading}
//             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-md font-bold"
//           >
//             Start Production
//           </button>
//         )}
//       </div>

//       {/* Main Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="text-gray-400">Finished Product *</label>
//           <select
//             value={order.productToManufacture._id}
//             onChange={(e) => handleProductChange(e.target.value)}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//             disabled={order.state !== "Draft"}
//           >
//             <option value="">Select Product...</option>
//             {MOCK_PRODUCTS.map(product => (
//               <option key={product._id} value={product._id}>
//                 {product.name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="text-gray-400">Quantity to Produce</label>
//           <input
//             type="number"
//             value={order.quantityToProduce}
//             onChange={(e) => setOrder({ ...order, quantityToProduce: Number(e.target.value) })}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//             min="1"
//             disabled={order.state !== "Draft"}
//           />
//         </div>
        
//         <div>
//           <label className="text-gray-400">Bill of Material *</label>
//           <select
//             value={order.bom._id}
//             onChange={(e) => handleBOMChange(e.target.value)}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//             disabled={order.state !== "Draft" || !order.productToManufacture._id}
//           >
//             <option value="">Select BOM...</option>
//             {availableBOMs.map(bom => (
//               <option key={bom._id} value={bom._id}>
//                 {bom.name}
//               </option>
//             ))}
//           </select>
//           {order.productToManufacture._id && availableBOMs.length === 0 && (
//             <p className="text-yellow-400 text-sm mt-1">No BOMs available for selected product</p>
//           )}
//         </div>
        
//         <div>
//           <label className="text-gray-400">Schedule Date</label>
//           <input
//             type="date"
//             value={order.startDate}
//             onChange={(e) => setOrder({ ...order, startDate: e.target.value })}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//             disabled={order.state !== "Draft"}
//           />
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="w-full">
//         <div className="flex border-b border-gray-700">
//           <button
//             onClick={() => setActiveTab("components")}
//             className={`px-6 py-3 font-semibold ${
//               activeTab === "components"
//                 ? "text-green-400 border-b-2 border-green-400"
//                 : "text-gray-400"
//             }`}
//           >
//             Components
//           </button>
//           <button
//             onClick={() => setActiveTab("work_orders")}
//             className={`px-6 py-3 font-semibold ${
//               activeTab === "work_orders"
//                 ? "text-green-400 border-b-2 border-green-400"
//                 : "text-gray-400"
//             }`}
//           >
//             Work Orders
//           </button>
//         </div>

//         <div className="pt-6">
//           {activeTab === "components" && (
//             <BOMManager 
//               bom={order.bom} 
//               setBom={(newBom) => setOrder({ ...order, bom: newBom })}
//               quantityToProduce={order.quantityToProduce}
//             />
//           )}

//           {activeTab === "work_orders" && (
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-4">Work Orders</h3>
//               <table className="w-full text-left">
//                 <thead className="text-gray-400 border-b border-gray-700">
//                   <tr>
//                     <th className="p-2">Operation</th>
//                     <th className="p-2">Work Center</th>
//                     <th className="p-2">Duration (min)</th>
//                     <th className="p-2">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b border-gray-800">
//                     <td className="p-3">Material Preparation</td>
//                     <td className="p-3">Prep Station A</td>
//                     <td className="p-3">30:00</td>
//                     <td className="p-3 flex items-center gap-4">
//                       <span className="text-lg font-semibold">00:00</span>
//                       <button className="text-green-400 hover:text-green-300">
//                         <PlayCircle />
//                       </button>
//                       <span className="text-gray-500">Ready</span>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-800">
//                     <td className="p-3">Assembly</td>
//                     <td className="p-3">Assembly Station 1</td>
//                     <td className="p-3">60:00</td>
//                     <td className="p-3 flex items-center gap-4">
//                       <span className="text-lg font-semibold">00:00</span>
//                       <button className="text-gray-400">
//                         <PlayCircle />
//                       </button>
//                       <span className="text-gray-500">Waiting</span>
//                     </td>
//                   </tr>
//                   <tr className="border-b border-gray-800">
//                     <td className="p-3">Quality Control</td>
//                     <td className="p-3">QC Station</td>
//                     <td className="p-3">15:00</td>
//                     <td className="p-3 flex items-center gap-4">
//                       <span className="text-lg font-semibold">00:00</span>
//                       <button className="text-gray-400">
//                         <PlayCircle />
//                       </button>
//                       <span className="text-gray-500">Waiting</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManufacturingOrderPage;

"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, PlayCircle, Plus, X } from "lucide-react";

// --- Helper Components ---
const StateProgressBar = ({ currentState }) => {
  const states = ["draft", "confirmed", "in_progress", "to_close", "done"];
  const stateLabels = ["Draft", "Confirmed", "In-Progress", "To Close", "Done"];
  const currentIndex = states.indexOf(currentState);

  return (
    <div className="flex items-center space-x-2">
      {stateLabels.map((label, index) => (
        <div key={label} className="flex items-center">
          <div
            className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
              index <= currentIndex
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {label}
          </div>
          {index < stateLabels.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                index < currentIndex ? "bg-green-500" : "bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const BOMManager = ({ bom, setBom, quantityToProduce, availableComponents }) => {
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [newComponent, setNewComponent] = useState({
    product: null,
    quantity: 1
  });

  const addComponent = () => {
    if (!newComponent.product) return;
    
    const updatedComponents = [...(bom.components || []), {
      product: newComponent.product,
      quantity: newComponent.quantity
    }];
    
    setBom({ ...bom, components: updatedComponents });
    setNewComponent({ product: null, quantity: 1 });
    setShowAddComponent(false);
  };

  const removeComponent = (index) => {
    const updatedComponents = bom.components.filter((_, i) => i !== index);
    setBom({ ...bom, components: updatedComponents });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">BOM Components</h3>
        <button
          onClick={() => setShowAddComponent(true)}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          Add Component
        </button>
      </div>

      {showAddComponent && (
        <div className="bg-[#333] p-4 rounded-lg border border-gray-600">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 text-sm">Component</label>
              <select
                value={newComponent.product?._id || ""}
                onChange={(e) => {
                  const selected = availableComponents.find(c => c._id === e.target.value);
                  setNewComponent({ ...newComponent, product: selected });
                }}
                className="w-full bg-[#444] p-2 rounded-md mt-1 border border-gray-600"
              >
                <option value="">Select Component...</option>
                {availableComponents.map(component => (
                  <option key={component._id} value={component._id}>
                    {component.name} ({component.unitOfMeasure})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Quantity</label>
              <input
                type="number"
                value={newComponent.quantity}
                onChange={(e) => setNewComponent({ ...newComponent, quantity: Number(e.target.value) })}
                className="w-full bg-[#444] p-2 rounded-md mt-1 border border-gray-600"
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={addComponent}
                className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddComponent(false)}
                className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-left">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th className="p-2">Component</th>
            <th className="p-2">Unit Qty</th>
            <th className="p-2">Total Qty</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(bom.components || []).length > 0 ? (
            bom.components.map((component, index) => (
              <tr key={component.product?._id || index} className="border-b border-gray-800">
                <td className="p-3">{component.product?.name || "Unknown Component"}</td>
                <td className="p-3">{component.quantity}</td>
                <td className="p-3 text-green-400 font-semibold">
                  {(component.quantity * quantityToProduce).toFixed(2)}
                </td>
                <td className="p-3">{component.product?.unitOfMeasure || "Units"}</td>
                <td className="p-3">
                  <button
                    onClick={() => removeComponent(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-800">
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No components added
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ManufacturingOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("ref");
  
  const [order, setOrder] = useState({
    reference: "NEW",
    state: "draft",
    productToManufacture: { _id: "", name: "Select Product..." },
    quantityToProduce: 1,
    bom: { _id: "", name: "Select BOM...", components: [] },
    componentStatus: "Not Available",
    startDate: new Date().toISOString().split("T")[0],
  });
  
  const [activeTab, setActiveTab] = useState("components");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Data states
  const [products, setProducts] = useState([]);
  const [availableBOMs, setAvailableBOMs] = useState([]);
  const [availableComponents, setAvailableComponents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoadingData(true);
      
      // Load finished products
      const productsRes = await fetch('/api/products?type=finished');
      const productsData = await productsRes.json();
      if (productsData.success) {
        setProducts(productsData.data);
      }
      
      // Load components/raw materials for BOM management
      const componentsRes = await fetch('/api/products?type=component&limit=100');
      const componentsData = await componentsRes.json();
      if (componentsData.success) {
        setAvailableComponents(componentsData.data);
      }
      
      // Load raw materials too
      const rawMaterialsRes = await fetch('/api/products?type=raw_material&limit=100');
      const rawMaterialsData = await rawMaterialsRes.json();
      if (rawMaterialsData.success) {
        setAvailableComponents(prev => [...prev, ...rawMaterialsData.data]);
      }
      
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError('Failed to load initial data');
    } finally {
      setLoadingData(false);
    }
  };

  // Load BOMs when product changes
  useEffect(() => {
    if (order.productToManufacture._id) {
      loadBOMs(order.productToManufacture._id);
    } else {
      setAvailableBOMs([]);
    }
  }, [order.productToManufacture._id]);

  const loadBOMs = async (productId) => {
    try {
      const response = await fetch(`/api/boms?productId=${productId}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableBOMs(data.data);
        
        // Auto-select BOM if only one available
        if (data.data.length === 1) {
          setOrder(prev => ({
            ...prev,
            bom: data.data[0]
          }));
        } else {
          // Reset BOM selection if product changes
          setOrder(prev => ({
            ...prev,
            bom: { _id: "", name: "Select BOM...", components: [] }
          }));
        }
      } else {
        setAvailableBOMs([]);
      }
    } catch (error) {
      console.error('Error loading BOMs:', error);
      setAvailableBOMs([]);
    }
  };

  const handleProductChange = (productId) => {
    const selectedProduct = products.find(p => p._id === productId);
    if (selectedProduct) {
      setOrder(prev => ({
        ...prev,
        productToManufacture: selectedProduct
      }));
    }
  };

  const handleBOMChange = (bomId) => {
    const selectedBOM = availableBOMs.find(b => b._id === bomId);
    if (selectedBOM) {
      setOrder(prev => ({
        ...prev,
        bom: selectedBOM
      }));
    }
  };

  const checkComponentAvailability = async (bomComponents, quantity) => {
    try {
      // Check stock for each component
      const stockChecks = await Promise.all(
        bomComponents.map(async (component) => {
          const response = await fetch(`/api/stock?productId=${component.product._id}`);
          const data = await response.json();
          
          if (data.success && data.data.length > 0) {
            const stock = data.data[0];
            const requiredQty = component.quantity * quantity;
            const availableQty = stock.quantityAvailable;
            
            return {
              product: component.product.name,
              required: requiredQty,
              available: availableQty,
              sufficient: availableQty >= requiredQty
            };
          }
          
          return {
            product: component.product.name,
            required: component.quantity * quantity,
            available: 0,
            sufficient: false
          };
        })
      );
      
      const allAvailable = stockChecks.every(check => check.sufficient);
      return allAvailable ? 'Available' : 'Not Available';
      
    } catch (error) {
      console.error('Error checking component availability:', error);
      return 'Unknown';
    }
  };

  // Update component status when BOM or quantity changes
  useEffect(() => {
    if (order.bom.components && order.bom.components.length > 0) {
      checkComponentAvailability(order.bom.components, order.quantityToProduce)
        .then(status => {
          setOrder(prev => ({ ...prev, componentStatus: status }));
        });
    }
  }, [order.bom.components, order.quantityToProduce]);

  const handleAction = async (action) => {
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        action,
        reference: order.reference !== "NEW" ? order.reference : undefined,
        productToManufacture: {
          _id: order.productToManufacture._id,
          name: order.productToManufacture.name,
          unitOfMeasure: order.productToManufacture.unitOfMeasure
        },
        quantityToProduce: order.quantityToProduce,
        bom: {
          _id: order.bom._id,
          name: order.bom.name,
          components: order.bom.components
        },
        startDate: order.startDate,
        state: order.state
      };

      console.log("Sending payload:", payload);

      const res = await fetch(`/api/manufacturing-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "An error occurred.");
      
      // Update order with response data
      setOrder(prev => ({
        ...prev,
        reference: result.data.moNumber || result.data.reference,
        state: result.data.status || result.data.state,
        _id: result.data._id
      }));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:text-green-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Manufacturing Order: {order.reference}
          </h1>
        </div>
        <StateProgressBar currentState={order.state} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Component Availability Status */}
      <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Component Status</h3>
            <p className={`text-sm mt-1 ${
              order.componentStatus === 'Available' ? 'text-green-400' : 
              order.componentStatus === 'Not Available' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {order.componentStatus}
            </p>
          </div>
          {order.state === "draft" && (
            <button
              onClick={() => handleAction("confirm")}
              disabled={isLoading || !order.productToManufacture._id || !order.bom._id}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-md font-bold"
            >
              {isLoading ? "Processing..." : "Confirm Order"}
            </button>
          )}
          {order.state === "confirmed" && (
            <button
              onClick={() => handleAction("start")}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-md font-bold"
            >
              Start Production
            </button>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-gray-400">Finished Product *</label>
          <select
            value={order.productToManufacture._id}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            disabled={order.state !== "draft"}
          >
            <option value="">Select Product...</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-gray-400">Quantity to Produce</label>
          <input
            type="number"
            value={order.quantityToProduce}
            onChange={(e) => setOrder({ ...order, quantityToProduce: Number(e.target.value) })}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            min="1"
            disabled={order.state !== "draft"}
          />
        </div>
        
        <div>
          <label className="text-gray-400">Bill of Material *</label>
          <select
            value={order.bom._id}
            onChange={(e) => handleBOMChange(e.target.value)}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            disabled={order.state !== "draft" || !order.productToManufacture._id}
          >
            <option value="">Select BOM...</option>
            {availableBOMs.map(bom => (
              <option key={bom._id} value={bom._id}>
                {bom.name}
              </option>
            ))}
          </select>
          {order.productToManufacture._id && availableBOMs.length === 0 && (
            <p className="text-yellow-400 text-sm mt-1">No BOMs available for selected product</p>
          )}
        </div>
        
        <div>
          <label className="text-gray-400">Schedule Date</label>
          <input
            type="date"
            value={order.startDate}
            onChange={(e) => setOrder({ ...order, startDate: e.target.value })}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            disabled={order.state !== "draft"}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("components")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "components"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400"
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab("work_orders")}
            className={`px-6 py-3 font-semibold ${
              activeTab === "work_orders"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400"
            }`}
          >
            Work Orders
          </button>
        </div>

        <div className="pt-6">
          {activeTab === "components" && (
            <BOMManager 
              bom={order.bom} 
              setBom={(newBom) => setOrder({ ...order, bom: newBom })}
              quantityToProduce={order.quantityToProduce}
              availableComponents={availableComponents}
            />
          )}

          {activeTab === "work_orders" && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Work Orders</h3>
              <table className="w-full text-left">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="p-2">Operation</th>
                    <th className="p-2">Work Center</th>
                    <th className="p-2">Duration (min)</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Material Preparation</td>
                    <td className="p-3">Prep Station A</td>
                    <td className="p-3">30:00</td>
                    <td className="p-3 flex items-center gap-4">
                      <span className="text-lg font-semibold">00:00</span>
                      <button className="text-green-400 hover:text-green-300">
                        <PlayCircle />
                      </button>
                      <span className="text-gray-500">Ready</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Assembly</td>
                    <td className="p-3">Assembly Station 1</td>
                    <td className="p-3">60:00</td>
                    <td className="p-3 flex items-center gap-4">
                      <span className="text-lg font-semibold">00:00</span>
                      <button className="text-gray-400">
                        <PlayCircle />
                      </button>
                      <span className="text-gray-500">Waiting</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-3">Quality Control</td>
                    <td className="p-3">QC Station</td>
                    <td className="p-3">15:00</td>
                    <td className="p-3 flex items-center gap-4">
                      <span className="text-lg font-semibold">00:00</span>
                      <button className="text-gray-400">
                        <PlayCircle />
                      </button>
                      <span className="text-gray-500">Waiting</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManufacturingOrderPage;
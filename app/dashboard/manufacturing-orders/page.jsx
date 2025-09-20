// "use client"
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, PlayCircle } from "lucide-react";

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

// const ManufacturingOrderPage = () => {
//   const router = useRouter();
//   const [order, setOrder] = useState({
//     reference: "NEW",
//     state: "Draft",
//     productToManufacture: { name: "Select Product..." },
//     quantityToProduce: 1,
//     bom: { name: "Select BOM...", components: [] },
//     componentStatus: "Not Available",
//     startDate: new Date().toISOString(),
//   });
//   const [activeTab, setActiveTab] = useState("components");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const serach = useSearchParams();
//   const id = serach.get("ref");
//   // --- Action handler for new order ---
//   // const handleAction = async (action, payload = {}) => {
//   //   setIsLoading(true);
//   //   setError("");

//   //   try {
//   //     // POST request to create new manufacturing order
//   //     const res = await fetch(`/api/manufacturing-orders?id=${id}`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ action, order, payload }),
//   //     });

//   //     const result = await res.json();
//   //     if (!res.ok) throw new Error(result.message || "An error occurred.");

//   //     // Update order with returned data
//   //     setOrder(result.data);
//   //   } catch (err) {
//   //     setError(err.message);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleAction = async () => {
//   setIsLoading(true);
//   setError("");

//   try {
//     const res = await fetch(`/api/manufacturing-orders`, {
//       method: "POST", // POST creates a new order
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         reference: order.reference,
//         product: order.productToManufacture._id, // send the ID
//         quantity: order.quantityToProduce,
//         bom: order.bom._id,                     // send the BOM ID
//       }),
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "An error occurred.");

//     setOrder(result.data);
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div className="bg-[#1e1e1e] text-gray-200 min-h-screen p-8 font-mono">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <button onClick={() => router.back()} className="hover:text-green-400">
//             <ArrowLeft size={24} />
//           </button>
//           <h1 className="text-2xl font-bold text-white">
//             {order.reference}
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
//             disabled={isLoading || error}
//             className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-md font-bold"
//           >
//             Confirm
//           </button>
//         )}
//         {isLoading && <span className="text-yellow-400">Processing...</span>}
//       </div>

//       {/* Main Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <label className="text-gray-400">Finished Product</label>
//           <input
//             type="text"
//             placeholder="Enter product..."
//             value={order.productToManufacture.name}
//             onChange={(e) =>
//               setOrder({
//                 ...order,
//                 productToManufacture: { ...order.productToManufacture, name: e.target.value },
//               })
//             }
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//           />
//         </div>
//         <div>
//           <label className="text-gray-400">Quantity</label>
//           <input
//             type="number"
//             value={order.quantityToProduce}
//             onChange={(e) => setOrder({ ...order, quantityToProduce: Number(e.target.value) })}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//           />
//         </div>
//         <div>
//           <label className="text-gray-400">Bill of Material</label>
//           <input
//             type="text"
//             placeholder="Select BOM..."
//             value={order.bom.name}
//             onChange={(e) => setOrder({ ...order, bom: { ...order.bom, name: e.target.value } })}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
//           />
//         </div>
//         <div>
//           <label className="text-gray-400">Schedule Date</label>
//           <input
//             type="date"
//             value={new Date(order.startDate).toISOString().split("T")[0]}
//             onChange={(e) => setOrder({ ...order, startDate: e.target.value })}
//             className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
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
//             <table className="w-full text-left">
//               <thead className="text-gray-400 border-b border-gray-700">
//                 <tr>
//                   <th className="p-2">Component</th>
//                   <th className="p-2">Availability</th>
//                   <th className="p-2">To Consume</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.bom.components.length > 0 ? (
//                   order.bom.components.map((c, index) => (
//                     <tr key={c.product?._id || index} className="border-b border-gray-800">
//                       <td className="p-3">{c.product?.name || "Unknown Component"}</td>
//                       <td
//                         className={`p-3 font-bold ${
//                           order.componentStatus === "Available"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {order.componentStatus}
//                       </td>
//                       <td className="p-3">
//                         {(c.quantity || 0) * (order.quantityToProduce || 1)}{" "}
//                         {c.product?.unitOfMeasure || "Units"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr className="border-b border-gray-800">
//                     <td colSpan="3" className="p-3 text-center text-gray-500">
//                       No components available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}

//           {activeTab === "work_orders" && (
//             <table className="w-full text-left">
//               <thead className="text-gray-400 border-b border-gray-700">
//                 <tr>
//                   <th className="p-2">Operation</th>
//                   <th className="p-2">Work Center</th>
//                   <th className="p-2">Duration</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-800">
//                   <td className="p-3">Assembly</td>
//                   <td className="p-3">Assembly Station 1</td>
//                   <td className="p-3">60:00</td>
//                   <td className="p-3 flex items-center gap-4">
//                     <span className="text-lg font-semibold">00:00</span>
//                     <button className="text-green-400 hover:text-green-300">
//                       <PlayCircle />
//                     </button>
//                     <span className="text-gray-500">To Do</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
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

// Mock data for products and BOMs
const MOCK_PRODUCTS = [
  { _id: "prod1", name: "Dining Table", unitOfMeasure: "pcs" },
  { _id: "prod2", name: "Office Chair", unitOfMeasure: "pcs" },
  { _id: "prod3", name: "Coffee Table", unitOfMeasure: "pcs" },
  { _id: "prod4", name: "Bookshelf", unitOfMeasure: "pcs" },
  { _id: "prod5", name: "Wardrobe", unitOfMeasure: "pcs" },
  { _id: "prod6", name: "Study Desk", unitOfMeasure: "pcs" }
];

const MOCK_BOMS = [
  { 
    _id: "bom1", 
    name: "Dining Table BOM",
    productId: "prod1",
    components: [
      { product: { _id: "comp1", name: "Wood Panel", unitOfMeasure: "sq ft" }, quantity: 4 },
      { product: { _id: "comp2", name: "Table Legs", unitOfMeasure: "pcs" }, quantity: 4 },
      { product: { _id: "comp3", name: "Screws", unitOfMeasure: "pcs" }, quantity: 16 },
      { product: { _id: "comp4", name: "Wood Finish", unitOfMeasure: "ltr" }, quantity: 0.5 }
    ]
  },
  { 
    _id: "bom2", 
    name: "Office Chair BOM",
    productId: "prod2",
    components: [
      { product: { _id: "comp5", name: "Chair Base", unitOfMeasure: "pcs" }, quantity: 1 },
      { product: { _id: "comp6", name: "Seat Cushion", unitOfMeasure: "pcs" }, quantity: 1 },
      { product: { _id: "comp7", name: "Armrests", unitOfMeasure: "pcs" }, quantity: 2 },
      { product: { _id: "comp8", name: "Wheels", unitOfMeasure: "pcs" }, quantity: 5 }
    ]
  }
];

const AVAILABLE_COMPONENTS = [
  { _id: "comp1", name: "Wood Panel", unitOfMeasure: "sq ft" },
  { _id: "comp2", name: "Table Legs", unitOfMeasure: "pcs" },
  { _id: "comp3", name: "Screws", unitOfMeasure: "pcs" },
  { _id: "comp4", name: "Wood Finish", unitOfMeasure: "ltr" },
  { _id: "comp5", name: "Chair Base", unitOfMeasure: "pcs" },
  { _id: "comp6", name: "Seat Cushion", unitOfMeasure: "pcs" },
  { _id: "comp7", name: "Armrests", unitOfMeasure: "pcs" },
  { _id: "comp8", name: "Wheels", unitOfMeasure: "pcs" },
  { _id: "comp9", name: "Metal Frame", unitOfMeasure: "pcs" },
  { _id: "comp10", name: "Glass Top", unitOfMeasure: "pcs" },
  { _id: "comp11", name: "Hinges", unitOfMeasure: "pcs" },
  { _id: "comp12", name: "Handles", unitOfMeasure: "pcs" }
];

// --- Helper Components ---
const StateProgressBar = ({ currentState }) => {
  const states = ["Draft", "Confirmed", "In-Progress", "To Close", "Done"];
  const currentIndex = states.indexOf(currentState);

  return (
    <div className="flex items-center space-x-2">
      {states.map((state, index) => (
        <div key={state} className="flex items-center">
          <div
            className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
              index <= currentIndex
                ? "bg-green-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {state}
          </div>
          {index < states.length - 1 && (
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

const BOMManager = ({ bom, setBom, quantityToProduce }) => {
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
                  const selected = AVAILABLE_COMPONENTS.find(c => c._id === e.target.value);
                  setNewComponent({ ...newComponent, product: selected });
                }}
                className="w-full bg-[#444] p-2 rounded-md mt-1 border border-gray-600"
              >
                <option value="">Select Component...</option>
                {AVAILABLE_COMPONENTS.map(component => (
                  <option key={component._id} value={component._id}>
                    {component.name}
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
    state: "Draft",
    productToManufacture: { _id: "", name: "Select Product..." },
    quantityToProduce: 1,
    bom: { _id: "", name: "Select BOM...", components: [] },
    componentStatus: "Not Available",
    startDate: new Date().toISOString().split("T")[0],
  });
  
  const [activeTab, setActiveTab] = useState("components");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableBOMs, setAvailableBOMs] = useState([]);

  // Filter BOMs based on selected product
  useEffect(() => {
    if (order.productToManufacture._id) {
      const filteredBOMs = MOCK_BOMS.filter(bom => bom.productId === order.productToManufacture._id);
      setAvailableBOMs(filteredBOMs);
      
      // Auto-select BOM if only one available
      if (filteredBOMs.length === 1) {
        setOrder(prev => ({
          ...prev,
          bom: filteredBOMs[0]
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
  }, [order.productToManufacture._id]);

  const handleProductChange = (productId) => {
    const selectedProduct = MOCK_PRODUCTS.find(p => p._id === productId);
    if (selectedProduct) {
      setOrder(prev => ({
        ...prev,
        productToManufacture: selectedProduct
      }));
    }
  };

  const handleBOMChange = (bomId) => {
    const selectedBOM = MOCK_BOMS.find(b => b._id === bomId);
    if (selectedBOM) {
      setOrder(prev => ({
        ...prev,
        bom: selectedBOM
      }));
    }
  };

  const handleAction = async (action) => {
    setIsLoading(true);
    setError("");

    try {
      // Prepare comprehensive payload
      const payload = {
        action,
        reference: id,
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update order state based on action
      if (action === "confirm") {
        setOrder(prev => ({
          ...prev,
          state: "Confirmed",
          reference: `MO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
        }));
      }

      // In real implementation:
      const res = await fetch(`/api/manufacturing-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "An error occurred.");
      setOrder(result.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Action Buttons */}
      <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6 flex items-center gap-4">
        {order.state === "Draft" && (
          <button
            onClick={() => handleAction("confirm")}
            disabled={isLoading || !order.productToManufacture._id || !order.bom._id}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-md font-bold"
          >
            {isLoading ? "Processing..." : "Confirm Order"}
          </button>
        )}
        {order.state === "Confirmed" && (
          <button
            onClick={() => handleAction("start")}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-md font-bold"
          >
            Start Production
          </button>
        )}
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-gray-400">Finished Product *</label>
          <select
            value={order.productToManufacture._id}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            disabled={order.state !== "Draft"}
          >
            <option value="">Select Product...</option>
            {MOCK_PRODUCTS.map(product => (
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
            disabled={order.state !== "Draft"}
          />
        </div>
        
        <div>
          <label className="text-gray-400">Bill of Material *</label>
          <select
            value={order.bom._id}
            onChange={(e) => handleBOMChange(e.target.value)}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
            disabled={order.state !== "Draft" || !order.productToManufacture._id}
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
            disabled={order.state !== "Draft"}
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
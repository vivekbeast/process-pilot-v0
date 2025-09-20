"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlayCircle } from "lucide-react";

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

const ManufacturingOrderPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState({
    reference: "NEW",
    state: "Draft",
    productToManufacture: { name: "Select Product..." },
    quantityToProduce: 1,
    bom: { name: "Select BOM...", components: [] },
    componentStatus: "Not Available",
    startDate: new Date().toISOString(),
  });
  const [activeTab, setActiveTab] = useState("components");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Action handler for new order ---
  const handleAction = async (action, payload = {}) => {
    setIsLoading(true);
    setError("");

    try {
      // POST request to create new manufacturing order
      const res = await fetch(`/api/manufacturing-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, order, payload }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "An error occurred.");

      // Update order with returned data
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
            {order.reference}
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
            disabled={isLoading || error}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-md font-bold"
          >
            Confirm
          </button>
        )}
        {isLoading && <span className="text-yellow-400">Processing...</span>}
      </div>

      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-gray-400">Finished Product</label>
          <input
            type="text"
            placeholder="Enter product..."
            value={order.productToManufacture.name}
            onChange={(e) =>
              setOrder({
                ...order,
                productToManufacture: { ...order.productToManufacture, name: e.target.value },
              })
            }
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
          />
        </div>
        <div>
          <label className="text-gray-400">Quantity</label>
          <input
            type="number"
            value={order.quantityToProduce}
            onChange={(e) => setOrder({ ...order, quantityToProduce: Number(e.target.value) })}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
          />
        </div>
        <div>
          <label className="text-gray-400">Bill of Material</label>
          <input
            type="text"
            placeholder="Select BOM..."
            value={order.bom.name}
            onChange={(e) => setOrder({ ...order, bom: { ...order.bom, name: e.target.value } })}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
          />
        </div>
        <div>
          <label className="text-gray-400">Schedule Date</label>
          <input
            type="date"
            value={new Date(order.startDate).toISOString().split("T")[0]}
            onChange={(e) => setOrder({ ...order, startDate: e.target.value })}
            className="w-full bg-[#333] p-2 rounded-md mt-1 border border-gray-600"
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
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-2">Component</th>
                  <th className="p-2">Availability</th>
                  <th className="p-2">To Consume</th>
                </tr>
              </thead>
              <tbody>
                {order.bom.components.length > 0 ? (
                  order.bom.components.map((c, index) => (
                    <tr key={c.product?._id || index} className="border-b border-gray-800">
                      <td className="p-3">{c.product?.name || "Unknown Component"}</td>
                      <td
                        className={`p-3 font-bold ${
                          order.componentStatus === "Available"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {order.componentStatus}
                      </td>
                      <td className="p-3">
                        {(c.quantity || 0) * (order.quantityToProduce || 1)}{" "}
                        {c.product?.unitOfMeasure || "Units"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-800">
                    <td colSpan="3" className="p-3 text-center text-gray-500">
                      No components available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "work_orders" && (
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-2">Operation</th>
                  <th className="p-2">Work Center</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3">Assembly</td>
                  <td className="p-3">Assembly Station 1</td>
                  <td className="p-3">60:00</td>
                  <td className="p-3 flex items-center gap-4">
                    <span className="text-lg font-semibold">00:00</span>
                    <button className="text-green-400 hover:text-green-300">
                      <PlayCircle />
                    </button>
                    <span className="text-gray-500">To Do</span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManufacturingOrderPage;

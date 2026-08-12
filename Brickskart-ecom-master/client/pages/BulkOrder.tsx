import { useState } from "react";
import ConstructionBackground from "@/components/ConstructionBackground";

const BulkOrder = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !quantity || !location || !phone) {
      alert("Please fill in all fields");
      return;
    }

    alert("Bulk Order Request Submitted Successfully! 🏗️");

    setProduct("");
    setQuantity("");
    setLocation("");
    setPhone("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100 flex justify-center items-center py-10">

      {/* Construction animated background */}
      <ConstructionBackground />

      {/* Bulk Order Card */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-4">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#8B1E3F] mb-6">
          📦 Bulk Order
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Product */}
          <label className="font-semibold">
            Product
          </label>

          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Cement, Steel Rods, Bricks..."
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Quantity */}
          <label className="font-semibold">
            Quantity
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Delivery Location */}
          <label className="font-semibold">
            Delivery Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nagpur"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Phone */}
          <label className="font-semibold">
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-lg hover:bg-[#6F1832] transition"
          >
            Submit Bulk Order
          </button>

        </form>
      </div>
    </div>
  );
};

export default BulkOrder;
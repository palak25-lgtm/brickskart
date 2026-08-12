import { useState } from "react";
import ConstructionBackground from "@/components/ConstructionBackground";

const MaterialCalculator = () => {
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("");
  const [bricks, setBricks] = useState(0);
  const [cement, setCement] = useState(0);
  const [steel, setSteel] = useState(0);
  const [cost, setCost] = useState(0);

  const calculate = () => {
    const totalArea = Number(area) * Number(floors);

    setBricks(totalArea * 8);
    setCement(Math.ceil(totalArea / 10));
    setSteel(totalArea * 4);
    setCost(totalArea * 350);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Construction Background */}
      <ConstructionBackground />

      {/* Calculator Content */}
      <div className="relative z-10 min-h-screen flex justify-center items-center py-10">

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center text-[#8B1E3F] mb-6">
            🏗 Material Calculator
          </h1>

          <label className="font-semibold">
            Area (Square Feet)
          </label>

          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
            placeholder="Enter area"
          />

          <label className="font-semibold">
            Number of Floors
          </label>

          <input
            type="number"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
            placeholder="Enter floors"
          />

          <button
            onClick={calculate}
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-lg hover:bg-[#6F1832] transition"
          >
            Calculate
          </button>

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold mb-4">
              Estimated Materials
            </h2>

            <p>
              🧱 Bricks : {bricks}
            </p>

            <p>
              🏗 Cement Bags : {cement}
            </p>

            <p>
              🔩 Steel : {steel} kg
            </p>

            <p className="text-[#8B1E3F] font-bold text-lg mt-4">
              💰 Estimated Cost : ₹{cost}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MaterialCalculator;
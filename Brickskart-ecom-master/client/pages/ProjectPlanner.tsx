import { useState } from "react";
import ConstructionBackground from "@/components/ConstructionBackground";

const ProjectPlanner = () => {
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [floors, setFloors] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName || !location || !budget || !floors || !startDate) {
      alert("Please fill in all fields");
      return;
    }

    alert("Project Created Successfully! 🏗️");

    setProjectName("");
    setLocation("");
    setBudget("");
    setFloors("");
    setStartDate("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100 flex justify-center items-center py-10">

      {/* Construction animated background */}
      <ConstructionBackground />

      {/* Project Planner Card */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-4">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#8B1E3F] mb-6">
          🏗️ Project Planner
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Project Name */}
          <label className="font-semibold">
            Project Name
          </label>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Dream House"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Location */}
          <label className="font-semibold">
            Location
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nagpur"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Budget */}
          <label className="font-semibold">
            Budget (₹)
          </label>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="5000000"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Number of Floors */}
          <label className="font-semibold">
            Number of Floors
          </label>

          <input
            type="number"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            placeholder="2"
            min="1"
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Start Date */}
          <label className="font-semibold">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-[#D9A6B5] rounded-lg p-3 mt-2 mb-5 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-lg hover:bg-[#6F1832] transition"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProjectPlanner;
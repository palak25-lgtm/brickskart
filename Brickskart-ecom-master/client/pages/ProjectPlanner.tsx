import { useMemo, useState } from "react";
import {
  CheckCircle,
  Circle,
  Plus,
  Trash2,
} from "lucide-react";


const ProjectPlanner = () => {
  /* =========================
     PROJECT INFORMATION
  ========================= */

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] =
    useState("Residential House");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("1");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  /* =========================
     LOCATION BASED PLANNING
  ========================= */

  const locationPlanning: Record<
    string,
    {
      weather: string;
      transport: string;
      materials: string;
      tip: string;
    }
  > = {
    Nagpur: {
      weather:
        "Hot summers can affect outdoor construction work.",
      transport:
        "Plan material deliveries in advance to reduce transportation delays.",
      materials:
        "Check local availability of cement, steel, bricks and sand before bulk purchasing.",
      tip:
        "Avoid scheduling major outdoor work during extreme summer conditions.",
    },

    Mumbai: {
      weather:
        "Heavy monsoon conditions can affect excavation and outdoor work.",
      transport:
        "Plan deliveries carefully because traffic can increase transportation time.",
      materials:
        "Water-resistant and corrosion-resistant materials may be useful.",
      tip:
        "Plan major excavation and outdoor activities around the monsoon season.",
    },

    Pune: {
      weather:
        "Seasonal rainfall can affect outdoor construction activities.",
      transport:
        "Consider delivery distance and traffic when ordering bulk materials.",
      materials:
        "Compare local supplier prices before purchasing large quantities.",
      tip:
        "Keep materials protected from rain during storage.",
    },

    Delhi: {
      weather:
        "Hot summers and winter conditions can affect construction schedules.",
      transport:
        "Plan deliveries during suitable hours to avoid traffic delays.",
      materials:
        "Store cement and other moisture-sensitive materials properly.",
      tip:
        "Keep additional time in the schedule for weather-related delays.",
    },

    Hyderabad: {
      weather:
        "Hot and dry conditions may affect outdoor construction work.",
      transport:
        "Plan bulk material deliveries according to site accessibility.",
      materials:
        "Protect cement and other materials from moisture and heat.",
      tip:
        "Plan water availability properly during construction.",
    },

    Bengaluru: {
      weather:
        "Frequent rainfall can affect excavation and outdoor work.",
      transport:
        "Consider traffic and delivery timing when ordering materials.",
      materials:
        "Protect construction materials from rain during storage.",
      tip:
        "Include some extra time in the schedule for rainfall delays.",
    },

    Other: {
      weather:
        "Check the local seasonal weather conditions before construction.",
      transport:
        "Consider distance from suppliers when planning deliveries.",
      materials:
        "Check availability and prices from local suppliers.",
      tip:
        "Keep some additional time and budget for unexpected local conditions.",
    },
  };

  /* =========================
     CONSTRUCTION STAGES
  ========================= */

  const [stages, setStages] = useState([
    { name: "Planning & Design", completed: false },
    { name: "Site Preparation", completed: false },
    { name: "Foundation", completed: false },
    { name: "Structural Work", completed: false },
    { name: "Brick & Block Work", completed: false },
    { name: "Roofing", completed: false },
    { name: "Plumbing", completed: false },
    { name: "Electrical", completed: false },
    { name: "Flooring & Tiling", completed: false },
    { name: "Painting", completed: false },
    { name: "Doors & Windows", completed: false },
    { name: "Final Inspection", completed: false },
  ]);

  /* =========================
     MATERIALS
  ========================= */

  const [materials, setMaterials] = useState([
    {
      name: "Cement",
      quantity: 250,
      unit: "Bags",
      cost: 105000,
    },
    {
      name: "Steel",
      quantity: 2500,
      unit: "KG",
      cost: 175000,
    },
    {
      name: "Bricks",
      quantity: 10000,
      unit: "Pieces",
      cost: 85000,
    },
    {
      name: "Sand",
      quantity: 15,
      unit: "Tons",
      cost: 45000,
    },
    {
      name: "Tiles",
      quantity: 1500,
      unit: "Sq.ft",
      cost: 90000,
    },
  ]);

  /* =========================
     TASKS
  ========================= */

  const [tasks] = useState([
    "Finalize building design",
    "Calculate material requirements",
    "Purchase cement",
    "Purchase steel",
    "Complete foundation",
    "Complete brickwork",
    "Complete electrical work",
    "Complete plumbing",
    "Complete flooring",
    "Complete painting",
    "Final inspection",
  ]);

  const [completedTasks, setCompletedTasks] =
    useState<string[]>([]);

  /* =========================
     PROGRESS
  ========================= */

  const completedStages = stages.filter(
    (stage) => stage.completed
  ).length;

  const progress = Math.round(
    (completedStages / stages.length) * 100
  );

  /* =========================
     MATERIAL COST
  ========================= */

  const materialCost = useMemo(
    () =>
      materials.reduce(
        (total, material) =>
          total + material.cost,
        0
      ),
    [materials]
  );

  /* =========================
     TOGGLE STAGE
  ========================= */

  const toggleStage = (index: number) => {
    setStages((prev) =>
      prev.map((stage, i) =>
        i === index
          ? {
              ...stage,
              completed: !stage.completed,
            }
          : stage
      )
    );
  };

  /* =========================
     TOGGLE TASK
  ========================= */

  const toggleTask = (task: string) => {
    setCompletedTasks((prev) =>
      prev.includes(task)
        ? prev.filter((item) => item !== task)
        : [...prev, task]
    );
  };

  /* =========================
     DELETE MATERIAL
  ========================= */

  const deleteMaterial = (index: number) => {
    setMaterials((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =========================
     ADD MATERIAL
  ========================= */

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      {
        name: "New Material",
        quantity: 1,
        unit: "Unit",
        cost: 0,
      },
    ]);
  };

  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Project Planner
          </h1>

          <p className="text-gray-600 mt-2">
            Plan your construction project, materials,
            budget and tasks in one place.
          </p>

        </div>

        {/* =========================
            PROJECT INFORMATION
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Project Information
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* PROJECT NAME */}

            <div>
              <label className="text-sm font-semibold">
                Project Name
              </label>

              <input
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value)
                }
                placeholder="My House Project"
                className="w-full mt-2 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* PROJECT TYPE */}

            <div>
              <label className="text-sm font-semibold">
                Project Type
              </label>

              <select
                value={projectType}
                onChange={(e) =>
                  setProjectType(e.target.value)
                }
                className="w-full mt-2 border rounded-lg px-3 py-2"
              >
                <option>
                  Residential House
                </option>

                <option>
                  Commercial Building
                </option>

                <option>
                  Office
                </option>

                <option>
                  Shop
                </option>

                <option>
                  Warehouse
                </option>

                <option>
                  Renovation
                </option>
              </select>
            </div>

            {/* LOCATION */}

            <div>
              <label className="text-sm font-semibold">
                Project Location
              </label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full mt-2 border rounded-lg px-3 py-2"
              >
                <option value="">
                  Select Location
                </option>

                <option value="Nagpur">
                  Nagpur
                </option>

                <option value="Mumbai">
                  Mumbai
                </option>

                <option value="Pune">
                  Pune
                </option>

                <option value="Delhi">
                  Delhi
                </option>

                <option value="Hyderabad">
                  Hyderabad
                </option>

                <option value="Bengaluru">
                  Bengaluru
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* AREA */}

            <div>
              <label className="text-sm font-semibold">
                Area (sq.ft.)
              </label>

              <input
                type="number"
                value={area}
                onChange={(e) =>
                  setArea(e.target.value)
                }
                placeholder="1800"
                className="w-full mt-2 border rounded-lg px-3 py-2"
              />
            </div>

            {/* FLOORS */}

            <div>
              <label className="text-sm font-semibold">
                Number of Floors
              </label>

              <input
                type="number"
                value={floors}
                min="1"
                onChange={(e) =>
                  setFloors(e.target.value)
                }
                className="w-full mt-2 border rounded-lg px-3 py-2"
              />
            </div>

            {/* BUDGET */}

            <div>
              <label className="text-sm font-semibold">
                Total Budget
              </label>

              <input
                type="number"
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                placeholder="1500000"
                className="w-full mt-2 border rounded-lg px-3 py-2"
              />
            </div>

          </div>
        </div>

        {/* =========================
            LOCATION BASED PLANNING
        ========================= */}

        {location && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

            <div className="flex items-center gap-2 mb-2">

              <span className="text-2xl">
                📍
              </span>

              <h2 className="text-xl font-bold">
                Location Based Planning
              </h2>

            </div>

            <p className="text-gray-600 mb-5">
              Construction planning recommendations
              for{" "}
              <span className="font-bold text-[#8B1E3F]">
                {location}
              </span>
            </p>

            <div className="grid md:grid-cols-2 gap-4">

              {/* WEATHER */}

              <div className="bg-blue-50 rounded-xl p-5">

                <h3 className="font-bold mb-2">
                  🌦️ Weather Consideration
                </h3>

                <p className="text-sm text-gray-600">
                  {
                    locationPlanning[location]
                      ?.weather
                  }
                </p>

              </div>

              {/* TRANSPORT */}

              <div className="bg-orange-50 rounded-xl p-5">

                <h3 className="font-bold mb-2">
                  🚚 Transportation
                </h3>

                <p className="text-sm text-gray-600">
                  {
                    locationPlanning[location]
                      ?.transport
                  }
                </p>

              </div>

              {/* MATERIALS */}

              <div className="bg-green-50 rounded-xl p-5">

                <h3 className="font-bold mb-2">
                  🧱 Material Planning
                </h3>

                <p className="text-sm text-gray-600">
                  {
                    locationPlanning[location]
                      ?.materials
                  }
                </p>

              </div>

              {/* RECOMMENDATION */}

              <div className="bg-purple-50 rounded-xl p-5">

                <h3 className="font-bold mb-2">
                  📅 Planning Recommendation
                </h3>

                <p className="text-sm text-gray-600">
                  {
                    locationPlanning[location]
                      ?.tip
                  }
                </p>

              </div>

            </div>
          </div>
        )}

        {/* =========================
            PROJECT PROGRESS
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex justify-between mb-2">

            <h2 className="text-xl font-bold">
              Project Progress
            </h2>

            <span className="font-bold text-[#8B1E3F]">
              {progress}%
            </span>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className="bg-[#B22222] h-4 rounded-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* =========================
            CONSTRUCTION STAGES
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Construction Stages
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

            {stages.map(
              (stage, index) => (

                <button
                  key={stage.name}
                  onClick={() =>
                    toggleStage(index)
                  }
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition ${
                    stage.completed
                      ? "bg-green-50 border-green-300"
                      : "bg-gray-50 border-gray-200 hover:border-red-300"
                  }`}
                >

                  {stage.completed ? (
                    <CheckCircle
                      className="text-green-600"
                      size={22}
                    />
                  ) : (
                    <Circle
                      className="text-gray-400"
                      size={22}
                    />
                  )}

                  <span
                    className={
                      stage.completed
                        ? "line-through text-gray-500"
                        : "font-semibold"
                    }
                  >
                    {stage.name}
                  </span>

                </button>
              )
            )}

          </div>
        </div>

        {/* =========================
            MATERIAL PLANNING
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-bold">
              Material Planning
            </h2>

            <button
              onClick={addMaterial}
              className="flex items-center gap-2 bg-[#B22222] text-white px-4 py-2 rounded-lg hover:bg-[#8B1A1A]"
            >
              <Plus size={18} />
              Add Material
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="p-3">
                    Material
                  </th>

                  <th className="p-3">
                    Quantity
                  </th>

                  <th className="p-3">
                    Unit
                  </th>

                  <th className="p-3">
                    Estimated Cost
                  </th>

                  <th className="p-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {materials.map(
                  (material, index) => (

                    <tr
                      key={index}
                      className="border-b"
                    >

                      <td className="p-3 font-semibold">
                        {material.name}
                      </td>

                      <td className="p-3">
                        {material.quantity}
                      </td>

                      <td className="p-3">
                        {material.unit}
                      </td>

                      <td className="p-3">
                        ₹
                        {material.cost.toLocaleString()}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            deleteMaterial(index)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =========================
            BUDGET PLANNING
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Budget Planning
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {/* TOTAL */}

            <div className="bg-red-50 rounded-xl p-5">

              <p className="text-gray-600">
                Total Budget
              </p>

              <p className="text-2xl font-bold mt-2">
                ₹
                {Number(
                  budget || 0
                ).toLocaleString()}
              </p>

            </div>

            {/* MATERIAL */}

            <div className="bg-blue-50 rounded-xl p-5">

              <p className="text-gray-600">
                Material Cost
              </p>

              <p className="text-2xl font-bold mt-2">
                ₹
                {materialCost.toLocaleString()}
              </p>

            </div>

            {/* REMAINING */}

            <div className="bg-green-50 rounded-xl p-5">

              <p className="text-gray-600">
                Remaining
              </p>

              <p className="text-2xl font-bold mt-2">
                ₹
                {Math.max(
                  Number(budget || 0) -
                    materialCost,
                  0
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        {/* =========================
            TASK CHECKLIST
        ========================= */}

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Project Task Checklist
          </h2>

          <div className="space-y-3">

            {tasks.map((task) => {

              const completed =
                completedTasks.includes(
                  task
                );

              return (
                <button
                  key={task}
                  onClick={() =>
                    toggleTask(task)
                  }
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left"
                >

                  {completed ? (
                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />
                  ) : (
                    <Circle
                      size={20}
                      className="text-gray-400"
                    />
                  )}

                  <span
                    className={
                      completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {task}
                  </span>

                </button>
              );

            })}

          </div>

        </div>

        {/* =========================
            PROJECT SUMMARY
        ========================= */}

        <div className="bg-[#8B1E3F] text-white rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Project Summary
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* PROJECT */}

            <div>

              <p className="text-white/70">
                Project
              </p>

              <p className="font-bold">
                {projectName ||
                  "Not specified"}
              </p>

            </div>

            {/* TYPE */}

            <div>

              <p className="text-white/70">
                Type
              </p>

              <p className="font-bold">
                {projectType}
              </p>

            </div>

            {/* AREA */}

            <div>

              <p className="text-white/70">
                Area
              </p>

              <p className="font-bold">
                {area
                  ? `${area} sq.ft.`
                  : "Not specified"}
              </p>

            </div>

            {/* LOCATION */}

            <div>

              <p className="text-white/70">
                Location
              </p>

              <p className="font-bold">
                {location ||
                  "Not specified"}
              </p>

            </div>

            {/* FLOORS */}

            <div>

              <p className="text-white/70">
                Floors
              </p>

              <p className="font-bold">
                {floors}
              </p>

            </div>

          </div>

        </div>

      </div>
    
  );
};

export default ProjectPlanner;
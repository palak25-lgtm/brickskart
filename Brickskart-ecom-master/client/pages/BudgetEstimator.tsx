import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Building2,
  Home,
  IndianRupee,
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";

const BudgetEstimator = () => {
  const [projectType, setProjectType] = useState("Residential");
  const [area, setArea] = useState("");
  const [quality, setQuality] = useState("Standard");
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateBudget = () => {
    const areaValue = Number(area);

    if (!areaValue || areaValue <= 0) {
      alert("Please enter a valid area.");
      return;
    }

    // Approximate construction cost per sq.ft.
    let costPerSqFt = 1800;

    if (projectType === "Commercial") {
      costPerSqFt = 2200;
    }

    if (projectType === "Renovation") {
      costPerSqFt = 1200;
    }

    if (quality === "Premium") {
      costPerSqFt += 600;
    }

    if (quality === "Economy") {
      costPerSqFt -= 300;
    }

    const total = areaValue * costPerSqFt;

    setEstimate(total);
  };

  const resetEstimator = () => {
    setArea("");
    setProjectType("Residential");
    setQuality("Standard");
    setEstimate(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#291C0E] px-4 py-10">

      <div className="mx-auto max-w-6xl">

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-[#6E473B] hover:text-[#291C0E]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>


        {/* HEADER */}
        <div className="mb-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
            <Calculator size={32} />
          </div>

          <p className="mt-5 text-sm font-bold tracking-[0.25em] text-[#6E473B]">
            SMART CONSTRUCTION TOOL
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#291C0E] sm:text-5xl">
            Budget Estimator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#6E473B]">
            Get an approximate construction budget based on your project
            type, area and material quality.
          </p>

        </div>


        {/* MAIN CARD */}
        <div className="grid gap-8 lg:grid-cols-2">


          {/* LEFT - FORM */}
          <div className="rounded-3xl border border-[#D8C8B8] bg-white p-7 shadow-lg">

            <h2 className="text-2xl font-bold">
              Project Details
            </h2>

            <p className="mt-2 text-sm text-[#6E473B]">
              Enter your project information below.
            </p>


            {/* PROJECT TYPE */}
            <div className="mt-7">

              <label className="mb-2 block font-semibold">
                Project Type
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <button
                  type="button"
                  onClick={() => setProjectType("Residential")}
                  className={`rounded-xl border p-4 text-left transition ${
                    projectType === "Residential"
                      ? "border-[#6E473B] bg-[#6E473B] text-white"
                      : "border-[#D8C8B8] bg-[#F7F1E7]"
                  }`}
                >
                  <Home size={22} />

                  <div className="mt-2 font-bold">
                    Residential
                  </div>

                  <div className="mt-1 text-xs">
                    Home / House
                  </div>
                </button>


                <button
                  type="button"
                  onClick={() => setProjectType("Commercial")}
                  className={`rounded-xl border p-4 text-left transition ${
                    projectType === "Commercial"
                      ? "border-[#6E473B] bg-[#6E473B] text-white"
                      : "border-[#D8C8B8] bg-[#F7F1E7]"
                  }`}
                >
                  <Building2 size={22} />

                  <div className="mt-2 font-bold">
                    Commercial
                  </div>

                  <div className="mt-1 text-xs">
                    Shop / Office
                  </div>
                </button>


                <button
                  type="button"
                  onClick={() => setProjectType("Renovation")}
                  className={`rounded-xl border p-4 text-left transition ${
                    projectType === "Renovation"
                      ? "border-[#6E473B] bg-[#6E473B] text-white"
                      : "border-[#D8C8B8] bg-[#F7F1E7]"
                  }`}
                >
                  <RefreshCcw size={22} />

                  <div className="mt-2 font-bold">
                    Renovation
                  </div>

                  <div className="mt-1 text-xs">
                    Existing space
                  </div>
                </button>

              </div>

            </div>


            {/* AREA */}
            <div className="mt-7">

              <label className="mb-2 block font-semibold">
                Construction Area
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="1"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                  className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 pr-20 outline-none focus:border-[#6E473B] focus:ring-2 focus:ring-[#6E473B]/20"
                />

                <span className="absolute right-4 top-3 font-semibold text-[#6E473B]">
                  sq.ft
                </span>

              </div>

            </div>


            {/* QUALITY */}
            <div className="mt-7">

              <label className="mb-2 block font-semibold">
                Material Quality
              </label>

              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 outline-none focus:border-[#6E473B]"
              >
                <option value="Economy">
                  Economy
                </option>

                <option value="Standard">
                  Standard
                </option>

                <option value="Premium">
                  Premium
                </option>
              </select>

            </div>


            {/* BUTTONS */}
            <div className="mt-8 flex gap-3">

              <button
                onClick={calculateBudget}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3 font-bold text-[#F7F1E7] transition hover:bg-[#815547]"
              >
                <Calculator size={19} />
                Calculate Budget
              </button>

              <button
                onClick={resetEstimator}
                className="rounded-xl border-2 border-[#D8C8B8] px-5 py-3 font-bold text-[#6E473B] hover:bg-[#F7F1E7]"
              >
                Reset
              </button>

            </div>

          </div>


          {/* RIGHT - RESULT */}
          <div className="rounded-3xl bg-[#291C0E] p-7 text-[#F7F1E7] shadow-lg">

            <p className="text-sm font-bold tracking-[0.25em] text-[#C9A66B]">
              ESTIMATION RESULT
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Your Estimated Budget
            </h2>

            {estimate !== null ? (

              <div className="mt-10">

                <div className="rounded-2xl bg-[#3B291B] p-7">

                  <p className="text-sm text-[#CDBBAA]">
                    Approximate construction cost
                  </p>

                  <div className="mt-3 flex items-center gap-2">

                    <IndianRupee
                      size={30}
                      className="text-[#C9A66B]"
                    />

                    <span className="text-4xl font-black text-[#C9A66B]">
                      {estimate.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>


                {/* DETAILS */}
                <div className="mt-6 space-y-4">

                  <div className="flex justify-between border-b border-[#6E473B] pb-3">
                    <span className="text-[#CDBBAA]">
                      Project Type
                    </span>

                    <span className="font-bold">
                      {projectType}
                    </span>
                  </div>


                  <div className="flex justify-between border-b border-[#6E473B] pb-3">
                    <span className="text-[#CDBBAA]">
                      Area
                    </span>

                    <span className="font-bold">
                      {area} sq.ft
                    </span>
                  </div>


                  <div className="flex justify-between border-b border-[#6E473B] pb-3">
                    <span className="text-[#CDBBAA]">
                      Quality
                    </span>

                    <span className="font-bold">
                      {quality}
                    </span>
                  </div>

                </div>


                <p className="mt-7 text-sm leading-6 text-[#CDBBAA]">
                  This is an approximate estimate for planning purposes.
                  Actual costs may vary depending on material prices,
                  labour charges, location and project specifications.
                </p>

              </div>

            ) : (

              <div className="mt-10 rounded-2xl border border-[#6E473B] bg-[#3B291B] p-8 text-center">

                <Calculator
                  size={45}
                  className="mx-auto text-[#C9A66B]"
                />

                <h3 className="mt-5 text-xl font-bold">
                  Calculate Your Budget
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#CDBBAA]">
                  Enter your project details and click the calculate
                  button to see your estimated construction budget.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* INFORMATION */}
        <div className="mt-10 rounded-3xl border border-[#D8C8B8] bg-white p-7">

          <h2 className="text-2xl font-bold">
            How the Budget Estimator Works
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <div>
              <div className="font-bold text-[#6E473B]">
                01. Select Project
              </div>

              <p className="mt-2 text-sm text-[#6E473B]">
                Choose whether your project is residential,
                commercial or renovation.
              </p>
            </div>

            <div>
              <div className="font-bold text-[#6E473B]">
                02. Enter Area
              </div>

              <p className="mt-2 text-sm text-[#6E473B]">
                Enter the approximate construction area in square feet.
              </p>
            </div>

            <div>
              <div className="font-bold text-[#6E473B]">
                03. Get Estimate
              </div>

              <p className="mt-2 text-sm text-[#6E473B]">
                Get an approximate budget based on your selected options.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BudgetEstimator;
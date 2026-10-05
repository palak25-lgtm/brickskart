import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Circle,
  Calendar,
  Package,
  TrendingUp,
} from "lucide-react";

const ProjectProgress = () => {
  const [stages, setStages] = useState([
    { name: "Foundation", progress: 100 },
    { name: "Structure", progress: 70 },
    { name: "Brickwork", progress: 40 },
    { name: "Plumbing", progress: 20 },
    { name: "Electrical", progress: 10 },
    { name: "Finishing", progress: 0 },
  ]);

  const materials = [
    { name: "Cement", status: "Delivered" },
    { name: "Steel Rods", status: "Delivered" },
    { name: "Bricks", status: "In Transit" },
    { name: "Tiles", status: "Pending" },
  ];

  const overallProgress = Math.round(
    stages.reduce((sum, stage) => sum + stage.progress, 0) /
      stages.length
  );

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#291C0E] px-4 py-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-bold tracking-[0.25em] text-[#6E473B]">
            PROJECT MANAGEMENT
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Project Progress Dashboard
          </h1>

          <p className="mt-3 text-[#6E473B]">
            Monitor your construction project, stages, materials and
            completion progress from one place.
          </p>

        </div>


        {/* PROJECT OVERVIEW */}

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-[#D8C8B8] bg-white p-6 shadow-sm">

            <Calendar className="text-[#6E473B]" size={28} />

            <p className="mt-4 text-sm text-[#6E473B]">
              Project
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Residential Building
            </h2>

          </div>


          <div className="rounded-2xl border border-[#D8C8B8] bg-white p-6 shadow-sm">

            <TrendingUp className="text-[#C9A66B]" size={28} />

            <p className="mt-4 text-sm text-[#6E473B]">
              Overall Progress
            </p>

            <h2 className="mt-1 text-3xl font-black">
              {overallProgress}%
            </h2>

          </div>


          <div className="rounded-2xl border border-[#D8C8B8] bg-white p-6 shadow-sm">

            <CheckCircle className="text-green-700" size={28} />

            <p className="mt-4 text-sm text-[#6E473B]">
              Completed Stages
            </p>

            <h2 className="mt-1 text-3xl font-black">
              {stages.filter((s) => s.progress === 100).length}
            </h2>

          </div>


          <div className="rounded-2xl border border-[#D8C8B8] bg-white p-6 shadow-sm">

            <Clock className="text-[#A78D78]" size={28} />

            <p className="mt-4 text-sm text-[#6E473B]">
              Pending Stages
            </p>

            <h2 className="mt-1 text-3xl font-black">
              {stages.filter((s) => s.progress < 100).length}
            </h2>

          </div>

        </div>


        {/* OVERALL PROGRESS */}

        <div className="mt-8 rounded-3xl bg-[#291C0E] p-7 text-[#F7F1E7] shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Overall Project Progress
              </h2>

              <p className="mt-1 text-[#CDBBAA]">
                Current construction completion
              </p>
            </div>

            <span className="text-3xl font-black text-[#C9A66B]">
              {overallProgress}%
            </span>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#4B3328]">

            <div
              className="h-full rounded-full bg-[#C9A66B] transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />

          </div>

        </div>


        {/* CONSTRUCTION STAGES */}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-[#D8C8B8] bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold">
              Construction Stages
            </h2>

            <p className="mt-2 text-[#6E473B]">
              Track the progress of every construction stage.
            </p>


            <div className="mt-7 space-y-6">

              {stages.map((stage, index) => (

                <div key={stage.name}>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      {stage.progress === 100 ? (
                        <CheckCircle
                          size={22}
                          className="text-green-700"
                        />
                      ) : stage.progress > 0 ? (
                        <Clock
                          size={22}
                          className="text-[#C9A66B]"
                        />
                      ) : (
                        <Circle
                          size={22}
                          className="text-[#A78D78]"
                        />
                      )}

                      <span className="font-bold">
                        {stage.name}
                      </span>

                    </div>

                    <span className="font-bold text-[#6E473B]">
                      {stage.progress}%
                    </span>

                  </div>


                  <div className="mt-2 h-3 rounded-full bg-[#E1D4C2]">

                    <div
                      className="h-full rounded-full bg-[#6E473B] transition-all"
                      style={{
                        width: `${stage.progress}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* MATERIAL STATUS */}

          <div className="rounded-3xl border border-[#D8C8B8] bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6E473B] text-[#F7F1E7]">

                <Package size={25} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Material Status
                </h2>

                <p className="text-sm text-[#6E473B]">
                  Track materials required for your project.
                </p>

              </div>

            </div>


            <div className="mt-7 space-y-4">

              {materials.map((material) => (

                <div
                  key={material.name}
                  className="flex items-center justify-between rounded-xl border border-[#E1D4C2] bg-[#F7F1E7] p-4"
                >

                  <span className="font-bold">
                    {material.name}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      material.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : material.status === "In Transit"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-[#E1D4C2] text-[#6E473B]"
                    }`}
                  >
                    {material.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* TIMELINE */}

        <div className="mt-8 rounded-3xl bg-[#6E473B] p-7 text-[#F7F1E7] shadow-lg">

          <h2 className="text-2xl font-bold">
            Project Timeline
          </h2>

          <p className="mt-2 text-[#E1D4C2]">
            Keep track of important project dates.
          </p>


          <div className="mt-7 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-[#291C0E]/40 p-5">

              <p className="text-sm text-[#CDBBAA]">
                Project Started
              </p>

              <p className="mt-2 text-xl font-bold">
                01 August 2026
              </p>

            </div>


            <div className="rounded-2xl bg-[#291C0E]/40 p-5">

              <p className="text-sm text-[#CDBBAA]">
                Current Phase
              </p>

              <p className="mt-2 text-xl font-bold">
                Structure
              </p>

            </div>


            <div className="rounded-2xl bg-[#291C0E]/40 p-5">

              <p className="text-sm text-[#CDBBAA]">
                Expected Completion
              </p>

              <p className="mt-2 text-xl font-bold">
                30 December 2026
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectProgress;
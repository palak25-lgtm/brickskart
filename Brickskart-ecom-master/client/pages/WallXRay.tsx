import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Zap,
    Droplets,
    BrickWall,
    Wrench,
} from "lucide-react";

const WallXRay = () => {
    const [xray, setXray] = useState(false);
    const [selected, setSelected] = useState("wall");
    const [showWiring, setShowWiring] = useState(true);
    const [showPipes, setShowPipes] = useState(true);
    const [showStructure, setShowStructure] = useState(true);
    const [scanning, setScanning] = useState(false);

    const layers = {
        wall: {
            title: "Brick Wall",
            description:
                "The brick wall provides strength, protection and separation between spaces.",
            icon: BrickWall,
        },
        electrical: {
            title: "Electrical Wiring",
            description:
                "Electrical cables are routed through conduits inside the wall.",
            icon: Zap,
        },
        plumbing: {
            title: "Water Pipes",
            description:
                "Water pipes carry water to bathrooms, kitchens and other fixtures.",
            icon: Droplets,
        },
        structure: {
            title: "Wall Structure",
            description:
                "The wall structure provides strength and support to the building.",
            icon: Wrench,
        },
    };

    const currentLayer = layers[selected as keyof typeof layers];
    const CurrentIcon = currentLayer.icon;

    return (
        <div className="min-h-screen bg-[#F7F1E7] text-[#291C0E]">

            {/* TOP BAR */}

            <div className="bg-[#291C0E] px-6 py-5 text-[#F7F1E7]">

                <div className="mx-auto flex max-w-7xl items-center justify-between">

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-bold hover:text-[#C9A66B]"
                    >
                        <ArrowLeft size={18} />
                        Back to BricksKart
                    </Link>

                    <h1 className="text-xl font-black">
                        BUILDING LAB
                    </h1>

                </div>

            </div>


            {/* TITLE */}

            <section className="mx-auto max-w-7xl px-4 py-12">

                <div className="text-center">

                    <p className="text-sm font-bold tracking-[0.3em] text-[#6E473B]">
                        BRICKSKART BUILDING LAB
                    </p>

                    <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                        See Inside the Wall
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-[#6E473B]">
                        Explore what is hidden inside a building wall.
                        Switch to X-Ray mode and discover its different layers.
                    </p>

                </div>


                {/* MAIN EXPERIENCE */}

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">


                    {/* WALL AREA */}

                    <div className="relative min-h-[550px] overflow-hidden rounded-[35px] bg-[#291C0E] p-8 shadow-2xl">

                        <div className="absolute right-6 top-6">

                            <button
                                onClick={() => setXray(!xray)}
                                className="rounded-xl bg-[#C9A66B] px-5 py-3 font-bold text-[#291C0E] shadow-lg transition hover:scale-105"
                            >
                                {xray ? "👁 Normal View" : "🔍 X-Ray View"}
                            </button>

                        </div>


                        {/* WALL */}

                        <div className="flex h-full min-h-[480px] items-center justify-center">

                            <div
                                className={`
                  relative h-[420px] w-[300px]
                  rounded-2xl border-8
                  transition-all duration-700
                  ${xray
                                        ? "border-[#C9A66B] bg-[#A78D78]/20"
                                        : "border-[#6E473B] bg-[#8B5E4A]"
                                    }
                `}
                            >

                                {/* BRICKS */}

                                <div
                                    className={`
                    absolute inset-4 grid grid-cols-3 gap-2 transition-opacity duration-700
                    ${xray ? "opacity-30" : "opacity-100"}
                  `}
                                >

                                    {Array.from({ length: 27 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="rounded-md border border-[#6E473B] bg-[#A66A52]"
                                        />
                                    ))}

                                </div>


                                {/* ELECTRICAL WIRING */}

                                <button
                                    onClick={() => setSelected("electrical")}
                                    className={`
                    absolute left-10 top-10 h-[330px] w-2 rounded-full
                    transition-all duration-700
                    $xray && showWiring
  ? "bg-yellow-300 opacity-100 shadow-[0_0_20px_rgba(250,204,21,0.9)]"
  : "opacity-0"
                  `}
                                />


                                {/* WATER PIPE */}

                                <button
                                    onClick={() => setSelected("plumbing")}
                                    className={`
                    absolute right-12 top-12 h-[300px] w-8 rounded-full
                    border-4 border-blue-300
                    transition-all duration-700
                    $xray && showPipes
  ? "opacity-100"
  : "opacity-0"
                  `}
                                />


                                {/* STRUCTURE */}

                                <button
                                    onClick={() => setSelected("structure")}
                                    className={`
                    absolute bottom-10 left-12 h-4 w-[200px]
                    rounded-full bg-gray-400
                    transition-all duration-700
                    $xray && showStructure
  ? "opacity-100"
  : "opacity-0"
                  `}
                                />

                            </div>

                        </div>

                    </div>


                    {/* INFORMATION PANEL */}

                    <div className="rounded-[30px] border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-lg">

                        <p className="text-sm font-bold tracking-[0.2em] text-[#6E473B]">
                            EXPLORE LAYERS
                        </p>

                        <h3 className="mt-3 text-2xl font-black">
                            What's inside?
                        </h3>

                        <div className="mt-6 space-y-2">

                            <button
                                onClick={() => setShowWiring(!showWiring)}
                                className="flex w-full items-center justify-between rounded-xl border border-[#D8C8B8] p-3 text-left"
                            >
                                <span>⚡ Electrical Wiring</span>

                                <span>
                                    {showWiring ? "ON" : "OFF"}
                                </span>
                            </button>

                            <button
                                onClick={() => setShowPipes(!showPipes)}
                                className="flex w-full items-center justify-between rounded-xl border border-[#D8C8B8] p-3 text-left"
                            >
                                <span>🚰 Water Pipes</span>

                                <span>
                                    {showPipes ? "ON" : "OFF"}
                                </span>
                            </button>

                            <button
                                onClick={() => setShowStructure(!showStructure)}
                                className="flex w-full items-center justify-between rounded-xl border border-[#D8C8B8] p-3 text-left"
                            >
                                <span>🔩 Structure</span>

                                <span>
                                    {showStructure ? "ON" : "OFF"}
                                </span>
                            </button>

                        </div>


                        <div className="mt-6 space-y-3">

                            <button
                                onClick={() => setSelected("wall")}
                                className="w-full rounded-xl border border-[#D8C8B8] p-4 text-left font-bold transition hover:border-[#C9A66B]"
                            >
                                🧱 Brick Wall
                            </button>

                            <button
                                onClick={() => setSelected("electrical")}
                                className="w-full rounded-xl border border-[#D8C8B8] p-4 text-left font-bold transition hover:border-[#C9A66B]"
                            >
                                ⚡ Electrical Wiring
                            </button>

                            <button
                                onClick={() => setSelected("plumbing")}
                                className="w-full rounded-xl border border-[#D8C8B8] p-4 text-left font-bold transition hover:border-[#C9A66B]"
                            >
                                🚰 Water Pipes
                            </button>

                            <button
                                onClick={() => setSelected("structure")}
                                className="w-full rounded-xl border border-[#D8C8B8] p-4 text-left font-bold transition hover:border-[#C9A66B]"
                            >
                                🔩 Wall Structure
                            </button>

                        </div>


                        {/* DETAILS */}

                        <div className="mt-8 rounded-2xl bg-[#291C0E] p-6 text-[#F7F1E7]">

                            <CurrentIcon
                                size={30}
                                className="text-[#C9A66B]"
                            />

                            <h4 className="mt-4 text-xl font-black">
                                {currentLayer.title}
                            </h4>

                            <p className="mt-3 text-sm leading-6 text-[#CDBBAA]">
                                {currentLayer.description}
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default WallXRay;
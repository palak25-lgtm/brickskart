import { useState } from "react";
import { Link } from "react-router-dom";

type CalculatorType =
  | "concrete"
  | "brick"
  | "mortar"
  | "plaster"
  | "paint"
  | "tile"
  | "steel";

const MaterialCalculator = () => {
  const [calculator, setCalculator] =
    useState<CalculatorType>("concrete");

  /* ---------------- CONCRETE ---------------- */

  const [concreteLength, setConcreteLength] = useState("");
  const [concreteWidth, setConcreteWidth] = useState("");
  const [concreteDepth, setConcreteDepth] = useState("");
  const [concreteRatio, setConcreteRatio] = useState("1:2:4");
  const [cementPrice, setCementPrice] = useState("400");
  const [sandPrice, setSandPrice] = useState("1800");
  const [aggregatePrice, setAggregatePrice] = useState("1600");

  /* ---------------- BRICK ---------------- */

  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [wallThickness, setWallThickness] = useState("0.115");
  const [brickLength, setBrickLength] = useState("0.19");
  const [brickWidth, setBrickWidth] = useState("0.09");
  const [brickHeight, setBrickHeight] = useState("0.09");
  const [brickPrice, setBrickPrice] = useState("10");

  /* ---------------- MORTAR ---------------- */

  const [mortarLength, setMortarLength] = useState("");
  const [mortarWidth, setMortarWidth] = useState("");
  const [mortarDepth, setMortarDepth] = useState("");
  const [mortarRatio, setMortarRatio] = useState("1:6");

  /* ---------------- PLASTER ---------------- */

  const [plasterLength, setPlasterLength] = useState("");
  const [plasterHeight, setPlasterHeight] = useState("");
  const [plasterThickness, setPlasterThickness] = useState("0.012");
  const [plasterRatio, setPlasterRatio] = useState("1:6");

  /* ---------------- PAINT ---------------- */

  const [paintLength, setPaintLength] = useState("");
  const [paintHeight, setPaintHeight] = useState("");
  const [paintCoats, setPaintCoats] = useState("2");
  const [paintCoverage, setPaintCoverage] = useState("10");
  const [paintPrice, setPaintPrice] = useState("250");

  /* ---------------- TILE ---------------- */

  const [floorLength, setFloorLength] = useState("");
  const [floorWidth, setFloorWidth] = useState("");
  const [tileLength, setTileLength] = useState("0.6");
  const [tileWidth, setTileWidth] = useState("0.6");
  const [tilePrice, setTilePrice] = useState("800");

  /* ---------------- STEEL ---------------- */

  const [steelDiameter, setSteelDiameter] = useState("12");
  const [steelLength, setSteelLength] = useState("");
  const [steelQuantity, setSteelQuantity] = useState("1");
  const [steelPrice, setSteelPrice] = useState("65");

  /* ============================================================
     HELPERS
  ============================================================ */

  const number = (value: string) => {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  };

  const calculateRatio = (ratio: string) => {
    const values = ratio.split(":").map(Number);

    if (values.length !== 3 || values.some(isNaN)) {
      return [1, 2, 4];
    }

    return values;
  };

  /* ============================================================
     CONCRETE CALCULATION
  ============================================================ */

  const concreteVolume =
    number(concreteLength) *
    number(concreteWidth) *
    number(concreteDepth);

  const concreteRatioValues =
    concreteRatio === "1:2:4"
      ? [1, 2, 4]
      : concreteRatio === "1:1.5:3"
      ? [1, 1.5, 3]
      : [1, 3, 6];

  const concreteTotalRatio = concreteRatioValues.reduce(
    (a, b) => a + b,
    0
  );

  const dryConcreteVolume = concreteVolume * 1.54;

  const concreteCementVolume =
    concreteTotalRatio > 0
      ? (dryConcreteVolume * concreteRatioValues[0]) /
        concreteTotalRatio
      : 0;

  const concreteSandVolume =
    concreteTotalRatio > 0
      ? (dryConcreteVolume * concreteRatioValues[1]) /
        concreteTotalRatio
      : 0;

  const concreteAggregateVolume =
    concreteTotalRatio > 0
      ? (dryConcreteVolume * concreteRatioValues[2]) /
        concreteTotalRatio
      : 0;

  const cementBags = concreteCementVolume / 0.0347;

  const concreteCost =
    cementBags * number(cementPrice) +
    concreteSandVolume * number(sandPrice) +
    concreteAggregateVolume * number(aggregatePrice);

  /* ============================================================
     BRICK CALCULATION
  ============================================================ */

  const wallVolume =
    number(wallLength) *
    number(wallHeight) *
    number(wallThickness);

  const brickVolume =
    number(brickLength) *
    number(brickWidth) *
    number(brickHeight);

  const bricksRequired =
    brickVolume > 0 ? Math.ceil(wallVolume / brickVolume * 1.1) : 0;

  const brickCost = bricksRequired * number(brickPrice);

  /* ============================================================
     MORTAR CALCULATION
  ============================================================ */

  const mortarVolume =
    number(mortarLength) *
    number(mortarWidth) *
    number(mortarDepth);

  const mortarRatioValues = calculateRatio(
    mortarRatio + ":0"
  );

  const mortarDryVolume = mortarVolume * 1.33;

  const mortarCementPart =
    mortarRatio === "1:4"
      ? 1
      : mortarRatio === "1:5"
      ? 1
      : 1;

  const mortarSandPart =
    mortarRatio === "1:4"
      ? 4
      : mortarRatio === "1:5"
      ? 5
      : 6;

  const mortarTotal =
    mortarCementPart + mortarSandPart;

  const mortarCementVolume =
    mortarTotal > 0
      ? (mortarDryVolume * mortarCementPart) / mortarTotal
      : 0;

  const mortarSandVolume =
    mortarTotal > 0
      ? (mortarDryVolume * mortarSandPart) / mortarTotal
      : 0;

  const mortarCementBags =
    mortarCementVolume / 0.0347;

  /* ============================================================
     PLASTER CALCULATION
  ============================================================ */

  const plasterArea =
    number(plasterLength) *
    number(plasterHeight);

  const plasterWetVolume =
    plasterArea * number(plasterThickness);

  const plasterDryVolume =
    plasterWetVolume * 1.33;

  const plasterCementPart =
    plasterRatio === "1:4" ? 1 : 1;

  const plasterSandPart =
    plasterRatio === "1:4" ? 4 : 6;

  const plasterTotal =
    plasterCementPart + plasterSandPart;

  const plasterCementVolume =
    plasterTotal > 0
      ? plasterDryVolume *
        (plasterCementPart / plasterTotal)
      : 0;

  const plasterSandVolume =
    plasterTotal > 0
      ? plasterDryVolume *
        (plasterSandPart / plasterTotal)
      : 0;

  const plasterCementBags =
    plasterCementVolume / 0.0347;

  /* ============================================================
     PAINT CALCULATION
  ============================================================ */

  const paintArea =
    number(paintLength) *
    number(paintHeight);

  const paintLitres =
    number(paintCoverage) > 0
      ? (paintArea * number(paintCoats)) /
        number(paintCoverage)
      : 0;

  const paintCost =
    paintLitres * number(paintPrice);

  /* ============================================================
     TILE CALCULATION
  ============================================================ */

  const floorArea =
    number(floorLength) *
    number(floorWidth);

  const tileArea =
    number(tileLength) *
    number(tileWidth);

  const tilesRequired =
    tileArea > 0
      ? Math.ceil(floorArea / tileArea * 1.1)
      : 0;

  const tileCost =
    floorArea *
    number(tilePrice);

  /* ============================================================
     STEEL CALCULATION
  ============================================================ */

  const steelWeightPerMeter =
    number(steelDiameter) *
    number(steelDiameter) /
    162;

  const steelTotalWeight =
    steelWeightPerMeter *
    number(steelLength) *
    number(steelQuantity);

  const steelCost =
    steelTotalWeight *
    number(steelPrice);

  /* ============================================================
     RESET
  ============================================================ */

  const resetCalculator = () => {
    setConcreteLength("");
    setConcreteWidth("");
    setConcreteDepth("");

    setWallLength("");
    setWallHeight("");

    setMortarLength("");
    setMortarWidth("");
    setMortarDepth("");

    setPlasterLength("");
    setPlasterHeight("");

    setPaintLength("");
    setPaintHeight("");

    setFloorLength("");
    setFloorWidth("");

    setSteelLength("");
  };

  /* ============================================================
     INPUT COMPONENT
  ============================================================ */

  const Input = ({
    label,
    value,
    onChange,
    placeholder,
    unit,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    unit?: string;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-[#4A3428] mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter value"}
          className="w-full rounded-xl border border-[#D8C5B7] bg-[#FFFDF8] px-4 py-3 pr-16 text-[#35231B] outline-none transition focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/20"
        />

        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#92745F]">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  /* ============================================================
     RESULT CARD
  ============================================================ */

  const Result = ({
    title,
    value,
    unit,
  }: {
    title: string;
    value: string | number;
    unit?: string;
  }) => (
    <div className="rounded-xl bg-[#F4ECE3] border border-[#D9C4B4] p-4">
      <p className="text-xs uppercase tracking-wide text-[#8B6A57]">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-[#4A3428]">
        {value}
        {unit && (
          <span className="ml-1 text-sm font-medium text-[#8B6A57]">
            {unit}
          </span>
        )}
      </p>
    </div>
  );

  /* ============================================================
     CALCULATOR BUTTONS
  ============================================================ */

  const calculatorButtons = [
    {
      id: "concrete",
      icon: "🏗️",
      title: "Concrete",
      description: "Cement, sand & aggregate",
    },
    {
      id: "brick",
      icon: "🧱",
      title: "Bricks",
      description: "Estimate bricks required",
    },
    {
      id: "mortar",
      icon: "⚒️",
      title: "Mortar",
      description: "Cement & sand quantity",
    },
    {
      id: "plaster",
      icon: "🪣",
      title: "Plaster",
      description: "Wall plaster calculation",
    },
    {
      id: "paint",
      icon: "🎨",
      title: "Paint",
      description: "Paint quantity & cost",
    },
    {
      id: "tile",
      icon: "⬜",
      title: "Tiles",
      description: "Tiles & flooring estimate",
    },
    {
      id: "steel",
      icon: "🔩",
      title: "Steel",
      description: "Rod weight calculation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#35231B]">

      {/* HEADER */}

      <div className="bg-[#21160F] text-[#F8F1E7]">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="font-bold text-xl hover:text-[#C9A66B] transition"
          >
            BricksKart
          </Link>

          <Link
            to="/shop"
            className="rounded-lg border border-[#C9A66B] px-4 py-2 text-sm hover:bg-[#C9A66B] hover:text-[#21160F] transition"
          >
            Shop Materials
          </Link>

        </div>

      </div>

      {/* PAGE HEADER */}

      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#A77A4A]">
            Construction Tools
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-black text-[#35231B]">
            Material Calculator
          </h1>

          <p className="mt-4 text-lg text-[#725D4E]">
            Calculate construction material quantities before
            purchasing. Estimate cement, sand, aggregate, bricks,
            plaster, paint, tiles and steel.
          </p>

        </div>

      </section>

      {/* CALCULATOR TYPES */}

      <section className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

          {calculatorButtons.map((item) => (

            <button
              key={item.id}
              onClick={() =>
                setCalculator(item.id as CalculatorType)
              }
              className={`text-left rounded-2xl border p-4 transition-all ${
                calculator === item.id
                  ? "bg-[#722F37] text-white border-[#722F37] shadow-lg -translate-y-1"
                  : "bg-white border-[#DCCBC0] hover:border-[#A77A4A] hover:-translate-y-1"
              }`}
            >

              <div className="text-2xl">
                {item.icon}
              </div>

              <h3 className="mt-3 font-bold">
                {item.title}
              </h3>

              <p
                className={`mt-1 text-xs ${
                  calculator === item.id
                    ? "text-white/75"
                    : "text-[#8B7565]"
                }`}
              >
                {item.description}
              </p>

            </button>

          ))}

        </div>

      </section>

      {/* MAIN CALCULATOR */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* FORM */}

          <div className="bg-white rounded-3xl border border-[#DDCEC3] shadow-sm p-6 md:p-8">

            {/* CONCRETE */}

            {calculator === "concrete" && (
              <>
                <div className="mb-7">

                  <h2 className="text-2xl font-bold text-[#4A3428]">
                    Concrete Calculator
                  </h2>

                  <p className="text-sm text-[#8B7565] mt-1">
                    Calculate approximate cement bags, sand and
                    aggregate required for concrete work.
                  </p>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  <Input
                    label="Length"
                    value={concreteLength}
                    onChange={setConcreteLength}
                    unit="m"
                  />

                  <Input
                    label="Width"
                    value={concreteWidth}
                    onChange={setConcreteWidth}
                    unit="m"
                  />

                  <Input
                    label="Depth"
                    value={concreteDepth}
                    onChange={setConcreteDepth}
                    unit="m"
                  />

                </div>

                <div className="mt-6">

                  <label className="block text-sm font-semibold text-[#4A3428] mb-2">
                    Concrete Mix Ratio
                  </label>

                  <select
                    value={concreteRatio}
                    onChange={(e) =>
                      setConcreteRatio(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#D8C5B7] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#722F37]"
                  >
                    <option value="1:1.5:3">
                      1 : 1.5 : 3 — M20
                    </option>

                    <option value="1:2:4">
                      1 : 2 : 4 — M15
                    </option>

                    <option value="1:3:6">
                      1 : 3 : 6 — Lean Concrete
                    </option>

                  </select>

                </div>

                <div className="mt-8 border-t border-[#E8DDD5] pt-6">

                  <h3 className="font-bold text-[#4A3428] mb-4">
                    Material Prices
                  </h3>

                  <div className="grid md:grid-cols-3 gap-5">

                    <Input
                      label="Cement Price"
                      value={cementPrice}
                      onChange={setCementPrice}
                      unit="₹/bag"
                    />

                    <Input
                      label="Sand Price"
                      value={sandPrice}
                      onChange={setSandPrice}
                      unit="₹/m³"
                    />

                    <Input
                      label="Aggregate Price"
                      value={aggregatePrice}
                      onChange={setAggregatePrice}
                      unit="₹/m³"
                    />

                  </div>

                </div>
              </>
            )}

            {/* BRICK */}

            {calculator === "brick" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Brick Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Estimate the number of bricks required for a wall.
                </p>

                <div className="grid md:grid-cols-3 gap-5">

                  <Input
                    label="Wall Length"
                    value={wallLength}
                    onChange={setWallLength}
                    unit="m"
                  />

                  <Input
                    label="Wall Height"
                    value={wallHeight}
                    onChange={setWallHeight}
                    unit="m"
                  />

                  <Input
                    label="Wall Thickness"
                    value={wallThickness}
                    onChange={setWallThickness}
                    unit="m"
                  />

                  <Input
                    label="Brick Length"
                    value={brickLength}
                    onChange={setBrickLength}
                    unit="m"
                  />

                  <Input
                    label="Brick Width"
                    value={brickWidth}
                    onChange={setBrickWidth}
                    unit="m"
                  />

                  <Input
                    label="Brick Height"
                    value={brickHeight}
                    onChange={setBrickHeight}
                    unit="m"
                  />

                  <Input
                    label="Price per Brick"
                    value={brickPrice}
                    onChange={setBrickPrice}
                    unit="₹"
                  />

                </div>
              </>
            )}

            {/* MORTAR */}

            {calculator === "mortar" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Cement Mortar Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Calculate cement and sand required for mortar.
                </p>

                <div className="grid md:grid-cols-3 gap-5">

                  <Input
                    label="Length"
                    value={mortarLength}
                    onChange={setMortarLength}
                    unit="m"
                  />

                  <Input
                    label="Width"
                    value={mortarWidth}
                    onChange={setMortarWidth}
                    unit="m"
                  />

                  <Input
                    label="Thickness"
                    value={mortarDepth}
                    onChange={setMortarDepth}
                    unit="m"
                  />

                </div>

                <div className="mt-6">

                  <label className="block text-sm font-semibold mb-2">
                    Mortar Ratio
                  </label>

                  <select
                    value={mortarRatio}
                    onChange={(e) =>
                      setMortarRatio(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#D8C5B7] px-4 py-3 bg-[#FFFDF8]"
                  >
                    <option value="1:4">1 : 4</option>
                    <option value="1:5">1 : 5</option>
                    <option value="1:6">1 : 6</option>
                  </select>

                </div>
              </>
            )}

            {/* PLASTER */}

            {calculator === "plaster" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Plaster Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Estimate cement and sand required for wall plastering.
                </p>

                <div className="grid md:grid-cols-3 gap-5">

                  <Input
                    label="Wall Length"
                    value={plasterLength}
                    onChange={setPlasterLength}
                    unit="m"
                  />

                  <Input
                    label="Wall Height"
                    value={plasterHeight}
                    onChange={setPlasterHeight}
                    unit="m"
                  />

                  <Input
                    label="Plaster Thickness"
                    value={plasterThickness}
                    onChange={setPlasterThickness}
                    unit="m"
                  />

                </div>

                <div className="mt-6">

                  <label className="block text-sm font-semibold mb-2">
                    Plaster Ratio
                  </label>

                  <select
                    value={plasterRatio}
                    onChange={(e) =>
                      setPlasterRatio(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#D8C5B7] px-4 py-3 bg-[#FFFDF8]"
                  >
                    <option value="1:6">
                      1 : 6
                    </option>

                    <option value="1:4">
                      1 : 4
                    </option>

                  </select>

                </div>
              </>
            )}

            {/* PAINT */}

            {calculator === "paint" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Paint Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Calculate approximate paint quantity based on
                  wall area, coverage and coats.
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    label="Wall Length"
                    value={paintLength}
                    onChange={setPaintLength}
                    unit="m"
                  />

                  <Input
                    label="Wall Height"
                    value={paintHeight}
                    onChange={setPaintHeight}
                    unit="m"
                  />

                  <Input
                    label="Number of Coats"
                    value={paintCoats}
                    onChange={setPaintCoats}
                    unit="coats"
                  />

                  <Input
                    label="Coverage per Litre"
                    value={paintCoverage}
                    onChange={setPaintCoverage}
                    unit="m²/L"
                  />

                  <Input
                    label="Paint Price"
                    value={paintPrice}
                    onChange={setPaintPrice}
                    unit="₹/L"
                  />

                </div>
              </>
            )}

            {/* TILE */}

            {calculator === "tile" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Tile Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Calculate approximate tile quantity for flooring.
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    label="Floor Length"
                    value={floorLength}
                    onChange={setFloorLength}
                    unit="m"
                  />

                  <Input
                    label="Floor Width"
                    value={floorWidth}
                    onChange={setFloorWidth}
                    unit="m"
                  />

                  <Input
                    label="Tile Length"
                    value={tileLength}
                    onChange={setTileLength}
                    unit="m"
                  />

                  <Input
                    label="Tile Width"
                    value={tileWidth}
                    onChange={setTileWidth}
                    unit="m"
                  />

                  <Input
                    label="Tile Price"
                    value={tilePrice}
                    onChange={setTilePrice}
                    unit="₹/m²"
                  />

                </div>
              </>
            )}

            {/* STEEL */}

            {calculator === "steel" && (
              <>
                <h2 className="text-2xl font-bold text-[#4A3428]">
                  Steel Weight Calculator
                </h2>

                <p className="text-sm text-[#8B7565] mt-1 mb-7">
                  Estimate steel rod weight using the standard
                  d²/162 formula.
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    label="Rod Diameter"
                    value={steelDiameter}
                    onChange={setSteelDiameter}
                    unit="mm"
                  />

                  <Input
                    label="Rod Length"
                    value={steelLength}
                    onChange={setSteelLength}
                    unit="m"
                  />

                  <Input
                    label="Number of Rods"
                    value={steelQuantity}
                    onChange={setSteelQuantity}
                    unit="nos."
                  />

                  <Input
                    label="Steel Price"
                    value={steelPrice}
                    onChange={setSteelPrice}
                    unit="₹/kg"
                  />

                </div>
              </>
            )}

            {/* BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={resetCalculator}
                className="rounded-xl border border-[#CDB9AA] px-6 py-3 font-semibold text-[#5D4638] hover:bg-[#F4ECE3] transition"
              >
                Reset
              </button>

            </div>

          </div>

          {/* RESULTS */}

          <aside>

            <div className="sticky top-6 rounded-3xl bg-[#21160F] text-white p-6 shadow-xl">

              <p className="text-xs uppercase tracking-[0.25em] text-[#C9A66B]">
                Estimated Requirement
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Calculation Results
              </h2>

              <div className="mt-6 space-y-3">

                {calculator === "concrete" && (
                  <>
                    <Result
                      title="Concrete Volume"
                      value={concreteVolume.toFixed(2)}
                      unit="m³"
                    />

                    <Result
                      title="Cement"
                      value={cementBags.toFixed(1)}
                      unit="bags"
                    />

                    <Result
                      title="Sand"
                      value={concreteSandVolume.toFixed(2)}
                      unit="m³"
                    />

                    <Result
                      title="Aggregate"
                      value={concreteAggregateVolume.toFixed(2)}
                      unit="m³"
                    />

                    <div className="rounded-xl bg-[#722F37] p-4">

                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Estimated Material Cost
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        ₹{concreteCost.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>

                    </div>
                  </>
                )}

                {calculator === "brick" && (
                  <>
                    <Result
                      title="Wall Volume"
                      value={wallVolume.toFixed(2)}
                      unit="m³"
                    />

                    <Result
                      title="Bricks Required"
                      value={bricksRequired.toLocaleString("en-IN")}
                      unit="nos."
                    />

                    <div className="rounded-xl bg-[#722F37] p-4">

                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Estimated Brick Cost
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        ₹{brickCost.toLocaleString("en-IN")}
                      </p>

                    </div>
                  </>
                )}

                {calculator === "mortar" && (
                  <>
                    <Result
                      title="Mortar Volume"
                      value={mortarVolume.toFixed(2)}
                      unit="m³"
                    />

                    <Result
                      title="Cement"
                      value={mortarCementBags.toFixed(1)}
                      unit="bags"
                    />

                    <Result
                      title="Sand"
                      value={mortarSandVolume.toFixed(2)}
                      unit="m³"
                    />
                  </>
                )}

                {calculator === "plaster" && (
                  <>
                    <Result
                      title="Plaster Area"
                      value={plasterArea.toFixed(2)}
                      unit="m²"
                    />

                    <Result
                      title="Cement"
                      value={plasterCementBags.toFixed(1)}
                      unit="bags"
                    />

                    <Result
                      title="Sand"
                      value={plasterSandVolume.toFixed(2)}
                      unit="m³"
                    />
                  </>
                )}

                {calculator === "paint" && (
                  <>
                    <Result
                      title="Paint Area"
                      value={paintArea.toFixed(2)}
                      unit="m²"
                    />

                    <Result
                      title="Paint Required"
                      value={paintLitres.toFixed(1)}
                      unit="litres"
                    />

                    <div className="rounded-xl bg-[#722F37] p-4">

                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Estimated Paint Cost
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        ₹{paintCost.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>

                    </div>
                  </>
                )}

                {calculator === "tile" && (
                  <>
                    <Result
                      title="Floor Area"
                      value={floorArea.toFixed(2)}
                      unit="m²"
                    />

                    <Result
                      title="Tiles Required"
                      value={tilesRequired.toLocaleString("en-IN")}
                      unit="nos."
                    />

                    <div className="rounded-xl bg-[#722F37] p-4">

                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Estimated Tile Cost
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        ₹{tileCost.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>

                    </div>
                  </>
                )}

                {calculator === "steel" && (
                  <>
                    <Result
                      title="Weight per Meter"
                      value={steelWeightPerMeter.toFixed(2)}
                      unit="kg/m"
                    />

                    <Result
                      title="Total Steel"
                      value={steelTotalWeight.toFixed(2)}
                      unit="kg"
                    />

                    <div className="rounded-xl bg-[#722F37] p-4">

                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Estimated Steel Cost
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        ₹{steelCost.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </p>

                    </div>
                  </>
                )}

              </div>

              <div className="mt-6 border-t border-white/15 pt-5">

                <p className="text-xs leading-5 text-white/60">
                  These calculations are approximate estimates.
                  Actual material requirements can vary depending
                  on site conditions, wastage, mix specifications
                  and construction practices.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </div>
  );
};

export default MaterialCalculator;
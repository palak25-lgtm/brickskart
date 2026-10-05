
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Calculator,
  Package,
  ClipboardList,
  ShieldCheck,
  Truck,
  Building2,
  Hammer,
  ArrowRight,
  ShoppingCart,
  Ruler,
  Wrench,
  LogIn,
  Search,
  Wallet,
  FileText,
  RulerDimensionLine,
  MapPin,
} from "lucide-react";


const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const categories = [
    {
      name: "Cement",
      icon: "🧱",
      description: "High-quality cement for strong and durable construction.",
      link: "/shop?category=Cement",
    },
    {
      name: "Steel Rods",
      icon: "🔩",
      description: "Reliable steel rods for strong structural support.",
      link: "/shop?category=Steel%20Rods",
    },
    {
      name: "Bricks",
      icon: "🧱",
      description: "Premium bricks for residential and commercial projects.",
      link: "/shop?category=Bricks",
    },
    {
      name: "Sand",
      icon: "🏖️",
      description: "Quality construction sand for different building needs.",
      link: "/shop?category=Sand",
    },
    {
      name: "Tiles",
      icon: "◻️",
      description: "Stylish and durable tiles for modern spaces.",
      link: "/shop?category=Tiles%20%26%20Marble",
    },
    {
      name: "Pipes",
      icon: "🔧",
      description: "Reliable pipes and plumbing materials.",
      link: "/shop?category=Pipes%20%26%20Plumbing",
    },
    {
      name: "Paints",
      icon: "🎨",
      description: "Quality paints for interior and exterior finishing.",
      link: "/shop?category=Paints",
    },
    {
      name: "Tools",
      icon: "🛠️",
      description: "Essential tools for every construction project.",
      link: "/shop?category=Construction%20Tools",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#291C0E]">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="sticky top-0 z-50 bg-[#6E473B] text-[#F7F1E7] shadow-lg">

        <div className="mx-auto max-w-7xl px-4">

          <div className="flex min-h-[72px] items-center gap-5">

            {/* LOGO */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#291C0E] text-2xl">
                🧱
              </div>

              <div className="hidden sm:block">
                <div className="text-xl font-black">
                  Bricks<span className="text-[#C9A66B]">Kart</span>
                </div>

                <div className="text-[9px] font-semibold tracking-[0.25em] text-[#E1D4C2]">
                  BUILD BETTER
                </div>
              </div>
            </Link>

            {/* SEARCH BAR */}
            <div className="hidden flex-1 md:block">

              <div className="mx-auto flex max-w-xl items-center rounded-full bg-[#F7F1E7] px-4 py-2.5 text-[#291C0E]">

                <Search
                  size={19}
                  className="mr-3 text-[#6E473B]"
                />

                <input
                  type="text"
                  placeholder="Search construction materials..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#8A7868]"
                />

              </div>

            </div>

            {/* LOGIN + CART */}
            <div className="ml-auto flex items-center gap-2">

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition hover:bg-[#815547]"
              >
                <LogIn size={18} />

                <span className="hidden sm:inline">
                  Login
                </span>
              </Link>

              <Link
                to="/cart"
                className="relative flex items-center gap-2 rounded-lg bg-[#291C0E] px-3 py-2 text-sm font-bold transition hover:bg-[#4B3328]"
              >
                <ShoppingCart size={19} />

                <span className="hidden sm:inline">
                  Cart
                </span>

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A66B] text-[11px] font-black text-[#291C0E]">
                  0
                </span>
              </Link>

            </div>

          </div>

          {/* NAVIGATION LINKS */}
          <nav className="border-t border-[#8C6557]">

            <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 text-sm font-semibold">

              <Link
                to="/"
                className="text-[#C9A66B] hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="hover:text-[#C9A66B]"
              >
                Shop
              </Link>

              <Link
                to="/shop?category=Cement"
                className="hover:text-[#C9A66B]"
              >
                Cement
              </Link>

              <Link
                to="/shop?category=Steel%20Rods"
                className="hover:text-[#C9A66B]"
              >
                Steel
              </Link>

              <Link
                to="/shop?category=Bricks"
                className="hover:text-[#C9A66B]"
              >
                Bricks
              </Link>

              <Link
                to="/shop?category=Sand"
                className="hover:text-[#C9A66B]"
              >
                Sand
              </Link>

              <Link
                to="/shop?category=Tiles%20%26%20Marble"
                className="hover:text-[#C9A66B]"
              >
                Tiles
              </Link>

              <Link
                to="/shop?category=Pipes%20%26%20Plumbing"
                className="hover:text-[#C9A66B]"
              >
                Pipes
              </Link>

              <Link
                to="/shop?category=Paints"
                className="hover:text-[#C9A66B]"
              >
                Paints
              </Link>

              <Link
                to="/shop?category=Construction%20Tools"
                className="hover:text-[#C9A66B]"
              >
                Tools
              </Link>

              <Link
                to="/project-progress"
                className="hover:text-[#C9A66B]"
              >
                Project Progress
              </Link>

            </div>

          </nav>

        </div>

      </header>


      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section
        data-aos="fade-up"
        className="mx-auto max-w-7xl px-4 pt-8"
      >
        <div className="relative min-h-[560px] overflow-hidden rounded-[40px] bg-[#291C0E] shadow-2xl">

          {/* Construction Image */}
          {/* Construction Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/construction-new.jpg.jpg"
              alt="Construction project"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#291C0E]/95 via-[#291C0E]/80 to-[#6E473B]/45" />

          {/* Grid Decoration */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Decorative Circles */}
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-[#C9A66B]/30" />

          <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-[#C9A66B]/20" />

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[560px] items-center">

            <div className="max-w-3xl px-7 py-16 sm:px-12 lg:px-16">

              <div className="mb-6 inline-flex rounded-full border border-[#C9A66B]/50 bg-[#6E473B]/40 px-5 py-2">

                <span className="text-xs font-bold tracking-[0.3em] text-[#C9A66B] sm:text-sm">
                  CONSTRUCTION MARKETPLACE
                </span>

              </div>

              <h1 className="text-5xl font-black leading-[1.02] text-[#F7F1E7] sm:text-6xl lg:text-7xl">

                Build Better.

                <br />

                <span className="text-[#A78D78]">
                  Build Smarter.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-[#E1D4C2] sm:text-lg">

                Quality construction materials, smart project planning and
                everything you need to turn your construction ideas into
                reality.

              </p>

              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#6E473B] px-7 py-4 font-bold text-[#F7F1E7] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#815547]"
                >
                  Explore Materials
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/project-planner"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C9A66B] px-7 py-4 font-bold text-[#F7F1E7] transition duration-300 hover:-translate-y-1 hover:bg-[#C9A66B] hover:text-[#291C0E]"
                >
                  Plan Your Project
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
    PROJECT TOOLS
    ORIGINAL 3 + EXTRA FEATURES
========================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-16">

        <div className="mb-10 text-center">

          <p className="text-sm font-bold tracking-[0.25em] text-[#6E473B]">
            PROJECT TOOLS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#291C0E] sm:text-4xl">
            Everything You Need for Your Construction Project
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[#6E473B]">
            Plan your project, calculate materials and place large orders
            easily from one place.
          </p>

        </div>


        {/* CARDS GRID */}
        <div className="grid grid-cols-4 gap-6">


          {/* =====================================================
        1. MATERIAL CALCULATOR - ORIGINAL
    ===================================================== */}
          <Link
            data-aos="fade-right"
            to="/calculator"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
              <Calculator size={32} />
            </div>

            <h3 className="mt-4 text-lg font-bold">
              Material Calculator
            </h3>

            <p className="mt-2 text-sm leading-5 text-[#6E473B]">
              Calculate the required quantity of cement, bricks, sand,
              steel and other construction materials.
            </p>

            <div className="mt-4 flex items-center gap-1 text-sm font-bold text-[#6E473B]">
              Calculate Materials

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        2. BULK ORDER - ORIGINAL
    ===================================================== */}
          <Link
            data-aos="fade-up"
            to="/bulk-order"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A78D78] text-[#291C0E]">
              <Package size={32} />
            </div>

            <h3 className="mt-3 text-lg font-bold">
              Bulk Order
            </h3>

            <p className="mt-3 leading-7 text-[#6E473B]">
              Order construction materials in large quantities for
              residential, commercial and industrial projects.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-[#6E473B]">
              Place Bulk Order

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        3. PROJECT PLANNER - ORIGINAL
    ===================================================== */}
          <Link
            data-aos="fade-left"
            to="/project-planner"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A66B] text-[#291C0E]">
              <ClipboardList size={32} />
            </div>

            <h3 className="mt-4 h-12 text-lg font-bold">
              Project Planner
            </h3>

            <p className="mt-2 text-sm leading-5 text-[#6E473B]">
              Organize project stages, manage materials, estimate budgets
              and keep track of construction tasks.
            </p>

            <div className="mt-3 flex items-center gap-1 text-sm font-bold text-[#6E473B]">
              Open Project Planner

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        4. BUDGET ESTIMATOR - NEW
    ===================================================== */}
          <Link
            data-aos="fade-right"
            to="/budget-estimator"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
              <Wallet size={32} />
            </div>

            <h3 className="mt-4 h-12 text-lg font-bold">
              Budget Estimator
            </h3>

            <p className="mt-3 leading-7 text-[#6E473B]">
              Estimate your construction budget based on materials,
              quantities and project requirements.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-[#6E473B]">
              Estimate Budget

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        5. QUOTATION ESTIMATOR
    ===================================================== */}
          <Link
            data-aos="fade-up"
            to="/quotation-estimator"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
              <FileText size={32} />
            </div>

            <h3 className="mt-4 h-12 text-lg font-bold">
              Quotation Estimator
            </h3>

            <p className="mt-3 leading-7 text-[#6E473B]">
              Create material quotations with quantities, delivery charges,
              GST and estimated total cost.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-[#6E473B]">
              Create Quotation

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        6. DELIVERY TRACKER
    ===================================================== */}
          <Link
            data-aos="fade-left"
            to="/delivery-tracker"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
              <MapPin size={32} />
            </div>

            <h3 className="mt-4 h-12 text-lg font-bold">
              Delivery Tracker
            </h3>

            <p className="mt-3 leading-7 text-[#6E473B]">
              Track your construction material orders and monitor
              delivery progress from one place.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-[#6E473B]">
              Track Delivery

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>


          {/* =====================================================
        7. EMI CALCULATOR
    ===================================================== */}
          <Link
            data-aos="fade-up"
            to="/emi-calculator"
            className="group aspect-square rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A66B] hover:shadow-xl"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A66B] text-[#291C0E]">
              <Calculator size={32} />
            </div>

            <h3 className="mt-4 text-lg font-bold">
              EMI Calculator
            </h3>

            <p className="mt-3 leading-7 text-[#6E473B]">
              Calculate your monthly EMI, total interest and total amount
              payable for your construction loan.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-[#6E473B]">
              Calculate EMI

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>

          </Link>

        </div>

      </section>
      {/* SEE INSIDE THE WALL */}

      <section className="mx-auto max-w-7xl px-4 py-16">

        <div className="rounded-[35px] bg-[#291C0E] p-10 text-center text-[#F7F1E7] shadow-xl">

          <div className="text-5xl">
            🧱
          </div>

          <p className="mt-4 text-sm font-bold tracking-[0.25em] text-[#C9A66B]">
            BRICKSKART BUILDING LAB
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            See Inside the Wall
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#CDBBAA]">
            Explore what is hidden inside a building wall.
            Discover bricks, electrical wiring, water pipes and
            structural layers.
          </p>

          <Link
            to="/wall-xray"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#C9A66B] px-7 py-4 font-bold text-[#291C0E] transition hover:-translate-y-1 hover:bg-[#D8B978]"
          >
            🔍 Enter Building Lab
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>



      {/* =========================================================
          PREMIUM CONSTRUCTION MATERIALS
      ========================================================= */}

      <section className="relative mx-auto max-w-7xl rounded-[35px] bg-[#291C0E] py-16 overflow-hidden">

        <div className="grid grid-cols-2 gap-5">            <div>

          <p className="text-sm font-bold tracking-[0.25em] text-[#C9A66B]">
            PREMIUM QUALITY
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#F7F1E7] sm:text-5xl">
            Premium Construction Materials
          </h2>

          <p className="mt-5 max-w-xl leading-8 text-[#CDBBAA]">
            Build with confidence using reliable construction materials
            selected for quality, strength and durability.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3 font-bold text-[#F7F1E7] transition hover:bg-[#815547]"
          >
            Shop Materials
            <ArrowRight size={18} />
          </Link>

        </div>


          <div className="grid grid-cols-2 gap-5">
            <div className="h-[210px] rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5 flex flex-col justify-center">
              <ShieldCheck
                className="text-[#C9A66B]"
                size={32}
              />

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Trusted Quality
              </h3>

              <p className="mt-2 text-sm text-[#CDBBAA]">
                Carefully selected materials.
              </p>

            </div>


            <div className="h-[210px] rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5 flex flex-col justify-center">                <Truck
              className="text-[#C9A66B]"
              size={32}
            />

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm text-[#CDBBAA]">
                Reliable material delivery.
              </p>

            </div>


            <div className="h-[210px] rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5 flex flex-col justify-center">                <Building2
              className="text-[#C9A66B]"
              size={32}
            />

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Built to Last
              </h3>

              <p className="mt-2 text-sm text-[#CDBBAA]">
                Materials for strong structures.
              </p>

            </div>


            <div className="h-[210px] rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5 flex flex-col justify-center">
              <Hammer
                className="text-[#C9A66B]"
                size={32}
              />

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Complete Range
              </h3>

              <p className="mt-2 text-sm text-[#CDBBAA]">
                Everything for your project.
              </p>

            </div>

          </div>

        </div>

    

      </section >


{/* =========================================================
          SHOP BY CATEGORY
      ========================================================= */}

  < section className = "mx-auto max-w-7xl px-4 py-16" >

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-bold tracking-[0.25em] text-[#6E473B]">
              SHOP MATERIALS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#291C0E] sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-2 text-[#6E473B]">
              Find the right materials for your construction project.
            </p>

          </div>

          <Link
            to="/shop"
            className="font-bold text-[#6E473B] hover:text-[#291C0E]"
          >
            View All Materials →
          </Link>

        </div>


        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={category.link}
              className="group rounded-2xl border border-[#D8C8B8] bg-[#F7F1E7] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#6E473B] text-2xl transition group-hover:bg-[#C9A66B]">
                {category.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#291C0E]">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#6E473B]">
                {category.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#6E473B]">

                Shop Now

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />

              </div>

            </Link>

          ))}

        </div>

      </section >


{/* =========================================================
          WHY CHOOSE US
      ========================================================= */}

  < section className = "relative overflow-hidden border-y border-[#D8C8B8] bg-[#E1D4C2]/30 py-16" >

        <img
          src="/images/constructor.png"
          alt="Walking construction worker"
          className="absolute bottom-2 left-0 z-10 h-16 w-auto animate-walk"
        />



        <div className="mx-auto max-w-7xl px-4">

          <div className="text-center">

            <p className="text-sm font-bold tracking-[0.25em] text-[#6E473B]">
              WHY BRICKSKART
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#291C0E] sm:text-4xl">
              Built Around Your Project
            </h2>

          </div>


          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-[#F7F1E7] p-7 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6E473B] text-[#F7F1E7]">
                <Ruler size={27} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Plan Accurately
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6E473B]">
                Use our project planning and material calculation tools
                before starting your construction.
              </p>

            </div>


            <div className="rounded-2xl bg-[#F7F1E7] p-7 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#A78D78]">
                <ShoppingCart size={27} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Easy Ordering
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6E473B]">
                Shop individual materials or place a bulk order for
                your complete project.
              </p>

            </div>


            <div className="rounded-2xl bg-[#F7F1E7] p-7 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A66B]">
                <Wrench size={27} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Complete Solutions
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6E473B]">
                From materials to planning and calculations, manage
                your construction needs in one place.
              </p>

            </div>

          </div>

        </div>

      </section >


{/* =========================================================
          ABOUT BRICKSKART
      ========================================================= */}

  < section className = "mx-auto max-w-7xl px-4 py-16" >

    <div className="overflow-hidden rounded-[35px] bg-[#291C0E] shadow-xl">

      <div className="grid items-center lg:grid-cols-2">

        {/* LEFT - ABOUT CONTENT */}

        <div className="px-7 py-12 sm:px-12 lg:px-14">

          <p className="text-sm font-bold tracking-[0.25em] text-[#C9A66B]">
            ABOUT BRICKSKART
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#F7F1E7] sm:text-4xl">

            Your Complete Construction

            <br />

            Material Partner

          </h2>

          <p className="mt-6 leading-8 text-[#E1D4C2]">

            BricksKart is a construction marketplace designed to make
            buying and managing construction materials easier, faster
            and more convenient.

          </p>

          <p className="mt-4 leading-8 text-[#CDBBAA]">

            From cement, steel and bricks to sand, tiles, pipes, paints
            and construction tools, we bring essential building materials
            together in one place.

          </p>

          <p className="mt-4 leading-8 text-[#CDBBAA]">

            Our platform also provides useful tools such as material
            calculation, project planning and bulk ordering to help you
            manage your construction projects more efficiently.

          </p>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3 font-bold text-[#F7F1E7] transition-all duration-300 hover:-translate-y-1 hover:bg-[#815547]"
          >

            Learn More About Us

            <ArrowRight size={18} />

          </Link>

        </div>


        {/* RIGHT - FEATURES */}

        <div className="bg-[#3B291B] px-7 py-12 sm:px-12 lg:px-10">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Feature 1 */}

            <div className="rounded-2xl border border-[#6E473B] bg-[#291C0E] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6E473B] text-[#F7F1E7]">
                <Building2 size={24} />
              </div>

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Complete Materials
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#CDBBAA]">
                Essential construction materials available in one
                convenient marketplace.
              </p>

            </div>


            {/* Feature 2 */}

            <div className="rounded-2xl border border-[#6E473B] bg-[#291C0E] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A66B] text-[#291C0E]">
                <Calculator size={24} />
              </div>

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Smart Calculation
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#CDBBAA]">
                Calculate material requirements before starting your
                construction work.
              </p>

            </div>


            {/* Feature 3 */}

            <div className="rounded-2xl border border-[#6E473B] bg-[#291C0E] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A78D78] text-[#291C0E]">
                <ClipboardList size={24} />
              </div>

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Project Planning
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#CDBBAA]">
                Organize your construction tasks, materials and project
                requirements easily.
              </p>

            </div>


            {/* Feature 4 */}

            <div className="rounded-2xl border border-[#6E473B] bg-[#291C0E] p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6E473B] text-[#F7F1E7]">
                <Package size={24} />
              </div>

              <h3 className="mt-4 font-bold text-[#F7F1E7]">
                Bulk Ordering
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#CDBBAA]">
                Convenient bulk material ordering for large residential
                and commercial projects.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

      </section >





    </div >
  );
};

export default Home;
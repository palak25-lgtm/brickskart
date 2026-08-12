import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
  Calculator,
  ClipboardList,
  Package
} from "lucide-react";
import Layout from "@/components/Layout";

import { addToCart, getUser } from "@/utils/storage";

const CategoryIcon = ({ name, icon, href }: { name: string; icon: string; href: string }) => (
  <Link
    to={href}
    className="flex flex-col items-center gap-2 p-4 hover:scale-105 transition-transform"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-3xl">
      {icon}
    </div>
    <span className="text-xs font-semibold text-center text-gray-700 line-clamp-2">{name}</span>
  </Link>
);

const BrandLogo = ({ name, color }: { name: string; color: string }) => (
  <div
    className={`px-6 py-8 rounded-lg font-bold text-white flex items-center justify-center h-20 text-sm text-center`}
    style={{ backgroundColor: color }}
  >
    {name}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [categoryScroll, setCategoryScroll] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product: any) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart({
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      quantity: 1,
      image: `/${product.image}`,
    });
  };

  const banners = [
    {
      title: "Build Your Dream Project",
      subtitle: "Everything You Need for Construction in One Place",
      gradient: "from-[#722F37] to-[#4A1F24]",
      icon: "🏗️",
    },


    {
      title: "Trusted Suppliers Across India",
      subtitle: "Quality Products with Fast Delivery",
      gradient: "from-[#8F4A52] to-[#722F37]",
      icon: "🚚",
    },
  ];

  const categories = [
    { name: "Cement", icon: "🏢", href: "/shop?category=Cement" },
    { name: "Steel Rods", icon: "🔗", href: "/shop?category=Steel Rods" },
    { name: "Bricks", icon: "🧱", href: "/shop?category=Bricks" },
    { name: "Sand", icon: "🏖️", href: "/shop?category=Sand" },
    { name: "Tiles", icon: "🪟", href: "/shop?category=Tiles & Marble" },
    { name: "Pipes", icon: "🔧", href: "/shop?category=Pipes & Plumbing" },
    { name: "Paints", icon: "🎨", href: "/shop?category=Paints" },
    { name: "Tools", icon: "🛠️", href: "/shop?category=Construction Tools" },
    { name: "Safety", icon: "🦺", href: "/shop?category=Safety Gear" },
    { name: "Electrical", icon: "⚡", href: "/shop?category=Electrical Items" },
  ];

  const brands = [
    { name: "UltraTech", color: "#FF6B6B" },
    { name: "ACC", color: "#4ECDC4" },
    { name: "JK Cement", color: "#45B7D1" },
    { name: "Birla", color: "#FFA07A" },
    { name: "Tata Tiscon", color: "#98D8C8" },
    { name: "JSW", color: "#F7DC6F" },
    { name: "Supreme", color: "#BB8FCE" },
    { name: "Asian Paints", color: "#85C1E2" },
  ];
  const premiumProducts = products.filter(
    (p: any) =>
      p.category === "Cement" ||
      p.category === "Steel" ||
      p.category === "Tiles"
  ).slice(0, 4);
  const featuredProducts = products.slice(0, 8);


  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <Layout>
      {/* Hero Carousel */}
      <div className="bg-[#F7F3E9] py-8 border-b border-[#722F37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden">
            {/* Banner */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${banners[currentBanner].gradient} flex items-center justify-between px-8 transition-all duration-300 overflow-hidden`}
            >
              {/* Construction Blueprint Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">

                {/* Blueprint Grid */}
                <div
                  className="absolute inset-0 opacity-10 blueprint-animation"
                  style={{
                    backgroundImage: `
        linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)
      `,
                    backgroundSize: "50px 50px",
                  }}
                />

                {/* Construction Lines */}
                <div className="absolute top-1/4 left-0 w-full h-px bg-white/10 animate-pulse" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-white/10 animate-pulse" />

                <div className="absolute left-1/4 top-0 h-full w-px bg-white/10 animate-pulse" />
                <div className="absolute left-3/4 top-0 h-full w-px bg-white/10 animate-pulse" />

                {/* Moving Measurement Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 measurement-line" />

                {/* Measurement Markers */}
                <div className="absolute top-1/2 left-1/4 h-4 w-px bg-white/30" />
                <div className="absolute top-1/2 left-1/2 h-4 w-px bg-white/30" />
                <div className="absolute top-1/2 left-3/4 h-4 w-px bg-white/30" />

                {/* Building Outline */}
                <div className="absolute bottom-0 right-10 opacity-10">
                  <div className="flex items-end gap-2">

                    <div className="w-16 h-32 border-2 border-white">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        <div className="h-5 border border-white" />
                        <div className="h-5 border border-white" />
                        <div className="h-5 border border-white" />
                        <div className="h-5 border border-white" />
                      </div>
                    </div>

                    <div className="w-24 h-48 border-2 border-white">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        <div className="h-6 border border-white" />
                        <div className="h-6 border border-white" />
                        <div className="h-6 border border-white" />
                        <div className="h-6 border border-white" />
                        <div className="h-6 border border-white" />
                        <div className="h-6 border border-white" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Construction Crane */}
                <div className="absolute top-8 right-20 opacity-15 crane-animation">
                  <div className="relative w-64 h-40">

                    {/* Crane tower */}
                    <div className="absolute right-10 top-0 w-2 h-40 bg-white/50" />

                    {/* Crane arm */}
                    <div className="absolute right-10 top-2 w-52 h-2 bg-white/50" />

                    {/* Crane support */}
                    <div className="absolute right-10 top-2 w-20 h-20 border-l-2 border-t-2 border-white/40 rotate-45 origin-top-right" />

                    {/* Hanging cable */}
                    <div className="absolute right-28 top-4 w-px h-20 bg-white/40" />

                  </div>
                </div>

              </div>
              <div>
                <div className="text-5xl sm:text-6xl mb-4">{banners[currentBanner].icon}</div>
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
                  {banners[currentBanner].title}
                </h1>
                <p className="text-lg sm:text-xl text-white/90">{banners[currentBanner].subtitle}</p>
                <Link
                  to="/shop"
                  className="inline-block mt-4 px-6 py-2 bg-white text-gray-900 font-bold rounded-full hover:scale-105 transition-transform"
                >
                </Link>
                shop now
              </div>
            </div>




            {/* Navigation Buttons */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={24} className="text-gray-900" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`h-2 rounded-full transition-all ${i === currentBanner ? "bg-white w-8" : "bg-white/50 w-2"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extra Features */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-bold text-center mb-6">
          Construction Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            to="/calculator"
            className="p-6 bg-[#A65D65] text-white rounded-xl text-center hover:bg-[#722F37] hover:scale-105 transition"
          >
            <Calculator className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Material Calculator</h3>
            <p className="mt-2">Calculate your required materials</p>
          </Link>

          <Link
            to="/project-planner"
            className="p-6 bg-[#A65D65] text-white rounded-xl text-center hover:bg-[#722F37] hover:scale-105 transition"
          >
            <ClipboardList className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Project Planner</h3>
            <p className="mt-2">Plan your construction project</p>
          </Link>

          <Link
            to="/bulk-order"
            className="p-6 bg-[#A65D65] text-white rounded-xl text-center hover:bg-[#722F37] hover:scale-105 transition"
          >
            <Package className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Bulk Order</h3>
            <p className="mt-2">Order materials in bulk</p>
          </Link>

        </div>
      </div>

      {/* Category Icons Slider */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-[#722F37]">
            Shop by Category
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
            {categories.map((cat) => (
              <div key={cat.name} className="flex-shrink-0 snap-center">
                <CategoryIcon name={cat.name} icon={cat.icon} href={cat.href} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Section */}
      <div className="bg-gradient-to-r from-[#722F37] to-[#4A1F24] text-white py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">✨ Premium Construction Materials</h2>
              <p className="text-xl text-gray-200 mb-6">
                Experience the finest quality products with superior durability and performance. Perfect for professional contractors and homeowners.
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-[#F7F3E9] text-[#722F37] font-bold rounded-full hover:bg-white hover:scale-105 transition-transform"
              >
                Shop Premium Collection
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {premiumProducts.slice(0, 4).map((prod) => (
                <div key={prod.product_id} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <p className="font-bold text-sm">{prod.product_name}</p>
                  <p className="text-pink-300 font-semibold">₹{prod.price}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star size={14} className="fill-yellow-300 text-yellow-300" />
                    <span className="text-xs">4.8</span>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="bg-[#F7F3E9] py-12 border-b border-[#722F37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-[#722F37]">
            Original Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {brands.map((brand) => (
              <BrandLogo key={brand.name} name={brand.name} color={brand.color} />
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-[#722F37] to-[#8F4A52] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">🎉 Up to 35% OFF</h3>
              <p className="text-sm mb-4">On first order through our app</p>
              <button className="px-6 py-2 bg-[#F7F3E9] text-[#722F37] font-bold rounded-full hover:bg-white hover:scale-105 transition-transform">
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#4A1F24] to-[#722F37] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">🔥 Trending Now</h3>
              <p className="text-sm mb-4">Budget Buys | Top Rated | Daily Essentials</p>
              <button className="px-6 py-2 bg-[#F7F3E9] text-[#722F37] font-bold rounded-full hover:bg-white hover:scale-105 transition-transform">
                Shop Trending
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="bg-[#F7F3E9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-[#722F37]">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.product_id}
                to={`/product/${product.product_id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative overflow-hidden bg-gray-100 h-40 sm:h-48">
                  <img
                    src={`/${product.image}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute top-2 right-2 bg-[#B22222] text-white text-xs font-bold px-2 py-1 rounded-full">

                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#B22222] font-semibold mb-1">{product.category}</p>
                  <h3 className="font-bold text-sm line-clamp-2 mb-2">{product.product_name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-[#F2A900] text-[#F2A900]" />
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                  <p className="text-[#722F37] font-bold text-lg mb-2">₹{product.price}</p>
                  <button onClick={() => handleAddToCart(product)} className="w-full bg-[#722F37] text-white py-1 rounded-lg text-xs font-bold hover:bg-[#4A1F24] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;


import { useState } from "react";
import { Link } from "react-router-dom";
import AIChatBot from "./AIChatBot";
import {
  Menu,
  X,
  ShoppingCart,
  LogOut,
  Search,
  Bot,
} from "lucide-react";

import { getUser, logout, getCart } from "@/utils/storage";



const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = getUser();

  const cartCount = getCart().reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const categories = [
    {
      label: "Cement",
      href: "/shop?category=Cement",
    },
    {
      label: "Steel Rods",
      href: "/shop?category=Steel%20Rods",
    },
    {
      label: "Bricks",
      href: "/shop?category=Bricks",
    },
    {
      label: "Sand",
      href: "/shop?category=Sand",
    },
    {
      label: "Tiles",
      href: "/shop?category=Tiles%20%26%20Marble",
    },
    {
      label: "Pipes",
      href: "/shop?category=Pipes%20%26%20Plumbing",
    },
    {
      label: "Paints",
      href: "/shop?category=Paints",
    },
    {
      label: "Tools",
      href: "/shop?category=Construction%20Tools",
    },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3E9]">

      

      {/* ================= MAIN CONTENT ================= */}

      <main className="flex-1 w-full">
        {children}
      </main>

      <AIChatBot />

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#35181C] text-white/70 mt-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-8
              mb-8
            "
          >

            {/* COMPANY */}

            <div>

              <img
                src="/logo.png"
                alt="BricksKart Logo"
                className="h-[65px] w-auto object-contain mb-4"
              />

              <p className="text-sm leading-6">
                Your trusted partner for premium
                construction materials and smarter
                project planning.
              </p>

            </div>

            {/* QUICK LINKS */}

            <div>

              <h4 className="text-[#C99A3D] font-bold mb-4">
                Quick Links
              </h4>

              <ul className="space-y-2 text-sm">

                <li>
                  <Link
                    to="/"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Shop
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#C9A66B] transition"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Contact
                  </Link>
                </li>

              </ul>

            </div>

            {/* SERVICES */}

            <div>

              <h4 className="text-[#C9A66B] font-bold mb-4">
                Services
              </h4>

              <ul className="space-y-2 text-sm">

                <li>
                  <Link
                    to="/calculator"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Material Calculator
                  </Link>
                </li>

                <li>
                  <Link
                    to="/project-planner"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Project Planner
                  </Link>
                </li>

                <li>
                  <Link
                    to="/bulk-order"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Bulk Order
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop"
                    className="hover:text-[#C9A66B] transition"
                  >
                    Construction Materials
                  </Link>
                </li>

              </ul>

            </div>

            {/* SUPPORT */}

            <div>

              <h4 className="text-[#C99A3D] font-bold mb-4">
                Support
              </h4>

              <ul className="space-y-3 text-sm">

                <li>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-[#C9A66B] transition"
                  >
                    +91 98765 43210
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:info@Brickskart.com"
                    className="hover:text-[#C9A66B] transition"
                  >
                    info@Brickskart.com
                  </a>
                </li>

              </ul>

            </div>

          </div>

          {/* COPYRIGHT */}

          <div className="border-t border-white/10 pt-8">

            <p className="text-center text-sm text-white/50">
              © 2024 BricksKart. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

      <AIChatBot />

    </div>
  );
};

export default Layout;
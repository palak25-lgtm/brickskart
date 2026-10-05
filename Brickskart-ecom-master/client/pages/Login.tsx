import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";

import { saveUser } from "@/utils/storage";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Save user (demo only - no password validation)
    saveUser({
      email: formData.email,
      name: formData.email.split("@")[0],
      phone: "",
    });

    navigate("/shop");
  };

  return (
    
      <div className="min-h-screen flex items-center justify-center bg-[#F5EBDD] px-4 py-8">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E5D2BD] p-8">

          {/* Login Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7A3E24]">
              <LogIn className="w-9 h-9 text-[#F5EBDD]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-2 text-[#3B2416]">
            Welcome Back
          </h1>

          <p className="text-[#7A3E24] text-center mb-8">
            Log in to your account to continue
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-[#F5EBDD] border border-[#C89B5A] text-[#7A3E24] rounded-lg font-semibold">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-[#3B2416] font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-[#E5D2BD] rounded-lg bg-[#FDF9F4] text-[#3B2416] placeholder-[#A98C76] focus:outline-none focus:ring-2 focus:ring-[#9B5738] focus:border-[#9B5738]"
              />

              <p className="text-xs text-[#8A7868] mt-1">
                Demo: Use any email address
              </p>
            </div>

            {/* Password */}
            <div>

              <label className="block text-[#3B2416] font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
                required
                className="relative z-10 w-full px-4 py-3 border border-[#E5D2BD] rounded-lg bg-[#FDF9F4] text-[#3B2416] placeholder-[#A98C76] focus:outline-none focus:ring-2 focus:ring-[#9B5738] focus:border-[#9B5738]"
              />

              <p className="text-xs text-[#8A7868] mt-1">
                Demo: Use any password
              </p>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#7A3E24] text-[#F5EBDD] font-bold rounded-lg hover:bg-[#3B2416] transition-all duration-300 shadow-md hover:shadow-lg mt-6"
            >
              Log In
            </button>

          </form>

          {/* Demo Account */}
          <div className="mt-8 p-4 bg-[#F5EBDD] border border-[#C89B5A] rounded-lg">

            <p className="text-sm text-[#7A3E24]">
              <strong className="text-[#3B2416]">
                Demo Account:
              </strong>{" "}
              This is a demo login. Use any email and password to create
              a test account.
            </p>

          </div>

          {/* Register */}
          <div className="mt-6 text-center">

            <p className="text-[#7A3E24]">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-[#7A3E24] hover:text-[#3B2416] hover:underline font-semibold"
              >
                Register here
              </Link>

            </p>

          </div>

          {/* Back to Shop */}
          <div className="mt-4 text-center">

            <Link
              to="/shop"
              className="text-[#9B5738] hover:text-[#3B2416] hover:underline text-sm font-semibold"
            >
              ← Back to Shop
            </Link>

          </div>

        </div>

      </div>
    
  );
};

export default Login;
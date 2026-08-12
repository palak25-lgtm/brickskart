import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import Layout from "@/components/Layout";
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
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-[#F8E8ED]/40 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#D9A6B5]/40 p-8">
          <div className="flex justify-center mb-6">
            <LogIn className="w-12 h-12 text-[#8B1E3F]" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-center mb-8">
            Log in to your account to continue
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]" />
              <p className="text-xs text-gray-500 mt-1">
                Demo: Use any email address
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="relative z-10 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
              />

              <p className="text-xs text-gray-500 mt-1">
                Demo: Use any password
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6F1832] transition-colors mt-6"            >
              Log In
            </button>
          </form>

          <div className="mt-8 p-4 bg-[#F8E8ED] border border-[#D9A6B5] rounded-lg">
            <p className="text-sm text-[#6F1832]">
              <strong>Demo Account:</strong> This is a demo login. Use any email
              and password to create a test account.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#8B1E3F] hover:underline font-semibold"              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/shop"
              className="text-[#8B1E3F] hover:underline text-sm"            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div >
    </Layout >
  );
};

export default Login;

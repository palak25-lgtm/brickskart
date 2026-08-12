const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">📦 Products</h2>
          <p className="text-3xl mt-3">120</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">👥 Users</h2>
          <p className="text-3xl mt-3">350</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">🛒 Orders</h2>
          <p className="text-3xl mt-3">95</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">💰 Revenue</h2>
          <p className="text-3xl mt-3">₹5,25,000</p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <button className="bg-orange-600 text-white p-5 rounded-xl text-xl hover:bg-orange-700">
          ➕ Add Product
        </button>

        <button className="bg-blue-600 text-white p-5 rounded-xl text-xl hover:bg-blue-700">
          📋 Manage Products
        </button>

        <button className="bg-green-600 text-white p-5 rounded-xl text-xl hover:bg-green-700">
          🛒 View Orders
        </button>

        <button className="bg-purple-600 text-white p-5 rounded-xl text-xl hover:bg-purple-700">
          📦 Bulk Order Requests
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;
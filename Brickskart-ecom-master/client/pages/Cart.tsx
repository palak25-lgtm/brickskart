import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { getCart, removeFromCart, updateCartItemQuantity, getUser } from "@/utils/storage";


const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const navigate = useNavigate();
  const user = getUser();


  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );


  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCartItems(getCart());
  };


  const handleQuantityChange = (id: number, quantity: number) => {
    updateCartItemQuantity(id, quantity);
    setCartItems(getCart());
  };


  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };


  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart size={64} className="mx-auto text-[#8B1E3F] mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/shop"
            cclassName="inline-block px-6 py-3 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6F1832] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }


  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border-b border-gray-200 last:border-b-0 flex gap-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />


                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-bold hover:text-[#8B1E3F] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[#8B1E3F] font-bold text-lg mt-2">₹{item.price}</p>


                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#F8E8ED] hover:text-[#8B1E3F] transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#F8E8ED] hover:text-[#8B1E3F] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>


                      <p className="text-gray-600">
                        Subtotal: <span className="font-bold">₹{item.price * item.quantity}</span>
                      </p>


                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-[#8B1E3F] hover:bg-[#F8E8ED] rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="mt-8">
              <Link
                to="/shop
                "className="text-[#8B1E3F] hover:underline font-semibold"
                
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>


          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>


              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-semibold">₹{Math.round(total * 0.18)}</span>
                </div>
              </div>


              <div className="flex justify-between mb-6 text-xl font-bold">
                <span>Total</span>
                <span className="text-[#8B1E3F]">₹{total + Math.round(total * 0.18)}</span>
              </div>


              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-[#8B1E3F] text-white font-bold rounded-lg hover:bg-[#6F1832] transition-colors mb-2"
              >
                Proceed to Checkout
              </button>


              <button> className="w-full px-6 py-3 border-2 border-[#D9A6B5] text-[#8B1E3F] font-bold rounded-lg hover:bg-[#F8E8ED] transition-colors"
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default Cart;
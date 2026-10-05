import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import Layout from "@/components/Layout";

const DeliveryTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();

    if (orderId.trim()) {
      setSearched(true);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#F7F1E7] px-4 py-12">

        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold tracking-[0.25em] text-[#6E473B]">
            BRICKSKART DELIVERY
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#291C0E]">
            Track Your Delivery
          </h1>

          <p className="mt-3 text-[#6E473B]">
            Enter your order ID to check your construction material delivery.
          </p>

        </div>

        {/* SEARCH BOX */}
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-[#D8C8B8] bg-white p-6 shadow-lg">

          <form
            onSubmit={handleTrack}
            className="flex flex-col gap-3 sm:flex-row"
          >

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E473B]"
              />

              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
                className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] py-3 pl-12 pr-4 text-[#291C0E] outline-none focus:border-[#6E473B] focus:ring-2 focus:ring-[#C9A66B]"
              />

            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#6E473B] px-7 py-3 font-bold text-white transition hover:bg-[#815547]"
            >
              Track Order
            </button>

          </form>

        </div>

        {/* TRACKING RESULT */}
        {searched && (

          <div className="mx-auto mt-10 max-w-4xl">

            {/* ORDER INFO */}
            <div className="rounded-3xl border border-[#D8C8B8] bg-white p-7 shadow-lg">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-sm font-semibold text-[#6E473B]">
                    ORDER ID
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#291C0E]">
                    {orderId}
                  </h2>

                </div>

                <div className="rounded-full bg-[#E8DCCB] px-4 py-2 text-sm font-bold text-[#6E473B]">
                  In Transit
                </div>

              </div>


              {/* DELIVERY DETAILS */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-[#F7F1E7] p-5">

                  <Package
                    size={26}
                    className="text-[#6E473B]"
                  />

                  <p className="mt-3 text-sm text-[#8A7868]">
                    Order Status
                  </p>

                  <p className="mt-1 font-bold text-[#291C0E]">
                    Packed
                  </p>

                </div>


                <div className="rounded-2xl bg-[#F7F1E7] p-5">

                  <Truck
                    size={26}
                    className="text-[#A78D78]"
                  />

                  <p className="mt-3 text-sm text-[#8A7868]">
                    Delivery
                  </p>

                  <p className="mt-1 font-bold text-[#291C0E]">
                    In Transit
                  </p>

                </div>


                <div className="rounded-2xl bg-[#F7F1E7] p-5">

                  <MapPin
                    size={26}
                    className="text-[#C9A66B]"
                  />

                  <p className="mt-3 text-sm text-[#8A7868]">
                    Destination
                  </p>

                  <p className="mt-1 font-bold text-[#291C0E]">
                    Your Delivery Address
                  </p>

                </div>

              </div>


              {/* TIMELINE */}
              <div className="mt-10">

                <h3 className="text-xl font-bold text-[#291C0E]">
                  Delivery Progress
                </h3>


                <div className="mt-7 space-y-7">

                  {/* STEP 1 */}
                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6E473B] text-white">
                      <CheckCircle size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#291C0E]">
                        Order Confirmed
                      </h4>

                      <p className="mt-1 text-sm text-[#6E473B]">
                        Your order has been successfully confirmed.
                      </p>
                    </div>

                  </div>


                  {/* STEP 2 */}
                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6E473B] text-white">
                      <Package size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#291C0E]">
                        Materials Packed
                      </h4>

                      <p className="mt-1 text-sm text-[#6E473B]">
                        Your construction materials have been packed.
                      </p>
                    </div>

                  </div>


                  {/* STEP 3 */}
                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A66B] text-[#291C0E]">
                      <Truck size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#291C0E]">
                        In Transit
                      </h4>

                      <p className="mt-1 text-sm text-[#6E473B]">
                        Your order is currently on the way.
                      </p>
                    </div>

                  </div>


                  {/* STEP 4 */}
                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#D8C8B8] bg-[#F7F1E7] text-[#8A7868]">
                      <Clock size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#8A7868]">
                        Delivered
                      </h4>

                      <p className="mt-1 text-sm text-[#A78D78]">
                        Waiting for delivery.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

        {/* BACK BUTTON */}
        <div className="mt-10 text-center">

          <Link
            to="/"
            className="font-bold text-[#6E473B] hover:text-[#291C0E]"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </Layout>
  );
};

export default DeliveryTracker;
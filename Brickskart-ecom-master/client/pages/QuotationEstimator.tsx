import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Trash2,
  IndianRupee,
  ArrowLeft,
  Download,
} from "lucide-react";

type Item = {
  id: number;
  material: string;
  quantity: number;
  price: number;
};

type Supplier = {
  id: number;
  name: string;
  location: string;
  distance: number;
  rating: number;
  materials: string[];
  delivery: string;
  phone: string;
};

/* ================================
   SUPPLIER DATA
================================ */

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Shree Ganesh Building Materials",
    location: "Nagpur",
    distance: 2.4,
    rating: 4.6,
    materials: ["Cement", "Bricks", "Sand", "Tiles"],
    delivery: "Available",
    phone: "9876543210",
  },

  {
    id: 2,
    name: "Sai Construction Suppliers",
    location: "Nagpur",
    distance: 4.1,
    rating: 4.4,
    materials: ["Cement", "Steel Rods", "Sand", "Pipes"],
    delivery: "Available",
    phone: "9876543211",
  },

  {
    id: 3,
    name: "Mahalaxmi Traders",
    location: "Nagpur",
    distance: 6.8,
    rating: 4.2,
    materials: ["Bricks", "Steel Rods", "Cement", "Tools"],
    delivery: "Available",
    phone: "9876543212",
  },

  {
    id: 4,
    name: "Om Sai Hardware",
    location: "Nagpur",
    distance: 8.5,
    rating: 4.5,
    materials: ["Paints", "Pipes", "Tiles", "Tools"],
    delivery: "Available",
    phone: "9876543213",
  },
];

/* ================================
   COMPONENT
================================ */

const QuotationEstimator = () => {

  const [items, setItems] = useState<Item[]>([]);

  const [material, setMaterial] = useState("Cement");

  const [quantity, setQuantity] = useState("");

  const [delivery, setDelivery] = useState("0");

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);


  /* ================================
     MATERIAL PRICES
  ================================= */

  const materialPrices: Record<string, number> = {

    Cement: 420,

    "Steel Rods": 65000,

    Bricks: 9,

    Sand: 1800,

    Tiles: 85,

    Pipes: 250,

    Paints: 450,

    Tools: 500,

  };


  /* ================================
     ADD MATERIAL
  ================================= */

  const addItem = () => {

    const qty = Number(quantity);

    if (!qty || qty <= 0) {

      alert("Please enter a valid quantity.");

      return;

    }


    const newItem: Item = {

      id: Date.now(),

      material,

      quantity: qty,

      price: materialPrices[material],

    };


    setItems([...items, newItem]);

    setQuantity("");

  };


  /* ================================
     REMOVE MATERIAL
  ================================= */

  const removeItem = (id: number) => {

    setItems(
      items.filter((item) => item.id !== id)
    );

  };


  /* ================================
     CALCULATIONS
  ================================= */

  const subtotal = items.reduce(

    (total, item) =>
      total + item.quantity * item.price,

    0

  );


  const deliveryCharge =
    Number(delivery) || 0;


  const gst =
    (subtotal + deliveryCharge) * 0.18;


  const grandTotal =
    subtotal +
    deliveryCharge +
    gst;


  /* ================================
     FILTER SUPPLIERS
  ================================= */

  const nearbySuppliers =
    suppliers.filter((supplier) =>
      supplier.materials.includes(material)
    );


  /* ================================
     RESET
  ================================= */

  const resetQuotation = () => {

    setItems([]);

    setMaterial("Cement");

    setQuantity("");

    setDelivery("0");

    setSelectedSupplier(null);

  };


  /* ================================
     UI
  ================================= */

  return (

    <div className="min-h-screen bg-[#F7F1E7] text-[#291C0E] px-4 py-10">

      <div className="mx-auto max-w-7xl">


        {/* =====================================
            BACK TO HOME
        ===================================== */}

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-[#6E473B] hover:text-[#291C0E]"
        >

          <ArrowLeft size={18} />

          Back to Home

        </Link>



        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">

            <FileText size={32} />

          </div>


          <p className="mt-5 text-sm font-bold tracking-[0.25em] text-[#6E473B]">

            CONSTRUCTION TOOL

          </p>


          <h1 className="mt-3 text-4xl font-black sm:text-5xl">

            Quotation Estimator

          </h1>


          <p className="mx-auto mt-4 max-w-2xl text-[#6E473B]">

            Create an estimated quotation for construction
            materials, including delivery charges and GST.

          </p>

        </div>



        {/* =====================================
            MAIN SECTION
        ===================================== */}

        <div className="grid gap-8 lg:grid-cols-3">


          {/* =====================================
              ADD MATERIALS
          ===================================== */}

          <div className="rounded-3xl border border-[#D8C8B8] bg-white p-7 shadow-lg lg:col-span-1">


            <h2 className="text-2xl font-bold">

              Add Materials

            </h2>


            <p className="mt-2 text-sm text-[#6E473B]">

              Select materials and enter their quantity.

            </p>



            {/* MATERIAL */}

            <div className="mt-7">

              <label className="mb-2 block font-semibold">

                Material

              </label>


              <select
                value={material}
                onChange={(e) => {

                  setMaterial(e.target.value);

                  setSelectedSupplier(null);

                }}
                className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 outline-none focus:border-[#6E473B]"
              >

                {Object.keys(materialPrices).map(
                  (name) => (

                    <option
                      key={name}
                      value={name}
                    >

                      {name}

                    </option>

                  )
                )}

              </select>

            </div>



            {/* PRICE */}

            <div className="mt-5 rounded-xl bg-[#F7F1E7] p-4">

              <p className="text-sm text-[#6E473B]">

                Approximate price

              </p>


              <p className="mt-1 text-xl font-bold">

                ₹
                {materialPrices[
                  material
                ].toLocaleString("en-IN")}

              </p>

            </div>



            {/* QUANTITY */}

            <div className="mt-5">

              <label className="mb-2 block font-semibold">

                Quantity

              </label>


              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                placeholder="Enter quantity"
                className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 outline-none focus:border-[#6E473B]"
              />

            </div>



            {/* ADD BUTTON */}

            <button
              onClick={addItem}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3 font-bold text-[#F7F1E7] transition hover:bg-[#815547]"
            >

              <Plus size={19} />

              Add Material

            </button>



            {/* DELIVERY */}

            <div className="mt-7">

              <label className="mb-2 block font-semibold">

                Delivery Charges

              </label>


              <div className="relative">

                <span className="absolute left-4 top-3 text-[#6E473B]">

                  ₹

                </span>


                <input
                  type="number"
                  min="0"
                  value={delivery}
                  onChange={(e) =>
                    setDelivery(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 pl-9 outline-none focus:border-[#6E473B]"
                />

              </div>

            </div>



            {/* RESET */}

            <button
              onClick={resetQuotation}
              className="mt-4 w-full rounded-xl border-2 border-[#D8C8B8] px-6 py-3 font-bold text-[#6E473B] hover:bg-[#F7F1E7]"
            >

              Reset Quotation

            </button>

          </div>



          {/* =====================================
              QUOTATION
          ===================================== */}

          <div className="rounded-3xl bg-[#291C0E] p-7 text-[#F7F1E7] shadow-lg lg:col-span-2">


            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-sm font-bold tracking-[0.25em] text-[#C9A66B]">

                  ESTIMATE

                </p>


                <h2 className="mt-2 text-3xl font-black">

                  Material Quotation

                </h2>

              </div>


              <FileText
                size={35}
                className="text-[#C9A66B]"
              />

            </div>



            {/* TABLE */}

            <div className="mt-8 overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>

                  <tr className="border-b border-[#6E473B] text-left text-sm text-[#CDBBAA]">

                    <th className="pb-4">

                      Material

                    </th>


                    <th className="pb-4">

                      Quantity

                    </th>


                    <th className="pb-4">

                      Unit Price

                    </th>


                    <th className="pb-4">

                      Total

                    </th>


                    <th className="pb-4">

                    </th>

                  </tr>

                </thead>



                <tbody>

                  {items.length === 0 ? (

                    <tr>

                      <td
                        colSpan={5}
                        className="py-12 text-center text-[#CDBBAA]"
                      >

                        No materials added yet.

                        <br />

                        Add materials from the left panel.

                      </td>

                    </tr>

                  ) : (

                    items.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b border-[#3B291B]"
                      >

                        <td className="py-4 font-semibold">

                          {item.material}

                        </td>


                        <td className="py-4">

                          {item.quantity}

                        </td>


                        <td className="py-4">

                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}

                        </td>


                        <td className="py-4 font-bold text-[#C9A66B]">

                          ₹
                          {(
                            item.quantity *
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </td>


                        <td className="py-4">

                          <button
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="rounded-lg p-2 text-red-300 hover:bg-[#3B291B]"
                          >

                            <Trash2 size={18} />

                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>



            {/* =====================================
                TOTALS
            ===================================== */}

            <div className="mt-8 ml-auto max-w-md space-y-4">


              <div className="flex justify-between text-[#CDBBAA]">

                <span>

                  Subtotal

                </span>


                <span>

                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>



              <div className="flex justify-between text-[#CDBBAA]">

                <span>

                  Delivery

                </span>


                <span>

                  ₹
                  {deliveryCharge.toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>



              <div className="flex justify-between text-[#CDBBAA]">

                <span>

                  GST (18%)

                </span>


                <span>

                  ₹
                  {gst.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}

                </span>

              </div>



              <div className="border-t border-[#6E473B] pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-xl font-bold">

                    Grand Total

                  </span>


                  <span className="flex items-center text-2xl font-black text-[#C9A66B]">

                    <IndianRupee size={22} />

                    {grandTotal.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}

                  </span>

                </div>

              </div>

            </div>



            {/* GENERATE QUOTATION */}

            <button
              onClick={() =>
                alert(
                  "Quotation generated successfully! PDF download can be connected later."
                )
              }
              className="mt-8 flex items-center gap-2 rounded-xl bg-[#C9A66B] px-6 py-3 font-bold text-[#291C0E] transition hover:bg-[#D8B978]"
            >

              <Download size={19} />

              Generate Quotation

            </button>

          </div>

        </div>



        {/* ==================================================
            NEARBY SUPPLIERS
        ================================================== */}

        <div className="mt-10 rounded-3xl border border-[#D8C8B8] bg-[#291C0E] p-7 text-[#F7F1E7] shadow-lg">


          {/* SUPPLIER HEADER */}

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold tracking-[0.25em] text-[#C9A66B]">

                LOCAL SUPPLIERS

              </p>


              <h2 className="mt-2 text-3xl font-black">

                Nearby Suppliers

              </h2>


              <p className="mt-2 text-[#CDBBAA]">

                Suppliers available for {material}

              </p>

            </div>


            <div className="text-3xl">

              📍

            </div>

          </div>



          {/* SUPPLIER CARDS */}

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">


            {nearbySuppliers.length === 0 ? (

              <div className="rounded-xl bg-[#21160D] p-5 text-[#CDBBAA]">

                No suppliers found for {material}.

              </div>

            ) : (

              nearbySuppliers.map((supplier) => (

                <div
                  key={supplier.id}
                  className={`rounded-2xl border p-5 transition ${
                    selectedSupplier?.id ===
                    supplier.id
                      ? "border-[#C9A66B] bg-[#4A3423]"
                      : "border-[#6E473B] bg-[#21160D]"
                  }`}
                >


                  {/* NAME + RATING */}

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="font-bold leading-6">

                      {supplier.name}

                    </h3>


                    <span className="shrink-0 rounded-lg bg-[#C9A66B] px-2 py-1 text-sm font-bold text-[#291C0E]">

                      ⭐ {supplier.rating}

                    </span>

                  </div>



                  {/* LOCATION */}

                  <p className="mt-3 text-sm text-[#CDBBAA]">

                    📍 {supplier.location}

                  </p>


                  <p className="mt-1 text-sm font-semibold text-[#C9A66B]">

                    {supplier.distance} km away

                  </p>



                  {/* MATERIALS */}

                  <div className="mt-4 flex flex-wrap gap-2">

                    {supplier.materials.map(
                      (item) => (

                        <span
                          key={item}
                          className="rounded-full bg-[#3B291B] px-3 py-1 text-xs text-[#CDBBAA]"
                        >

                          {item}

                        </span>

                      )
                    )}

                  </div>



                  {/* DELIVERY */}

                  <div className="mt-5 text-sm">

                    🚚 Delivery:

                    <span className="ml-2 font-bold text-green-300">

                      {supplier.delivery}

                    </span>

                  </div>



                  {/* SELECT SUPPLIER */}

                  <button
                    onClick={() =>
                      setSelectedSupplier(
                        supplier
                      )
                    }
                    className={`mt-5 w-full rounded-xl px-4 py-3 font-bold transition ${
                      selectedSupplier?.id ===
                      supplier.id
                        ? "bg-[#C9A66B] text-[#291C0E]"
                        : "border border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#291C0E]"
                    }`}
                  >

                    {selectedSupplier?.id ===
                    supplier.id
                      ? "✓ Supplier Selected"
                      : "Select Supplier"}

                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default QuotationEstimator;
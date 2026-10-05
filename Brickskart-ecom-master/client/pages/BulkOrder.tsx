import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  ShoppingCart,
  Truck,
  FileText,
  MapPin,
  User,
} from "lucide-react";


type Material = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
};

const BulkOrder = () => {
  /* =========================
     CUSTOMER INFORMATION
  ========================= */

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");

  /* =========================
     MATERIALS
  ========================= */

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: "Cement",
      quantity: 100,
      unit: "Bags",
      price: 420,
    },
    {
      id: 2,
      name: "TMT Steel",
      quantity: 1000,
      unit: "KG",
      price: 68,
    },
    {
      id: 3,
      name: "Bricks",
      quantity: 5000,
      unit: "Pieces",
      price: 8.5,
    },
  ]);

  /* =========================
     ADD MATERIAL
  ========================= */

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "New Material",
        quantity: 1,
        unit: "Unit",
        price: 0,
      },
    ]);
  };

  /* =========================
     REMOVE MATERIAL
  ========================= */

  const removeMaterial = (id: number) => {
    setMaterials((prev) =>
      prev.filter((material) => material.id !== id)
    );
  };

  /* =========================
     UPDATE MATERIAL
  ========================= */

  const updateMaterial = (
    id: number,
    field: keyof Material,
    value: string | number
  ) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id
          ? {
              ...material,
              [field]:
                field === "quantity" || field === "price"
                  ? Number(value)
                  : value,
            }
          : material
      )
    );
  };

  /* =========================
     CALCULATIONS
  ========================= */

  const subtotal = useMemo(() => {
    return materials.reduce(
      (total, material) =>
        total +
        material.quantity * material.price,
      0
    );
  }, [materials]);

  const gst = subtotal * 0.18;

  const deliveryCharge =
    subtotal >= 100000 ? 0 : 2500;

  const grandTotal =
    subtotal + gst + deliveryCharge;

  /* =========================
     PLACE ORDER
  ========================= */

  const placeOrder = () => {
    if (
      !customerName ||
      !phone ||
      !deliveryLocation
    ) {
      alert(
        "Please fill in customer name, phone number and delivery location."
      );
      return;
    }

    alert(
      `Bulk order request submitted successfully!\n\nTotal Amount: ₹${grandTotal.toLocaleString()}`
    );
  };

  return (
   
      <div className="min-h-screen bg-[#F7F0E5]">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className="bg-[#2B1A0D] text-white">

          <div className="max-w-7xl mx-auto px-6 py-14">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#6E473B] flex items-center justify-center">
                <ShoppingCart
                  size={25}
                  className="text-[#D2AD68]"
                />
              </div>

              <span className="text-sm tracking-[0.25em] uppercase text-[#D2AD68] font-semibold">
                BricksKart
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Bulk Order
            </h1>

            <p className="mt-4 max-w-2xl text-white/70 text-lg">
              Order construction materials in large
              quantities for residential, commercial
              and industrial projects.
            </p>

          </div>

        </section>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="lg:col-span-2 space-y-6">

              {/* CUSTOMER INFORMATION */}

              <section className="bg-[#FFFDF8] border border-[#DCCBB8] rounded-2xl p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-10 h-10 rounded-lg bg-[#6E473B] flex items-center justify-center">
                    <User
                      size={20}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[#2B1A0D]">
                      Customer Information
                    </h2>

                    <p className="text-sm text-[#765548]">
                      Enter your project and contact details.
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="text-sm font-semibold text-[#2B1A0D]">
                      Customer Name
                    </label>

                    <input
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(e.target.value)
                      }
                      placeholder="Enter your name"
                      className="mt-2 w-full rounded-lg border border-[#D8C5B0] bg-[#F9F4EC] px-4 py-3 outline-none focus:border-[#6E473B]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#2B1A0D]">
                      Phone Number
                    </label>

                    <input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="Enter phone number"
                      className="mt-2 w-full rounded-lg border border-[#D8C5B0] bg-[#F9F4EC] px-4 py-3 outline-none focus:border-[#6E473B]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#2B1A0D]">
                      Project Name
                    </label>

                    <input
                      value={projectName}
                      onChange={(e) =>
                        setProjectName(e.target.value)
                      }
                      placeholder="Example: My House Project"
                      className="mt-2 w-full rounded-lg border border-[#D8C5B0] bg-[#F9F4EC] px-4 py-3 outline-none focus:border-[#6E473B]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#2B1A0D]">
                      Delivery Location
                    </label>

                    <input
                      value={deliveryLocation}
                      onChange={(e) =>
                        setDeliveryLocation(e.target.value)
                      }
                      placeholder="Enter delivery address"
                      className="mt-2 w-full rounded-lg border border-[#D8C5B0] bg-[#F9F4EC] px-4 py-3 outline-none focus:border-[#6E473B]"
                    />
                  </div>

                </div>

              </section>

              {/* MATERIALS */}

              <section className="bg-[#FFFDF8] border border-[#DCCBB8] rounded-2xl p-6 shadow-sm">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                  <div>
                    <h2 className="text-xl font-bold text-[#2B1A0D]">
                      Construction Materials
                    </h2>

                    <p className="text-sm text-[#765548] mt-1">
                      Select materials and enter required quantities.
                    </p>
                  </div>

                  <button
                    onClick={addMaterial}
                    className="flex items-center justify-center gap-2 bg-[#6E473B] text-white px-4 py-2.5 rounded-lg hover:bg-[#58382F] transition"
                  >
                    <Plus size={18} />
                    Add Material
                  </button>

                </div>

                <div className="space-y-4">

                  {materials.map((material) => {

                    const itemTotal =
                      material.quantity *
                      material.price;

                    return (
                      <div
                        key={material.id}
                        className="border border-[#DCCBB8] rounded-xl p-4 bg-[#F9F4EC]"
                      >

                        <div className="grid md:grid-cols-5 gap-4 items-end">

                          {/* MATERIAL */}

                          <div className="md:col-span-2">

                            <label className="text-xs font-semibold text-[#765548]">
                              Material
                            </label>

                            <input
                              value={material.name}
                              onChange={(e) =>
                                updateMaterial(
                                  material.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 w-full border border-[#D8C5B0] rounded-lg px-3 py-2.5 bg-white outline-none focus:border-[#6E473B]"
                            />

                          </div>

                          {/* QUANTITY */}

                          <div>

                            <label className="text-xs font-semibold text-[#765548]">
                              Quantity
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={material.quantity}
                              onChange={(e) =>
                                updateMaterial(
                                  material.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="mt-1 w-full border border-[#D8C5B0] rounded-lg px-3 py-2.5 bg-white outline-none focus:border-[#6E473B]"
                            />

                          </div>

                          {/* UNIT */}

                          <div>

                            <label className="text-xs font-semibold text-[#765548]">
                              Unit
                            </label>

                            <select
                              value={material.unit}
                              onChange={(e) =>
                                updateMaterial(
                                  material.id,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="mt-1 w-full border border-[#D8C5B0] rounded-lg px-3 py-2.5 bg-white outline-none focus:border-[#6E473B]"
                            >
                              <option>Bags</option>
                              <option>KG</option>
                              <option>Tons</option>
                              <option>Pieces</option>
                              <option>Sq.ft</option>
                              <option>Units</option>
                            </select>

                          </div>

                          {/* PRICE */}

                          <div>

                            <label className="text-xs font-semibold text-[#765548]">
                              Price / Unit
                            </label>

                            <input
                              type="number"
                              min="0"
                              value={material.price}
                              onChange={(e) =>
                                updateMaterial(
                                  material.id,
                                  "price",
                                  e.target.value
                                )
                              }
                              className="mt-1 w-full border border-[#D8C5B0] rounded-lg px-3 py-2.5 bg-white outline-none focus:border-[#6E473B]"
                            />

                          </div>

                        </div>

                        <div className="mt-4 flex items-center justify-between">

                          <div>

                            <span className="text-sm text-[#765548]">
                              Item Total
                            </span>

                            <span className="ml-3 font-bold text-[#6E473B]">
                              ₹{itemTotal.toLocaleString()}
                            </span>

                          </div>

                          <button
                            onClick={() =>
                              removeMaterial(material.id)
                            }
                            className="text-[#8B1E3F] hover:text-red-700"
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </section>

              {/* DELIVERY & NOTES */}

              <section className="bg-[#FFFDF8] border border-[#DCCBB8] rounded-2xl p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-lg bg-[#CDA85F] flex items-center justify-center">
                    <Truck
                      size={20}
                      className="text-[#2B1A0D]"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-[#2B1A0D]">
                    Delivery & Order Notes
                  </h2>

                </div>

                <label className="text-sm font-semibold text-[#2B1A0D]">
                  Additional Requirements
                </label>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Mention preferred delivery date, special requirements, unloading instructions, etc."
                  rows={5}
                  className="mt-2 w-full border border-[#D8C5B0] rounded-lg px-4 py-3 bg-[#F9F4EC] outline-none focus:border-[#6E473B]"
                />

              </section>

            </div>

            {/* =========================
                RIGHT SUMMARY
            ========================= */}

            <aside>

              <div className="bg-[#2B1A0D] text-white rounded-2xl p-6 sticky top-24">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-[#6E473B] flex items-center justify-center">
                    <FileText
                      size={21}
                      className="text-[#D2AD68]"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Order Summary
                    </h2>

                    <p className="text-sm text-white/60">
                      Estimated bulk order cost
                    </p>
                  </div>

                </div>

                {/* SUMMARY */}

                <div className="space-y-4">

                  <div className="flex justify-between text-white/75">
                    <span>Materials</span>
                    <span>
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-white/75">
                    <span>GST (18%)</span>
                    <span>
                      ₹{gst.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-white/75">
                    <span>Delivery</span>
                    <span>
                      {deliveryCharge === 0
                        ? "FREE"
                        : `₹${deliveryCharge.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="border-t border-white/20 pt-4">

                    <div className="flex justify-between items-center">

                      <span className="text-lg font-semibold">
                        Grand Total
                      </span>

                      <span className="text-2xl font-bold text-[#D2AD68]">
                        ₹{grandTotal.toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

                {/* DELIVERY */}

                <div className="mt-6 bg-white/5 rounded-xl p-4">

                  <div className="flex gap-3">

                    <MapPin
                      size={20}
                      className="text-[#D2AD68] mt-1"
                    />

                    <div>

                      <p className="font-semibold">
                        Delivery Location
                      </p>

                      <p className="text-sm text-white/60 mt-1">
                        {deliveryLocation ||
                          "Not specified"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ORDER BUTTON */}

                <button
                  onClick={placeOrder}
                  className="w-full mt-6 bg-[#CDA85F] text-[#2B1A0D] font-bold py-3.5 rounded-xl hover:bg-[#D9B978] transition"
                >
                  Place Bulk Order
                </button>

                <p className="text-xs text-white/50 text-center mt-4">
                  Final pricing may vary based on supplier
                  availability and delivery distance.
                </p>

              </div>

            </aside>

          </div>

        </main>

      </div>
   
  );
};

export default BulkOrder;
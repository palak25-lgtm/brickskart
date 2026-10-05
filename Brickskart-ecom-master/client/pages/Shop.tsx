import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Search, Star, Filter, X } from "lucide-react";
import Layout from "@/components/Layout";
import { addToCart, getUser } from "@/utils/storage";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = getUser();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")
      ? [searchParams.get("category")!]
      : []
  );

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [addedProducts, setAddedProducts] = useState<number[]>([]);

  /* =========================
     LOAD PRODUCTS
  ========================= */

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
      });
  }, []);

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = (
    e: React.MouseEvent,
    product: any
  ) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart({
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    setAddedProducts((prev) =>
      prev.includes(product.product_id)
        ? prev
        : [...prev, product.product_id]
    );
  };

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
  }, [products]);

  /* =========================
     TYPES
     Only show types for
     selected categories
  ========================= */

  const availableTypes = useMemo(() => {
    let data = products;

    if (selectedCategories.length > 0) {
      data = data.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    return Array.from(
      new Set(
        data
          .map((product) => product.material_type)
          .filter(Boolean)
      )
    );
  }, [products, selectedCategories]);

  /* =========================
     BRANDS
  ========================= */

  const availableBrands = useMemo(() => {
    let data = products;

    if (selectedCategories.length > 0) {
      data = data.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedTypes.length > 0) {
      data = data.filter((product) =>
        selectedTypes.includes(product.material_type)
      );
    }

    return Array.from(
      new Set(
        data
          .map((product) => product.brand)
          .filter(Boolean)
      )
    );
  }, [
    products,
    selectedCategories,
    selectedTypes,
  ]);

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {

      /* Category */

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      /* Material Type */

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(product.material_type);

      /* Brand */

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      /* Search */

      const productName = String(
        product.product_name ?? ""
      );

      const description = String(
        product.description ?? ""
      );

      const matchesSearch =
        productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesType &&
        matchesBrand &&
        matchesSearch
      );
    });

    /* Sorting */

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      filtered.sort(
        (a, b) =>
          (b.rating || 0) - (a.rating || 0)
      );
    }

    if (sortBy === "name") {
      filtered.sort((a, b) =>
        String(a.product_name).localeCompare(
          String(b.product_name)
        )
      );
    }

    return filtered;
  }, [
    products,
    selectedCategories,
    selectedTypes,
    selectedBrands,
    searchQuery,
    sortBy,
  ]);

  /* =========================
     CATEGORY TOGGLE
  ========================= */

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter(
          (item) => item !== category
        );
      }

      return [...prev, category];
    });

    /* Clear lower-level filters
       when category changes */

    setSelectedTypes([]);
    setSelectedBrands([]);
  };

  /* =========================
     TYPE TOGGLE
  ========================= */

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter(
          (item) => item !== type
        );
      }

      return [...prev, type];
    });

    setSelectedBrands([]);
  };

  /* =========================
     BRAND TOGGLE
  ========================= */

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter(
          (item) => item !== brand
        );
      }

      return [...prev, brand];
    });
  };

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  return (
    <Layout>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Shop All Products
          </h1>

          {/* SEARCH */}

          <div className="relative mb-6">

            <div className="flex items-center bg-white rounded-full border-2 border-[#D9A6B5] px-4 py-2 focus-within:border-[#B22222] transition-colors">

              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="ml-2 flex-1 outline-none text-gray-900"
              />

            </div>

          </div>

        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid lg:grid-cols-4 gap-6">

          {/* ================= SIDEBAR ================= */}

          <div className="hidden lg:block">

            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">

              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Filter size={18} />
                Filters
              </h3>

              {/* ================= CATEGORIES ================= */}

              <div className="mb-6">

                <h4 className="font-bold text-gray-900 mb-3 text-sm">
                  Categories
                </h4>

                <div className="space-y-2">

                  {categories.map((category) => (

                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer hover:text-[#8B1E3F] transition-colors"
                    >

                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category
                        )}
                        onChange={() =>
                          toggleCategory(category)
                        }
                        className="w-4 h-4 accent-[#8B1E3F]"
                      />

                      <span className="text-sm text-gray-700">
                        {category}
                      </span>

                    </label>

                  ))}

                </div>

              </div>

              {/* ================= MATERIAL TYPES ================= */}

              {selectedCategories.length > 0 &&
                availableTypes.length > 0 && (

                  <div className="border-t pt-5 mb-6">

                    <h4 className="font-bold text-gray-900 mb-3 text-sm">
                      Material Type
                    </h4>

                    <div className="space-y-2">

                      {availableTypes.map((type) => (

                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer hover:text-[#8B1E3F]"
                        >

                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(
                              type
                            )}
                            onChange={() =>
                              toggleType(type)
                            }
                            className="w-4 h-4 accent-[#8B1E3F]"
                          />

                          <span className="text-sm text-gray-700">
                            {type}
                          </span>

                        </label>

                      ))}

                    </div>

                  </div>

                )}

              {/* ================= BRANDS ================= */}

              {selectedCategories.length > 0 &&
                availableBrands.length > 0 && (

                  <div className="border-t pt-5 mb-6">

                    <h4 className="font-bold text-gray-900 mb-3 text-sm">
                      Brands
                    </h4>

                    <div className="space-y-2">

                      {availableBrands.map((brand) => (

                        <label
                          key={brand}
                          className="flex items-center gap-2 cursor-pointer hover:text-[#8B1E3F]"
                        >

                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(
                              brand
                            )}
                            onChange={() =>
                              toggleBrand(brand)
                            }
                            className="w-4 h-4 accent-[#8B1E3F]"
                          />

                          <span className="text-sm text-gray-700">
                            {brand}
                          </span>

                        </label>

                      ))}

                    </div>

                  </div>

                )}

              {/* ================= SORT ================= */}

              <div className="border-t pt-4">

                <h4 className="font-bold text-gray-900 mb-3 text-sm">
                  Sort By
                </h4>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22222] text-sm"
                >

                  <option value="featured">
                    Featured
                  </option>

                  <option value="name">
                    Name A-Z
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Rating: High to Low
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ================= MOBILE FILTER BUTTON ================= */}

          <div className="lg:hidden mb-6">

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 px-4 py-3 rounded-lg font-semibold text-gray-900 hover:border-[#B22222] transition-colors"
            >

              <Filter size={18} />

              Filters

            </button>

          </div>

          {/* ================= MOBILE FILTERS ================= */}

          {showFilters && (

            <div className="lg:hidden bg-white rounded-xl shadow-sm p-6 mb-6">

              <div className="flex justify-between items-center mb-5">

                <h3 className="font-bold text-lg">
                  Filters
                </h3>

                <button
                  onClick={() =>
                    setShowFilters(false)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              {/* Categories */}

              <div className="mb-6">

                <h4 className="font-bold mb-3">
                  Categories
                </h4>

                <div className="space-y-2">

                  {categories.map((category) => (

                    <label
                      key={category}
                      className="flex items-center gap-2"
                    >

                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category
                        )}
                        onChange={() =>
                          toggleCategory(category)
                        }
                        className="w-4 h-4 accent-[#8B1E3F]"
                      />

                      <span className="text-sm">
                        {category}
                      </span>

                    </label>

                  ))}

                </div>

              </div>

              {/* Types */}

              {selectedCategories.length > 0 &&
                availableTypes.length > 0 && (

                  <div className="border-t pt-5 mb-6">

                    <h4 className="font-bold mb-3">
                      Material Type
                    </h4>

                    <div className="space-y-2">

                      {availableTypes.map((type) => (

                        <label
                          key={type}
                          className="flex items-center gap-2"
                        >

                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(
                              type
                            )}
                            onChange={() =>
                              toggleType(type)
                            }
                            className="w-4 h-4 accent-[#8B1E3F]"
                          />

                          <span className="text-sm">
                            {type}
                          </span>

                        </label>

                      ))}

                    </div>

                  </div>

                )}

              {/* Brands */}

              {selectedCategories.length > 0 &&
                availableBrands.length > 0 && (

                  <div className="border-t pt-5 mb-6">

                    <h4 className="font-bold mb-3">
                      Brands
                    </h4>

                    <div className="space-y-2">

                      {availableBrands.map((brand) => (

                        <label
                          key={brand}
                          className="flex items-center gap-2"
                        >

                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(
                              brand
                            )}
                            onChange={() =>
                              toggleBrand(brand)
                            }
                            className="w-4 h-4 accent-[#8B1E3F]"
                          />

                          <span className="text-sm">
                            {brand}
                          </span>

                        </label>

                      ))}

                    </div>

                  </div>

                )}

            </div>

          )}

          {/* ================= PRODUCTS ================= */}

          <div className="lg:col-span-3">

            {filteredProducts.length > 0 ? (

              <>

                <p className="text-gray-600 mb-6 font-semibold">
                  Showing {filteredProducts.length} products
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {filteredProducts.map((product) => (

                    <Link
                      key={product.product_id}
                      to={`/product/${product.product_id}`}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 hover:border-pink-200"
                    >

                      {/* IMAGE */}

                      <div className="relative overflow-hidden bg-gray-100 h-40 sm:h-48">

                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        <div className="absolute top-2 right-2 bg-[#B22222] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {Math.floor(
                            Math.random() * 30 + 10
                          )}
                          % OFF
                        </div>

                        {product.stock < 20 && (

                          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Low Stock
                          </div>

                        )}

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="p-4">

                        <p className="text-xs text-[#B22222] font-bold uppercase mb-1">
                          {product.category}
                        </p>

                        {/* TYPE */}

                        {product.material_type && (

                          <p className="text-xs text-gray-500 mb-1">
                            Type:{" "}
                            <span className="font-semibold">
                              {product.material_type}
                            </span>
                          </p>

                        )}

                        {/* BRAND */}

                        {product.brand && (

                          <p className="text-xs text-gray-500 mb-2">
                            Brand:{" "}
                            <span className="font-semibold">
                              {product.brand}
                            </span>
                          </p>

                        )}

                        <h3 className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                          {product.product_name}
                        </h3>

                        {/* RATING */}

                        <div className="flex items-center gap-1 mb-2">

                          <div className="flex">

                            {[...Array(5)].map(
                              (_, i) => (

                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i <
                                    Math.floor(
                                      product.rating || 0
                                    )
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />

                              )
                            )}

                          </div>

                          <span className="text-xs text-gray-600">
                            ({Math.floor(
                              Math.random() * 1000 + 100
                            )})
                          </span>

                        </div>

                        {/* PRICE */}

                        <div className="mb-3">

                          <p className="text-[#8B1E3F] font-bold text-lg">
                            ₹{product.price}
                          </p>

                          <p className="text-xs text-gray-500 line-through">
                            ₹
                            {Math.floor(
                              product.price * 1.3
                            )}
                          </p>

                        </div>

                        {/* DELIVERY */}

                        <p className="text-xs text-green-600 font-semibold mb-3">
                          ✓ Fast Delivery Available
                        </p>

                        {/* CART BUTTON */}

                        <button
                          onClick={(e) =>
                            handleAddToCart(
                              e,
                              product
                            )
                          }
                          className={`w-full text-white py-2 rounded-lg text-xs font-bold transition-colors active:scale-95 ${
                            addedProducts.includes(
                              product.product_id
                            )
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-[#B22222] hover:bg-[#8B1A1A]"
                          }`}
                        >

                          {addedProducts.includes(
                            product.product_id
                          )
                            ? "✓ Added to Cart"
                            : "Add to Cart"}

                        </button>

                      </div>

                    </Link>

                  ))}

                </div>

              </>

            ) : (

              <div className="bg-white rounded-xl p-12 text-center col-span-full">

                <h3 className="text-xl font-bold mb-2">
                  No products found
                </h3>

                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query
                </p>

                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#8B1A1A] transition-colors font-bold"
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Shop;
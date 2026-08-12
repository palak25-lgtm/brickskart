import { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("/api/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_name: productName,
      category,
      price,
      stock,
      image: "default.jpg",
      description: "New Product",
    }),
  });

  if (response.ok) {
    alert("Product Added Successfully!");

    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
  } else {
    alert("Failed to Add Product");
  }
};

  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full mb-4"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full mb-4"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
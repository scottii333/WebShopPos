import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Inventory = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  // State for product inputs
  const [product, setProduct] = useState({
    code: "",
    description: "",
    qty: "",
    price: "",
  });

  // State for storing products
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5211/api/Admin/FetchProducts"
      ); // Update endpoint if needed
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/"); // Navigate back to the index route
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !product.code ||
      !product.description ||
      !product.qty ||
      !product.price
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Map `qty` to `Quantity` for backend compatibility
      const payload = {
        code: product.code,
        description: product.description,
        quantity: parseInt(product.qty, 10), // Ensure the value is an integer
        price: parseFloat(product.price), // Ensure the value is a float
      };

      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:5211/api/Admin/AddProduct",
        payload
      ); // Update endpoint if needed
      alert(response.data.message || "Product added successfully.");
      setProduct({
        code: "",
        description: "",
        qty: "",
        price: "",
      }); // Reset form fields
      fetchProducts(); // Refresh the product list
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center flex-col min-h-[100dvh] h-auto bg-[#dcf3f3]">
      <div className="mt-[5rem] w-[90%] border-b-[1px] border-black flex justify-between items-center">
        <h1 className="text-[1.5rem]">INVENTORY</h1>
        <div className="flex gap-[1rem]">
          <button
            onClick={goToDashboard}
            className="text-[1.5rem] hover:text-[#77b9b9]"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="text-[1.5rem] hover:text-[#77b9b9]"
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="mt-[5rem] w-[90%] flex flex-col items-center gap-[1rem] ">
        <h2 className="text-[1.4rem] font-semibold">Add Product</h2>
        <form
          onSubmit={handleAddProduct}
          className="flex flex-col gap-[1rem] w-full max-w-[500px]"
        >
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={handleChange}
            placeholder="Product Code"
            className="p-[1rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="p-[1rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="qty"
            value={product.qty}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-[1rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-[1rem] border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-[#d3d3c3] text-black py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 hover:text-white"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="mt-[2rem] w-[90%] flex flex-col items-center mb-[15rem]">
        <h2 className="text-[1.4rem] font-semibold">Product List</h2>
        <table className="w-full max-w-[600px] mt-[1rem] border-collapse text-left shadow-lg">
          <thead>
            <tr className="bg-[#d3d3c3] text-black">
              <th className="border border-gray-300 p-3">Product Code</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3">Quantity</th>
              <th className="border border-gray-300 p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="border border-gray-300 p-3">{prod.code}</td>
                <td className="border border-gray-300 p-3">
                  {prod.description}
                </td>
                <td className="border border-gray-300 p-3">{prod.quantity}</td>
                <td className="border border-gray-300 p-3">₱{prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

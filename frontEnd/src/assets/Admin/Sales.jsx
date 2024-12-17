import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Sales = () => {
  const navigate = useNavigate(); // Navigation hook

  // State for storing products
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellQty, setSellQty] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5211/api/Admin/FetchProducts"
      );
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

  const handleSell = async () => {
    if (!selectedProduct || !sellQty) {
      alert("Please select a product and enter a quantity.");
      return;
    }

    if (sellQty <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    if (sellQty > selectedProduct.quantity) {
      alert("Insufficient stock for the selected product.");
      return;
    }

    try {
      // Send POST request to backend to deduct the quantity
      const response = await axios.post(
        "http://localhost:5211/api/Admin/DeductQuantity",
        {
          productId: selectedProduct.id,
          quantity: sellQty,
        }
      );

      alert(response.data.message || "Sale processed successfully.");
      setSellQty(""); // Reset the input
      fetchProducts(); // Refresh product list
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center flex-col h-[100dvh] bg-[#dcf3f3]">
      <div className="mt-[5rem] w-[90%] border-b-[1px] border-black flex justify-between items-center">
        <h1 className="text-[1.5rem]">SALES</h1>
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

      {/* Sales Form */}
      <div className="mt-[2rem] w-[90%] flex flex-col items-center gap-[1rem]">
        <h2 className="text-[1.4rem] font-semibold">Sell Product</h2>
        <select
          onChange={(e) =>
            setSelectedProduct(
              products.find((p) => p.id === parseInt(e.target.value))
            )
          }
          className="p-[1rem] border rounded-md w-full max-w-[500px]"
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.code} - {product.description} (Qty: {product.quantity})
            </option>
          ))}
        </select>
        <input
          type="number"
          value={sellQty}
          onChange={(e) => setSellQty(parseInt(e.target.value) || "")}
          placeholder="Quantity to Sell"
          className="p-[1rem] border rounded-md w-full max-w-[500px] focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSell}
          className="bg-[#d3d3c3] text-black py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 hover:text-white"
        >
          Process Sale
        </button>
      </div>
    </div>
  );
};

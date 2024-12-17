import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Sales = () => {
  const navigate = useNavigate();

  // States
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellQty, setSellQty] = useState("");
  const [salesHistory, setSalesHistory] = useState([]);

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

  // Fetch sales history from backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5211/api/Admin/FetchHistory"
      );
      setSalesHistory(response.data);
    } catch (error) {
      console.error("Error fetching sales history:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchHistory();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
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
      const response = await axios.post(
        "http://localhost:5211/api/Admin/DeductQuantity",
        {
          productId: selectedProduct.id,
          quantity: sellQty,
        }
      );
      alert(response.data.message || "Sale processed successfully.");
      setSellQty("");
      fetchProducts();
      fetchHistory();
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center flex-col min-h-[100dvh] h-auto bg-[#dcf3f3]">
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

      {/* Sales History Table */}
      <div className="mt-[3rem] w-[90%] flex flex-col items-center mb-[10rem]">
        <h2 className="text-[1.4rem] font-semibold">Sales History</h2>
        <table className="w-full max-w-[600px] mt-[1rem] border-collapse text-left shadow-lg">
          <thead>
            <tr className="bg-[#d3d3c3] text-black">
              <th className="border border-gray-300 p-3">Product Code</th>
              <th className="border border-gray-300 p-3">Quantity Sold</th>
              <th className="border border-gray-300 p-3">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map((history, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-100`}
              >
                <td className="border border-gray-300 p-3">
                  {history.productCode}
                </td>
                <td className="border border-gray-300 p-3">
                  {history.quantitySold}
                </td>
                <td className="border border-gray-300 p-3">
                  {new Date(history.saleDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Setting = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const [accounts, setAccounts] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Fetch admin accounts
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5211/api/Admin/AllAccounts"
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching admin accounts:", error);
    }
  };

  // Handle input change for new admin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  // Handle add admin form submission
  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5211/api/Admin/AddAdmin",
        newAdmin
      );
      alert(response.data || "Admin added successfully.");
      setNewAdmin({ username: "", email: "", password: "" }); // Reset form
      fetchAccounts(); // Refresh admin list
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchAccounts(); // Fetch accounts on component mount
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/"); // Navigate back to index route
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Navigate to dashboard
  };

  return (
    <div className="flex items-center flex-col h-[100dvh] bg-[#dcf3f3]">
      <div className="mt-[5rem] w-[90%] border-b-[1px] border-black flex justify-between items-center">
        <h1 className="text-[1.5rem]">SETTING</h1>
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

      <div className="w-[90%] flex justify-around mt-[5rem]">
        {/* Admins List */}
        <div className="flex flex-col gap-[1rem] h-[15rem] items-center overflow-y-auto w-[10rem]">
          <h1>Admins:</h1>
          {accounts.map((account, index) => (
            <div
              key={index}
              className="p-[0.5rem] w-full text-center border rounded-md shadow-md"
            >
              {account.username || "No Username"}
            </div>
          ))}
        </div>

        {/* Add Admin Form */}
        <form
          onSubmit={handleAddAdmin}
          className="flex flex-col w-full max-w-xs"
        >
          <input
            type="text"
            name="username"
            value={newAdmin.username}
            onChange={handleChange}
            placeholder="Username"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            value={newAdmin.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            value={newAdmin.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-[#d3d3c3] text-black py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 hover:text-white"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

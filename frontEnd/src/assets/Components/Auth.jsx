import { useState } from "react";
import axios from "axios";
import Logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate(); // Initialize the navigation hook

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", username: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.username)
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      if (isLogin) {
        // Login Request
        const response = await axios.post(
          "http://localhost:5211/api/Admin/Login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        alert(response.data.message || "Login successful!");
        navigate("/dashboard"); // Navigate to the dashboard on successful login
      } else {
        // Register Request
        const response = await axios.post(
          "http://localhost:5211/api/Admin/Register",
          formData
        );
        alert(response.data || "Account created successfully!");
      }
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#bdd1d1]">
      <div className="border border-black rounded-lg shadow-lg w-[30rem] h-[35rem] bg-white p-6 flex flex-col items-center">
        <img className="w-[7rem] mb-4" src={Logo} alt="Logo" />
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Your Partner in Smarter, Efficient Inventory Management
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs">
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-6 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleAuthMode}
            className="text-blue-500 underline hover:text-blue-700 transition duration-300 ml-1"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

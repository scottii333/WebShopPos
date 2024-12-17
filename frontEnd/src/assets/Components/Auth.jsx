import { useState } from "react";
import Logo from "../Images/Logo.png";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
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
        <form className="flex flex-col w-full max-w-xs">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
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
            className="text-blue-500 underline hover:text-blue-700 transition duration-300"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

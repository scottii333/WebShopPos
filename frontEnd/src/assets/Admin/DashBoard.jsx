import Logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";
export const DashBoard = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLogout = () => {
    // Show confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Perform logout logic
      navigate("/"); // Navigate back to the index route
    }
  };

  const goToSetting = () => {
    navigate("/setting"); // Navigate to the dashboard
  };

  const goToInventory = () => {
    navigate("/inventory"); // Navigate to the dashboard
  };
  const goToReport = () => {
    navigate("/report"); // Navigate to the dashboard
  };

  const goToSales = () => {
    navigate("/sales"); // Navigate to the dashboard
  };
  return (
    <div className="flex items-center flex-col h-[100dvh] bg-[#dcf3f3]">
      <div className="mt-[5rem] w-[90%] border-b-[1px] border-black flex justify-between items-center">
        <h1 className="text-[1.5rem]">DASHBOARD</h1>
        <button
          onClick={handleLogout}
          className="text-[1.5rem] hover:text-[#77b9b9]"
        >
          LOG OUT
        </button>
      </div>

      <div className="flex gap-[4rem] mt-[5rem] m-[1rem] p-[1rem]">
        <div className="flex flex-col items-center">
          <h2 className="text-[1.3rem]">WELCOME TO </h2>
          <img className="w-[8rem]" src={Logo} />
        </div>

        <p className="text-[1.4rem] h-[10rem]  flex items-center justify-center ">
          Your Partner in Smarter, Efficient Inventory Management
        </p>
      </div>

      <div className="flex items-center justify-center flex-wrap w-[25rem] gap-[1rem]">
        <button
          onClick={goToInventory}
          className="p-[1rem] bg-[#d3d3c3] rounded-md hover:underline w-[10rem]"
        >
          View Inventory
        </button>
        <button
          onClick={goToReport}
          className="p-[1rem] bg-[#d3d3c3] rounded-md hover:underline w-[10rem]"
        >
          Generate Reports
        </button>
        <button
          onClick={goToSales}
          className="p-[1rem] bg-[#d3d3c3] rounded-md hover:underline  w-[10rem]"
        >
          Log Sale
        </button>
        <button
          onClick={goToSetting}
          className="p-[1rem] bg-[#d3d3c3] rounded-md hover:underline  w-[10rem]"
        >
          Setting
        </button>
      </div>
    </div>
  );
};

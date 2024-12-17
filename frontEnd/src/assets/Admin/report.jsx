import { useNavigate } from "react-router-dom";

export const Report = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleLogout = () => {
    // Show confirmation alert
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Perform logout logic
      navigate("/"); // Navigate back to the index route
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };
  return (
    <div className="flex items-center flex-col h-[100dvh] bg-[#dcf3f3]">
      <div className="mt-[5rem] w-[90%] border-b-[1px] border-black flex justify-between items-center">
        <h1 className="text-[1.5rem]">REPORT</h1>
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
    </div>
  );
};

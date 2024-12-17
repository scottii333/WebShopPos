import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Report = () => {
  const navigate = useNavigate();

  // State for reports
  const [reportType, setReportType] = useState("bestSelling"); // Default report type
  const [reportData, setReportData] = useState([]);

  // Fetch report data
  const fetchReportData = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:5211/api/Admin/Report?type=${type}`
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  // Fetch data whenever reportType changes
  useEffect(() => {
    fetchReportData(reportType);
  }, [reportType]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/"); // Navigate back to the index route
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  const renderTableHeaders = () => {
    switch (reportType) {
      case "bestSelling":
      case "leastSelling":
        return (
          <>
            <th className="border border-gray-300 p-3">Product Code</th>
            <th className="border border-gray-300 p-3">Description</th>
            <th className="border border-gray-300 p-3">Quantity Sold</th>
          </>
        );
      case "lowStock":
        return (
          <>
            <th className="border border-gray-300 p-3">Product Code</th>
            <th className="border border-gray-300 p-3">Description</th>
            <th className="border border-gray-300 p-3">Stock Remaining</th>
          </>
        );
      case "monthlySummary":
        return (
          <>
            <th className="border border-gray-300 p-3">Month</th>
            <th className="border border-gray-300 p-3">Total Sales</th>
            <th className="border border-gray-300 p-3">Total Revenue</th>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return reportData.map((data, index) => {
      switch (reportType) {
        case "bestSelling":
        case "leastSelling":
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-blue-100`}
            >
              <td className="border border-gray-300 p-3">{data.productCode}</td>
              <td className="border border-gray-300 p-3">{data.description}</td>
              <td className="border border-gray-300 p-3">
                {data.quantitySold}
              </td>
            </tr>
          );
        case "lowStock":
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-blue-100`}
            >
              <td className="border border-gray-300 p-3">{data.productCode}</td>
              <td className="border border-gray-300 p-3">{data.description}</td>
              <td className="border border-gray-300 p-3">
                {data.stockRemaining}
              </td>
            </tr>
          );
        case "monthlySummary":
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-blue-100`}
            >
              <td className="border border-gray-300 p-3">{data.month}</td>
              <td className="border border-gray-300 p-3">{data.totalSales}</td>
              <td className="border border-gray-300 p-3">
                ₱{data.totalRevenue}
              </td>
            </tr>
          );
        default:
          return null;
      }
    });
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

      <div className="mt-[2rem] flex gap-[1rem]">
        <button
          onClick={() => setReportType("bestSelling")}
          className={`p-2 rounded-md ${
            reportType === "bestSelling"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Best Selling
        </button>
        <button
          onClick={() => setReportType("leastSelling")}
          className={`p-2 rounded-md ${
            reportType === "leastSelling"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Least Selling
        </button>
        <button
          onClick={() => setReportType("lowStock")}
          className={`p-2 rounded-md ${
            reportType === "lowStock" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Low Stock
        </button>
        <button
          onClick={() => setReportType("monthlySummary")}
          className={`p-2 rounded-md ${
            reportType === "monthlySummary"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Monthly Summary
        </button>
      </div>

      <div className="mt-[2rem] w-[90%]">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-[#d3d3c3] text-black">{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

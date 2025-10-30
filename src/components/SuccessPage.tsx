import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "./Navbar";

const SuccessPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const refId =
    booking?._id?.slice(-6).toUpperCase() ||
    Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
   <>
   <Navbar onSearch={(term) => console.log("Search term:", term)}/>
    <div className="mt-20 flex flex-col items-center justify-center bg-white">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-900">
        Booking Confirmed
      </h1>
      <p className="text-gray-600 mt-2">Ref ID: {refId}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
   </>
  );
};

export default SuccessPage;

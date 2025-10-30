import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import axios from "axios";

const Checkoutpage = () => {
  const location = useLocation();
  const { exp, selectedSlot, selectedDate,selectedUnDate, qty = 1 } = location.state || {};

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const tax = 59;
  const subtotal = exp?.price ? exp.price * qty : 0;
  const total = subtotal - discount + tax;

  const handleApplyPromo = () => {
    if (promoCode === "CODE45") {
      setDiscount(100);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const handlePay = async () => {
    if (!agreed) {
      alert("Please agree to the terms first");
      return;
    }

    if (!userName || !userEmail) {
      alert("Please fill in your name and email");
      return;
    }

    try {
        console.log("Booking successful:", exp);
      setLoading(true);
      const response = await axios.post("http://localhost:1000/exp/book", {
        experienceId: exp._id,
        userName,
        userEmail,
        promoCode,
        date: selectedUnDate,
        slotTime: selectedSlot,
      });
     

      navigate("/success", { state: { booking: response.data.booking } });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(userName,userEmail,agreed);
  const isFormValid =
    userName.trim() !== "" && userEmail.trim() !== "" && agreed;

  return (
   <>
   <Navbar onSearch={(term) => console.log("Search term:", term)} />
    <div className="flex justify-center gap-10 p-8 bg-white min-h-screen">
    <div className="w-full md:w-2/3 space-y-4  rounded-2xl p-6">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Checkout</h3>

      <div className="space-y-4 bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <input
          type="text"
          placeholder="Full name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="email"
          placeholder="Email address"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="flex flex-col gap-2">
  <p className="text-sm text-gray-600 font-medium">
    🎉 Exclusive offer! Enter promo code <span className="text-yellow-500 font-semibold">CODE45</span> for a special discount.
  </p>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleApplyPromo}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Apply
        </button>
      </div>
    </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span className="text-gray-600 text-sm">
          I agree to the terms and safety policy
        </span>
      </div>
      </div>
    </div>

    <div className="w-full md:w-1/3 bg-gray-50 p-6 h-fit rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Booking Summary</h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Experience</span>
          <span className="font-medium">{exp?.expname}</span>
        </div>
        <div className="flex justify-between">
          <span>Date</span>
          <span>{selectedDate}</span>
        </div>
        <div className="flex justify-between">
          <span>Time</span>
          <span>{selectedSlot}</span>
        </div>
        <div className="flex justify-between">
          <span>Qty</span>
          <span>{qty}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>₹{tax}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        disabled={!isFormValid}
        onClick={handlePay}
        className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
          isFormValid
            ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Pay and Confirm
      </button>
    </div>
  </div>
   </>
  )
}

export default Checkoutpage

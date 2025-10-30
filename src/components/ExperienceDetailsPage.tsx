import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

interface Slot {
  time: string;
  availableSeats: number;
  totalSeats: number;
}

interface DateData {
  _id: string;
  date: string;
  slots: Slot[];
}

interface Experience {
  _id: string;
  expname: string;
  description: string;
  price: number;
  image: string;
  add: string;
  dates: DateData[];
}

const ExperienceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [exp, setExp] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [selectedUnDate, setSelectedUnDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/exp/expcard/${id}`);
        setExp(res.data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };
    fetchExperience();
  }, [id]);

  const handleConfirm = () => {
    if (!exp || !selectedSlot) return;
    navigate("/checkout", {
      state: {
        exp,
        selectedSlot,
        selectedDate,
        selectedUnDate,
        qty: selectedQty,
      },
    });
  };

  if (!exp) return <p className="text-center mt-10">Loading...</p>;

  const subtotal = exp.price * selectedQty;
  const tax = 59;
  const total = subtotal + tax;

  return (
    <>
      <Navbar onSearch={(term) => console.log("Search term:", term)} />
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3">
          <img
            src={`http://localhost:1000/upload/${exp.image}`}
            alt={exp.expname}
            className="w-full h-100 object-cover rounded-2xl"
          />

          <div className="text-2xl font-semibold mt-6">{exp.expname}</div>
          <p className="text-gray-600 mt-2">{exp.description}</p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Choose date</h3>
            <div className="flex gap-2 flex-wrap">
              {exp.dates.map((d) => {
                const formattedDate = new Date(d.date).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <button
                    key={d._id}
                    onClick={() => {setSelectedDateId(d._id),setSelectedDate(formattedDate),setSelectedUnDate(d.date)}}
                    className={`px-4 py-2 border border-gray-200 rounded-lg ${
                      selectedDate === d._id
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-yellow-200"
                    }`}
                  >
                    {formattedDate}
                  </button>
                );
              })}
            </div>

            {selectedDateId && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Choose time</h3>
                <div className="flex flex-wrap gap-2">
                  {exp.dates
                    .find((d) => d._id === selectedDateId)
                    ?.slots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedSlot(slot.time)}
                        disabled={slot.availableSeats === 0}
                        className={`px-4 py-2 border rounded-lg border-gray-200 ${
                          slot.availableSeats === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : selectedSlot === slot.time
                            ? "bg-yellow-400"
                            : "hover:bg-yellow-200"
                        }`}
                      >
                        {slot.time}{" "}
                        <span className="text-sm text-red-500 ml-1">
                          {slot.availableSeats} {slot.availableSeats === 0 ? "sold" : "left"}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600 bg-gray-100 p-2 rounded-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 bg-gray-50 p-6 h-fit rounded-2xl shadow-md">
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Starts at</span>
              <span>₹{exp.price}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
                  className="bg-gray-200 px-1 py-1 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-md font-medium">{selectedQty}</span>
                <button
                  onClick={() => setSelectedQty((prev) => prev + 1)}
                  className="bg-gray-200 px-1 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

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
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
              selectedSlot
                ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ExperienceDetailsPage;

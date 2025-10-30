import React from "react";
import { useNavigate } from "react-router";

interface ExperienceCardProps {
  _id: string;
  expname: string;
  description: string;
  price: number;
  image: string;
  add: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  _id,
  expname,
  description,
  price,
  image,
  add,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    onClick={() => navigate(`/experience/${_id}`)}>
      <img
        src={`https://traveleasy-b.onrender.com/upload/${image}`}
        alt={expname}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
       <div className="flex justify-between"> <h3 className="text-lg font-semibold">{expname}</h3>
       <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">{add}</span></div>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold text-gray-800">From <span className="text-[20px]">₹{price}</span></p>
          <button className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-500">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

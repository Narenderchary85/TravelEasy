"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ExperienceCard from "./ExperienceCard";

interface Experience {
  _id: string;
  expname: string;
  description: string;
  price: number;
  image: string;
  add: string;
}

const ExperiencesList: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("https://traveleasy-b.onrender.com/exp/allexp");
        setExperiences(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  console.log("Experiences:", experiences);

  const handleSearch = (term: string) => {
    if (!term) return setFiltered(experiences);
    const lowerTerm = term.toLowerCase();
    const results = experiences.filter((exp) =>
      exp.expname.toLowerCase().includes(lowerTerm)
    );
    setFiltered(results);
  };

  if (loading) {
    return <div className="text-center py-10">Loading experiences...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length > 0 ? (
          filtered.map((exp) => <ExperienceCard key={exp._id} {...exp} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No experiences found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperiencesList;

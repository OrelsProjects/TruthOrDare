"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPlay, FaPlus } from "react-icons/fa";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
        Unleash the Fun!
      </h1>
      <p className="text-lg md:text-2xl text-center max-w-2xl mb-12">
        Dive into a world of secrets and challenges. Create daring questions or
        step up to the plate and play. Are you ready to spice things up?
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <Button
          onClick={() => router.push("/create")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center space-x-2"
        >
          <FaPlus className="w-5 h-5" />
          <span>Create</span>
        </Button>
        <Button
          onClick={() => router.push("/play")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex flex-row items-center justify-center space-x-2"
        >
          <FaPlay className="w-5 h-5" />
          <span>Play</span>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;

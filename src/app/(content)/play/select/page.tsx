// pages/play/select.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const GameModeSelect: React.FC = () => {
  const router = useRouter();

  const selectMode = (mode: "random" | "regular") => {
    router.push(`/play/${mode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Choose Your Game Mode</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <Button
          onClick={() => selectMode("random")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Random Mode
        </Button>
        <Button
          onClick={() => selectMode("regular")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Regular Mode
        </Button>
      </div>
    </div>
  );
};

export default GameModeSelect;

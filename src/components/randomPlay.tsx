"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type TruthOrDareType = "truth" | "dare";

interface TruthOrDare {
  question: string;
  type: TruthOrDareType;
}

const Play: React.FC = () => {
  const [allItems, setAllItems] = useState<TruthOrDare[]>([]);
  const [loading, setLoading] = useState(false);
  const [remainingItems, setRemainingItems] = useState<TruthOrDare[]>([]);
  const [currentItem, setCurrentItem] = useState<TruthOrDare | null>(null);
  const [mode, setMode] = useState<TruthOrDareType | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get("/api/truth-or-dare");
        setAllItems(response.data);
        setRemainingItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const randomizeMode = () => {
    const modes: TruthOrDareType[] = ["truth", "dare"];
    const availableModes = modes.filter(m =>
      remainingItems.some(item => item.type === m),
    );

    if (availableModes.length === 0) {
      // No truths or dares left
      setCurrentItem(null);
      setMode(null);
      return;
    }

    setLoading(true);
    setCurrentItem(null);
    setMode(null);
    setReveal(false);

    // Random delay between 2-3 seconds
    const delay = Math.random() * 1000 + 2000;

    setTimeout(() => {
      let randomMode: TruthOrDareType;
      if (availableModes.length === 1) {
        randomMode = availableModes[0];
      } else {
        randomMode =
          availableModes[Math.floor(Math.random() * availableModes.length)];
      }

      setMode(randomMode);
      pickRandomItem(randomMode);
      setLoading(false);
    }, delay);
  };

  const pickRandomItem = (type: TruthOrDareType) => {
    const itemsOfType = remainingItems.filter(item => item.type === type);
    if (itemsOfType.length === 0) {
      // Try the other type
      const otherType: TruthOrDareType = type === "truth" ? "dare" : "truth";
      const otherItems = remainingItems.filter(item => item.type === otherType);

      if (otherItems.length === 0) {
        // No items left
        setCurrentItem(null);
        setMode(null);
      } else {
        setMode(otherType);
        pickRandomItem(otherType);
      }
      return;
    }
    const randomIndex = Math.floor(Math.random() * itemsOfType.length);
    const selectedItem = itemsOfType[randomIndex];
    setCurrentItem(selectedItem);
    setRemainingItems(prev => prev.filter(item => item !== selectedItem));
  };

  const resetGame = () => {
    setRemainingItems(allItems);
    setCurrentItem(null);
    setMode(null);
    setReveal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center p-4">
      {/* Button Section */}
      <Card className="max-w-lg w-full mb-6 bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            Let&apos;s Spice Things Up!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative">
            <Button
              onClick={randomizeMode}
              disabled={loading || remainingItems.length === 0}
              className="relative overflow-hidden bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg"
            >
              {remainingItems.length === 0
                ? "No more items"
                : loading
                  ? "Rolling the Dice..."
                  : "Dare to Roll the Dice?"}
              {loading && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </Button>
          </div>
        </CardContent>
        {mode && !loading && (
          <Card className="max-w-lg w-full py-4 bg-transparent border-none shadow-none">
            <CardContent className="flex flex-col items-center">
              <Badge
                className={`${
                  mode === "truth"
                    ? "bg-blue-500 hover:bg-blue-500"
                    : "bg-red-500 hover:bg-red-500"
                } text-white px-3 py-1 rounded-full mb-4`}
              >
                {mode?.toUpperCase()}
              </Badge>
              {!reveal ? (
                <Button
                  onClick={() => setReveal(true)}
                  variant="outline"
                  className="bg-transparent py-4 px-8"
                >
                  Reveal
                </Button>
              ) : (
                <p className="text-xl font-medium text-gray-200 text-center">
                  {currentItem?.question}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </Card>

      {/* Mode Display Section */}

      {/* Play Again Button */}
      {remainingItems.length === 0 && !loading && reveal && (
        <div className="mt-6">
          <Button
            onClick={resetGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all hover:scale-105 duration-300"
          >
            Want to Play Again?
          </Button>
        </div>
      )}
    </div>
  );
};

export default Play;

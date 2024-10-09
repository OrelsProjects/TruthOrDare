"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    setMode(randomMode);
    pickRandomItem(randomMode);
  };

  const pickRandomItem = (type: TruthOrDareType) => {
    const itemsOfType = remainingItems.filter(item => item.type === type);
    if (itemsOfType.length === 0) {
      alert(`No more ${type}s left!`);
      return;
    }
    const randomIndex = Math.floor(Math.random() * itemsOfType.length);
    const selectedItem = itemsOfType[randomIndex];
    setCurrentItem(selectedItem);
    setRemainingItems(prev => prev.filter(item => item !== selectedItem));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-foreground">
            Let&apos;s Spice Things Up!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            onClick={randomizeMode}
            disabled={loading}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all hover:scale-105 duration-300"
          >
            Dare to Roll the Dice?
          </Button>
          {currentItem && (
            <div className="mt-6 text-center">
              <Badge
                className={`${
                  mode === "truth" ? "bg-blue-500" : "bg-red-500"
                } text-white px-3 py-1 rounded-full mb-4`}
              >
                {mode?.toUpperCase()}
              </Badge>
              <p className="text-xl font-medium text-gray-700">
                {currentItem.question}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Play;

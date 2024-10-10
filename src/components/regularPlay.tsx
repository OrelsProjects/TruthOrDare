"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type TruthOrDareType = "truth" | "dare";

interface TruthOrDare {
  id: string;
  question: string;
  type: TruthOrDareType;
}

const RegularPlay: React.FC = () => {
  const [allItems, setAllItems] = useState<TruthOrDare[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<TruthOrDareType | null>(
    null
  );
  const [usedItemIds, setUsedItemIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get("/api/truth-or-dare");
        // Ensure each item has a unique 'id'
        const dataWithIds = response.data.map((item: any, index: number) => {
          if (!item.id) {
            // If 'id' is missing, assign a unique one
            return { ...item, id: `item-${index}` };
          }
          return item;
        });
        setAllItems(dataWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectType = (type: TruthOrDareType) => {
    setSelectedType(type);
  };

  const handleToggleItem = (id: string) => {
    setUsedItemIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const isTypeDisabled = (type: TruthOrDareType) => {
    return (
      allItems.filter(
        (item) => item.type === type && !usedItemIds.includes(item.id)
      ).length === 0
    );
  };

  const resetUsedItems = () => {
    setUsedItemIds([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center p-4">
      {/* Back Button */}
      <button
        onClick={() => router.push("/play/select")}
        className="absolute top-4 left-4 text-white hover:text-gray-300"
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Type Selection */}
      {!selectedType && (
        <Card className="max-w-lg w-full mb-6">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-white">
              Choose Truth or Dare
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button
              onClick={() => handleSelectType("truth")}
              disabled={isTypeDisabled("truth")}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg ${
                isTypeDisabled("truth") ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Truth
            </Button>
            <Button
              onClick={() => handleSelectType("dare")}
              disabled={isTypeDisabled("dare")}
              className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg ${
                isTypeDisabled("dare") ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Dare
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Item Selection */}
      {selectedType && (
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-white">
              Select {selectedType === "truth" ? "Truths" : "Dares"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {allItems
                .filter((item) => item.type === selectedType)
                .map((item) => {
                  const isUsed = usedItemIds.includes(item.id);
                  return (
                    <li key={item.id} className="flex items-center">
                      <label
                        className={`flex items-center w-full p-2 rounded ${
                          isUsed ? "bg-gray-700" : "bg-gray-800"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isUsed}
                          onChange={() => handleToggleItem(item.id)}
                          disabled={isUsed}
                          className="form-checkbox h-5 w-5 text-blue-500 rounded cursor-pointer"
                        />
                        <span
                          className={`ml-3 ${
                            isUsed
                              ? "line-through text-gray-400"
                              : "text-white"
                          }`}
                        >
                          {item.question}
                        </span>
                      </label>
                    </li>
                  );
                })}
            </ul>
            <div className="mt-4 flex justify-between">
              <Button
                onClick={() => setSelectedType(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full"
              >
                Back
              </Button>
              <Button
                onClick={resetUsedItems}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegularPlay;

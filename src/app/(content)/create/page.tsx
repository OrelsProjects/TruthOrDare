"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type TruthOrDareType = "truth" | "dare";

interface TruthOrDare {
  type: TruthOrDareType;
  question: string;
}

const TruthOrDareForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const formik = useFormik<TruthOrDare>({
    initialValues: {
      type: "truth",
      question: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (loading) return;
      setLoading(true);
      const toastId = toast.loading("Saving...");
      try {
        await axios.post("/api/truth-or-dare", values);
        toast.update(toastId, {
          render: "Saved successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        resetForm();
      } catch (error) {
        console.error(error);
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full h-12 flex justify-center items-center relative">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="absolute top-1 left-0 px-0 hover:bg-transparent text-white hover:text-gray-300"
        >
          <FaArrowLeft size={24} />
        </Button>
      </div>
      <Card className="max-w-md w-full relative">
        {/* Back Button */}

        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">
            Share Your Challenge!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <RadioGroup
              value={formik.values.type}
              onValueChange={value =>
                formik.setFieldValue("type", value as TruthOrDareType)
              }
              className="flex justify-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="truth" id="truth" />
                <label htmlFor="truth" className="text-white">
                  Truth
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dare" id="dare" />
                <label htmlFor="dare" className="text-white">
                  Dare
                </label>
              </div>
            </RadioGroup>

            <div>
              <Textarea
                id="question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                rows={4}
                placeholder="Enter your question here..."
                className="w-full text-gray-800 rounded-md p-3"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-all hover:scale-105 duration-300"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruthOrDareForm;

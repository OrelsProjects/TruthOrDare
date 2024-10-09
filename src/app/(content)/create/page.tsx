"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TruthOrDare from "@/models/TruthOrDare";
import { toast } from "react-toastify";

const TruthOrDareForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

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
          autoClose: 2000,
        });
        resetForm();
      } catch (error) {
        // Handle error
        console.error(error);
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <RadioGroup
          value={formik.values.type}
          onValueChange={value =>
            formik.setFieldValue("type", value as "truth" | "dare")
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="truth" id="truth" />
            <label htmlFor="truth">Truth</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dare" id="dare" />
            <label htmlFor="dare">Dare</label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-4">
        <Textarea
          id="question"
          name="question"
          value={formik.values.question}
          onChange={formik.handleChange}
          placeholder="Enter your question here..."
          className="w-full"
          required
        />
      </div>
      <div>
        <Button type="submit" disabled={loading}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default TruthOrDareForm;

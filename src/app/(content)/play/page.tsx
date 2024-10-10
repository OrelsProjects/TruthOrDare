"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import RandomPlay from "@/components/randomPlay";
import RegularPlay from "@/components/regularPlay";
import { DeleteIcon } from "lucide-react";

const PlayPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const type = useMemo(() => params.type, [params.type]);

  if (!type) {
    debugger;
    // If no type is provided, redirect to select page
    if (typeof window !== "undefined") {
      router.push("/play/select");
    }
    return null;
  }

  return (
    <>
      {type === "random" && <RandomPlay />}
      {type === "regular" && <RegularPlay />}
    </>
  );
};

export default PlayPage;

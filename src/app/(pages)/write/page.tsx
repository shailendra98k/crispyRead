"use client";

import { useAppContext } from "@/app/providers/AppContextProvider";
import { Loader } from "@/app/components/loader";
import { ReactQuillEditor } from "@/app/components/editor/ReactQuillEditor";
import React from "react";
const WritePage = () => {
  const { user } = useAppContext();

  if (!user) {
    return <Loader />;
  }

  if (user.role !== "ADMIN") {
    window.location.href = "/";
    return;
  }

  return <ReactQuillEditor />;
};

export default WritePage;

"use client";

import { useAppContext, UserType } from "@/app/providers/AppContextProvider";
import { Loader } from "@/app/components/loader";
import { ReactQuillEditor } from "@/app/components/editor/ReactQuillEditor";
import React from "react";
import CrispyReadClient from "@/app/client/CrispyReadClient";
const WritePage = () => {
  const { user } = useAppContext();

  const onSubmitHandler = async (data) => {
    const response: any = await CrispyReadClient.createPost(data);
    if (response && typeof window !== "undefined") {
      window.location.href = `/post/${response?.id}/${response?.slug}`;
    }
  };

  if (!user) {
    return <Loader />;
  }

  if ((!user || !user.id) && typeof window !== "undefined") {
    window.location.href = "/";
    return;
  }

  return <ReactQuillEditor submitHandler={onSubmitHandler} />;
};

export default WritePage;

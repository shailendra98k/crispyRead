"use client";

import { useAppContext, UserType } from "@/app/providers/AppContextProvider";
import { Loader } from "@/app/components/loader";
import { ReactQuillEditor } from "@/app/components/editor/ReactQuillEditor";
import React from "react";
import CrispyReadClient from "@/app/client/CrispyReadClient";
const WritePage = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (data) => {
    setLoading(true);
    const response: any = await CrispyReadClient.createPost(data);
    if (response && typeof window !== "undefined") {
      window.location.href = `/post/${response?.id}/${response?.slug}`;
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  if ((!user || !user.id) && typeof window !== "undefined") {
    window.location.href = "/";
    return;
  }

  return <ReactQuillEditor submitHandler={onSubmitHandler} />;
};

export default WritePage;

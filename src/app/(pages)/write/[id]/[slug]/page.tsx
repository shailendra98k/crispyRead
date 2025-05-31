"use client";

import { useState } from "react";
import * as React from "react";
import { useAppContext } from "@/app/providers/AppContextProvider";
import { Loader } from "@/app/components/loader";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { ReactQuillEditor } from "@/app/components/editor/ReactQuillEditor";

const EditPage = ({ params }) => {
  const [initialData, setInitialData] = useState(null);
  const { slug, id } = params;
  const { user } = useAppContext();

  const onSubmitHandler = async (data) => {
    const response: any = await CrispyReadClient.updatePost(data);
    if (response) {
      window.location.href = `/post/${response?.id}/${response?.slug}`;
    }
  };

  React.useEffect(() => {
    const fetchPost = async () => {
      const data = await CrispyReadClient.getPostById(id, slug);
      setInitialData(data);
    };
    fetchPost();
  }, [user]);

  if (!user) {
    return <Loader />;
  }

  if (user.role !== "ADMIN") {
    window.location.href = "/";
    return;
  }

  return (
    <ReactQuillEditor
      intialData={initialData}
      submitHandler={onSubmitHandler}
    />
  );
};

export default EditPage;

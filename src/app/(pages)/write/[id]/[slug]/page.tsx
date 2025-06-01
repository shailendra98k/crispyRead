"use client";

import { useState } from "react";
import * as React from "react";
import { useAppContext } from "@/app/providers/AppContextProvider";
import { Loader } from "@/app/components/loader";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { ReactQuillEditor } from "@/app/components/editor/ReactQuillEditor";

const EditPage = ({ params }) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug, id } = params;
  const { user } = useAppContext();
  console.log("EditPage user:", user);

  const onSubmitHandler = async (data) => {
    setLoading(true);
    const response: any = await CrispyReadClient.updatePost({
      ...initialData,
      ...data,
    });
    if (response) {
      window.location.href = `/post/${response?.id}/${response?.slug}`;
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      const data = await CrispyReadClient.getPostById(id, slug);
      console.log("Fetched post data:", data);
      setInitialData(data);
    };
    fetchPost();
    setLoading(false);
  }, [id, slug]);

  if (loading) {
    return <Loader />;
  }

  if (!user || !user.id) {
    window.location.href = "/";
    return;
  }

  if (initialData && user.id !== initialData?.author?.id) {
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

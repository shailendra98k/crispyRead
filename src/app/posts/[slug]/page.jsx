"use client";
import styles from "./singlePage.module.css";
import Image from "next/image";
import axios from "axios";
import { noCacheHeader } from "@/utils/constant";
import * as React from "react";
import { useState } from "react";
import { getCookie } from "@/utils/constant";

const getData = async (slug) => {
  const res = await axios.get(`/api/posts/${slug}`, {
    headers: noCacheHeader,
  });
  if (res.status !== 200) {
    throw new Error("Failed");
  }

  const data = res.data;

  const date = new Date(data?.createdAt);
  return {
    _id: data?.id,
    desc: data?.desc,
    title: data?.title,
    seoDescription: data?.seoDescription,
    img: "",
    slug: data?.slug,
    ...data,
    createdAt: date?.toLocaleDateString("default", { dateStyle: "medium" }),
    published: data?.published,
  };
};

const Comp = ({ data, slug }) => {
  const [isPublished, setIspublished] = React.useState(0);
  const [isStaff, setIsStaff] = useState(0);

  const setVisibility = async () => {
    const res = await axios.patch(`/api/posts/${slug}`, {
      published: !isPublished,
    });
    setIspublished(res.data.published);

    if (res.status !== 200) {
      throw new Error("Failed");
    }
  };
  React.useEffect(() => {
    if (getCookie("auth") === process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
      setIsStaff(1);
    }
    setIspublished(data.published);
    const ele = document.createElement("div");
    ele.innerHTML = data.socialMediaLink1;
    document
      .getElementsByTagName("p")
      [data.socialMediaLinkIndex1]?.appendChild(ele);
  }, [data.published, data.socialMediaLink1, data.socialMediaLinkIndex1]);

  return (
    <div>
      <title>{`Crispy Read | ${data.title}`}</title>
      <meta name="description" content={data.seoDescription} />
      <script async src="https://platform.twitter.com/widgets.js"></script>
      <script async src="//www.instagram.com/embed.js"></script>
      <button
        style={{
          display: isStaff ? "block" : "none",
          background: isPublished ? "#5f050f" : "green",
        }}
        className={styles.publish}
        onClick={setVisibility}
      >
        {isPublished ? "Archive" : "Publish"}
      </button>
      <h1>{data?.title}</h1>
      <span>{data?.createdAt}</span>
      <div dangerouslySetInnerHTML={{ __html: data?.desc }} />
      
    </div>
  );
};

// eslint-disable-next-line @next/next/no-async-client-component
const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Comp data={data} slug={slug} />
      </div>
      <div className={styles.aside}></div>
    </div>
  );
};

export default SinglePage;

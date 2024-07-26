"use client";
import styles from "./singlePage.module.css";
import Image from "next/image";
import axios from "axios";
import { CRISPY_READ_CORE_BASE_URL, noCacheHeader } from "@/utils/constant";
import * as React from "react";
import { useState } from "react";
import { getCookie } from "@/utils/constant";

export const Comp = ({ data, slug }) => {
  const [isPublished, setIspublished] = React.useState(0);
  const [isStaff, setIsStaff] = useState(0);

  const setVisibility = async () => {
    const res = await axios.put(`/api/post`, {
      ...data,
      published: !isPublished,
    });
    setIspublished(res.data.published);

    if (res.status !== 200) {
      throw new Error("Failed");
    }
  };
  React.useEffect(() => {
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
      <button className={styles.categoryBadge}>{data.category}</button>
      <h1>{data?.title}</h1>
      <span style={{ color: "gray", fontSize: "14px" }}>
        {new Date(data.createdAt).toUTCString()}
      </span>
      <div dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
};

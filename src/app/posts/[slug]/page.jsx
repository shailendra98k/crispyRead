"use client";
import Menu from "@/components/Menu/Menu";
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
    <div className={styles.container}>
      <title>{`Crispy Read | ${data.title}`}</title>
      <meta name="description" content={data.seoDescription} />
      <script async src="https://platform.twitter.com/widgets.js"></script>
      <script async src="//www.instagram.com/embed.js"></script>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>{data?.createdAt}</span>
              <h1 className={styles.title}>{data?.title}</h1>
            </div>
          </div>
        </div>
        {/* {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )} */}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          {/* <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div> */}
        </div>
        {/* <Menu /> */}
      </div>
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
    </div>
  );
};

// eslint-disable-next-line @next/next/no-async-client-component
const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  return <Comp data={data} slug={slug} />;
};

export default SinglePage;

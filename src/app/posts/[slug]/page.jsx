"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import axios from "axios";
import { BASE_URL, noCacheHeader } from "@/utils/constant";
import { options } from "pg/lib/defaults";
import * as React from "react";

const getData = async (slug) => {
  const res = await axios.get(`${BASE_URL_CLIENT}/api/posts/${slug}`, {
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
    img: "",
    slug: data?.slug,
    ...data,
    createdAt: date?.toLocaleDateString("default", { dateStyle: "medium" }),
  };
};

const Comp = ({ data }) => {
  React.useEffect(() => {
    const ele = document.createElement("div");
    ele.innerHTML = data.socialMediaLink1;
    document
      .getElementsByTagName("p")
      [data.socialMediaLinkIndex1].appendChild(ele);
  }, []);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

// eslint-disable-next-line @next/next/no-async-client-component
const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  return <Comp data={data} />;
};

export default SinglePage;

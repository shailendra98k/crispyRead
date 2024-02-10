import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import axios from "axios";
import { BASE_URL, noCacheHeader } from "@/utils/constant";
import Link from "next/link";

const getData = async () => {
  const res = await axios.get(`${BASE_URL}/api/featured-post`, {
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
    img: data?.img,
    slug: data?.slug,
    createdAt: date?.toLocaleDateString("default", { dateStyle: "medium" }),
  };
};

const Featured = async () => {
  const data = await getData();

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>
        Say <b>hello</b> to a streamlined reading experience.
      </h1> */}
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={data.img} alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{data.title}</h1>
          <div
            className={styles.postDec}
            dangerouslySetInnerHTML={{ __html: `${data?.desc?.substring(0, 1500)}` }}
          />
          <Link href={`/posts/${data.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;

/* eslint-disable @next/next/no-img-element */
import styles from "./card.module.css";
import Link from "next/link";
import React from "react";

const Card = ({ key, item }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: "white", padding: "1rem" }}
    >
      <Link href={`/posts/${item.slug}`}>
        <img
          className={styles.image}
          
          alt=""
          width={"100%"}
          height={100}
        />
        <h3>{item.title}</h3>
        <span className={styles.date}>
          {new Date(item.createdAt).toLocaleDateString("default", {
            dateStyle: "medium",
          })}

          <span style={{ position: "relative", left: "1rem" }}>
            <img
              width="16"
              height="16"
              style={{ position: "relative", top: "3px" }}
              src="https://img.icons8.com/forma-thin/24/open-book.png"
              alt="open-book"
            />
            {` ${Math.round(item?.content?.length / 1000)} min read`}
          </span>
        </span>

        <div
          className={styles.postDescription}
          dangerouslySetInnerHTML={{
            __html: `${item?.content?.substring(0, 120) || <span></span>}...`,
          }}
        />
      </Link>

      <div key={key}>
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          {/* <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 1200) }}
          /> */}
          <div>
            {/* <Link href={`/posts/${item.slug}`} className={styles.link}>
              Read More
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

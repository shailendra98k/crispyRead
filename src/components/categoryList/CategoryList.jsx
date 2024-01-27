import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";

const getData = async () => {
  const res = await axios.get(`${BASE_URL}/api/categories`);

  if (res.status != 200) {
    throw new Error("Failed");
  }

  return res.data
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.toLowerCase()}`}
            className={`${styles.category} ${styles[item.toLowerCase()]}`}
            key={item.toLowerCase()}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

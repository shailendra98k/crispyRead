import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BASE_URL, categoryList, noCacheHeader } from "@/utils/constant";

const CategoryList = async () => {
  const data = categoryList;
  return (
    <div>
      <h1>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.toLowerCase()}`}
            className={`${styles.category} ${styles[item.toLowerCase()]}`}
            key={item.toLowerCase()}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

'use client';
import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import { useAppContext } from "@/app/providers/AppContextProvider";

const CategoryList = () => {
  const { categories } = useAppContext();
  return (
    <div>
      <h3 style={{ padding: "2rem 0rem", textAlign: "center" }}>
        Popular Categories
      </h3>
      <div className={styles.categories}>
        {categories?.map((category) => (
          <Link
            href={`/blogs/${category.name.toLowerCase()}`}
            className={`${styles.category} ${
              styles[category.name.toLowerCase()]
            }`}
            style={{
              color: "#5b0f17",
              textAlign: "center",
              margin: "auto",
              width: "fit-content",
              minWidth: "200px",
              height: "fit-content",
              padding: "1rem",
            }}
            key={category.name.toLowerCase()}
          >
            {category?.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

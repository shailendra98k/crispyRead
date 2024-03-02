"use client";
import { BASE_URL } from "@/utils/constant";
import React from "react";
import styles from "./categorySelect.module.css";

const CategorySelect = ({ selectedCategoty = "" }) => {
  const categoryChangehandler = (e) => {
    const category = e.target.value;
    if (category.length) {
      window.location.href = `${BASE_URL}/blog/?cat=${category}`;
    } else {
        window.location.href = `${BASE_URL}`;
    }
  };
  return (
    <div className={styles.container}>
      <select
        value={selectedCategoty}
        className={styles.selectInput}
        onChange={categoryChangehandler}
      >
        <option value=""> See All Recent Posts</option>
        <option value="coding"> Codings</option>
        <option value="finance"> Finance</option>
        <option value="sports"> Sports</option>
        <option value="entertainment"> Entertainment</option>
        <option value="news"> News</option>
        <option value="automobile"> Automobile</option>
      </select>
    </div>
  );
};

export default CategorySelect;

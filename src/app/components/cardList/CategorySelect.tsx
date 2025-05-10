"use client";
import React from "react";
import styles from "./categorySelect.module.css";
import { useAppContext } from "@/app/providers/AppContextProvider";

const CategorySelect = ({category}) => {
  const categories = [
    { name: "All Categories" },
    ...useAppContext().categories,
  ];
  const [selectedCategory, setSelectedCategory] =
    React.useState(category || "all categories");
  return (
    <div className={styles.container}>
      <select
        value={selectedCategory}
        className={styles.selectInput}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          if (e.target.value === "all categories") {
            window.location.href = "/";
            return;
          }
          window.location.href = "/blogs/" + e.target.value;
        }}
      >
        {categories?.map((category) => {
          return (
            <option
              key={category.name.toLowerCase()}
              value={category.name.toLowerCase()}
            >
              {category.name.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CategorySelect;

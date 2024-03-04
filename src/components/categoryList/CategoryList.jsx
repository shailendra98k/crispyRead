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
      <h3 style={{padding:'2rem 0rem', textAlign:'center'}}>Popular Categories</h3>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.toLowerCase()}`}
            className={`${styles.category} ${styles[item.toLowerCase()]}`}
            style={{color:'#5b0f17',textAlign:'center', margin:'auto', width:'fit-content', minWidth:'200px', height:'fit-content', padding:'1rem'}}
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

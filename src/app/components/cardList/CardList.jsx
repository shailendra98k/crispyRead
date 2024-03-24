import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";
import axios from "axios";
import LOGGER from "@/utils/logger";
import { BASE_URL, CRISPY_READ_CORE_BASE_URL, noCacheHeader, POST_PER_PAGE } from "@/utils/constant";
import CategorySelect from "./CategorySelect";

const getData = async (page, category) => {
  const url = category
    ? `${CRISPY_READ_CORE_BASE_URL}/api/posts/${category}?page=${page}`
    : `${CRISPY_READ_CORE_BASE_URL}/api/posts?page=${page}`;

  const res = await axios.get(url, {
    headers: noCacheHeader,
  });
  console.log('Response is: ', url);

  return {
    posts: res.data,
    count: res.data.length,
  };
};

// eslint-disable-next-line @next/next/no-async-client-component
const CardList = async ({ page = 0, category }) => {
  const { posts, count } = await getData(page, category);

  const hasPrev = POST_PER_PAGE * (page) > 0;
  const hasNext = POST_PER_PAGE * (page) + POST_PER_PAGE < count;
  return (
    <div className={styles.container}>
      <div className={styles.categorySelection}>
        <div style={{ flexGrow: 1 }}>
          <h1 className={styles.title}>
            {`${category ? category : "All Recent "} Posts`}
          </h1>
        </div>
        <CategorySelect selectedCategoty={category} />
      </div>

      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;

import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";
import axios from "axios";
import LOGGER from "@/utils/logger";
import { BASE_URL, POST_PER_PAGE } from "@/utils/constant";

const getData = async (page, category) => {
  const res = await axios.get(
    `${BASE_URL}/api/posts/?page=${page}&category=${category || ""}`
  );

  return {
    posts: res.data.a,
    count: res.data.b,
  };
};

const CardList = async ({ page = 1, category }) => {
  const { posts, count } = await getData(page, category);

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
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

import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import {
  POST_PER_PAGE,
} from "@/utils/constant";
import CategorySelect from "./CategorySelect";

const CardList = ({ page = 0, category, posts }) => {
  const hasPrev = POST_PER_PAGE * page > 0;
  const hasNext = POST_PER_PAGE * page + POST_PER_PAGE < posts?.length;
  return (
    <div className={styles.container}>
      <div className={styles.categorySelection}>
        <div style={{ flexGrow: 1 }}>
          <h1 className={styles.title}>
            {`${category ? category : "All Recent "} Posts`}
          </h1>
        </div>
        <CategorySelect category={category} />
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

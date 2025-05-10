"use client";
import styles from "./singlePage.module.css";
import { Comp } from "./Comp";

// eslint-disable-next-line @next/next/no-async-client-component
const SinglePage = ({ params }) => {
  const { slug } = params;

  const data = [];
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Comp data={data} slug={slug} />
      </div>
      <div className={styles.aside}></div>
    </div>
  );
};

export default SinglePage;

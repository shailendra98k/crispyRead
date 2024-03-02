import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import { blogTitleAndDescription } from "@/utils/constant";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className={styles.container}>
      <title>{`${blogTitleAndDescription[cat]['title']}`}</title>
      <meta name="description" content={blogTitleAndDescription[cat]['description']} />
      <h1 className={`${styles.title} ${styles[cat]}`}>{cat}</h1>
      <div className={styles.content}>
        <CardList page={page} category={cat} />
      </div>
    </div>
  );
};

export default BlogPage;

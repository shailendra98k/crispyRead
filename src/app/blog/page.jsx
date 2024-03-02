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
      <CardList page={page} category={cat} />
    </div>
  );
};

export default BlogPage;

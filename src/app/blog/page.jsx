import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import { blogTitleAndDescription } from "@/utils/constant";
import { notFound } from "next/navigation";
import CategoryList from "@/components/categoryList/CategoryList";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  if(!blogTitleAndDescription[cat]) {
    return notFound()
  }

  return (
    <div className={styles.container}>
      <title>{`${blogTitleAndDescription[cat]['title']}`}</title>
      <meta name="description" content={blogTitleAndDescription[cat]['description']} />
      <CardList page={page} category={cat} />
      <CategoryList/>
    </div>
  );
};

export default BlogPage;

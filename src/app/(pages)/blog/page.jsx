import CardList from "@/app/components/cardList/CardList";
import styles from "./blogPage.module.css";
import { blogTitleAndDescription } from "@/utils/constant";
import { notFound } from "next/navigation";
import CategoryList from "@/app/components/categoryList/CategoryList";
import Featured from "@/app/components/featured/Swappable";

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
      <Featured />
      <CardList page={page} category={cat} />
      <CategoryList/>
    </div>
  );
};

export default BlogPage;

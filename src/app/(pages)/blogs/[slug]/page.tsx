"use client";
import { blogTitleAndDescription } from "@/utils/constant";
import React from "react";
import CategoryList from "@/app/components/categoryList/CategoryList";
import Featured from "@/app/components/featured/Swappable";
import CardList from "@/app/components/cardList/CardList";
import styles from "./page.module.css";
import CrispyReadClient from "@/app/client/CrispyReadClient";

const BlogsPage = ({ params }) => {
  const { slug: category, searchParams } = params;
  const page = parseInt(searchParams?.page) || 0;

  const [posts, setPosts] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = (await CrispyReadClient.getPostsByCategory(
          category
        ));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const data = [];
  return (
    <div className={styles.container}>
      <title>{`${blogTitleAndDescription[category]["title"]}`}</title>
      <meta
        name="description"
        content={blogTitleAndDescription[category]["description"]}
      />
      <Featured />
      <CardList posts={posts} page={page} category={category} />
      <CategoryList />
    </div>
  );
};

export default BlogsPage;

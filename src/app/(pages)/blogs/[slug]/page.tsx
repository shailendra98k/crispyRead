"use client";
import { blogTitleAndDescription, POST_PER_PAGE } from "@/utils/constant";
import React from "react";
import CategoryList from "@/app/components/categoryList/CategoryList";
import CardList from "@/app/components/cardList/CardList";
import styles from "./page.module.css";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { Featured } from "@/app/components/featured/Featured";

const BlogsPage = ({ params, searchParams }) => {
  const { slug: category } = params;
  const page = parseInt(searchParams?.page) || 0;

  const [posts, setPosts] = React.useState<any>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: any = await CrispyReadClient.getPostsByCategory(
          category,
          page,
          POST_PER_PAGE
        );
        setPosts(response.posts);
        setTotalCount(response.totalPublishedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page, category]);

  console.log("searchParams: ", searchParams);

  return (
    <div className={styles.container}>
      <title>{`${blogTitleAndDescription[category]["title"]}`}</title>
      <meta
        name="description"
        content={blogTitleAndDescription[category]["description"]}
      />
      <Featured posts={posts} />
      <CardList
        totalCount={totalCount}
        posts={posts}
        page={page}
        category={category}
      />
      <CategoryList />
    </div>
  );
};

export default BlogsPage;

"use client";
import styles from "./homepage.module.css";
import CardList from "@/app/components/cardList/CardList";
import CategoryList from "@/app/components/categoryList/CategoryList";
import React from "react";
import CrispyReadClient from "../client/CrispyReadClient";
import { Featured } from "../components/featured/Featured";
import { Loader } from "../components/loader";
import { POST_PER_PAGE_HOME_PAGE } from "@/utils/constant";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 0;
  const [posts, setPosts] = React.useState<any>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: any = await CrispyReadClient.getPosts(
          page,
          POST_PER_PAGE_HOME_PAGE
        );
        setPosts(response.posts);
        setTotalCount(response.totalPublishedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [page]);

  if (posts.length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, coding and sports, in a concise, easy-to-digest format. Stay informed effortlessly with Crispy Read."
      />

      <Featured posts={posts} />
      <CardList
        totalCount={totalCount}
        posts={posts}
        page={page}
        category={""}
      />
      <CategoryList />
    </div>
  );
}

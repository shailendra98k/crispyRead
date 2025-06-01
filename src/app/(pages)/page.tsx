"use client";
import styles from "./homepage.module.css";
import CardList from "@/app/components/cardList/CardList";
import CategoryList from "@/app/components/categoryList/CategoryList";
import CrispyReadClient from "../client/CrispyReadClient";
import { Featured } from "../components/featured/Featured";
import { Loader } from "../components/loader";
import { POST_PER_PAGE_HOME_PAGE } from "@/utils/constant";
import React from "react";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 0;
  const [posts, setPosts] = React.useState<any>([]);
  const [featuredPosts, setFeaturedPosts] = React.useState<any>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  React.useEffect(() => {
    setPosts([]);
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

    const fetchfeaturedPosts = async () => {
      try {
        const posts: any = await CrispyReadClient.getFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    fetchfeaturedPosts();
  }, [page]);

  if (posts.length === 0 || featuredPosts.length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, coding and sports, in a concise, easy-to-digest format. Stay informed effortlessly with Crispy Read."
      />

      <Featured posts={featuredPosts} />
      <CardList
        totalCount={totalCount}
        posts={posts}
        page={page}
        category={""}
        maxCardCount={POST_PER_PAGE_HOME_PAGE}
      />
      <CategoryList />
    </div>
  );
}

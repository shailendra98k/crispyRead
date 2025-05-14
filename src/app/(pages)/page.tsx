"use client";
import styles from "./homepage.module.css";
import CardList from "@/app/components/cardList/CardList";
import CategoryList from "@/app/components/categoryList/CategoryList";
import React from "react";
import CrispyReadClient from "../client/CrispyReadClient";
import { Featured } from "../components/featured/Featured";
import { useAppContext } from "../providers/AppContextProvider";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 0;
  const [posts, setPosts] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await CrispyReadClient.getPostsByCategory("");
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, coding and sports, in a concise, easy-to-digest format. Stay informed effortlessly with Crispy Read."
      />

      <Featured posts={posts} />
      <CardList posts={posts} page={page} category={""} />
      <CategoryList />
    </div>
  );
}

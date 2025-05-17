"use client";
import styles from "./singlePage.module.css";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { Loader } from "@/app/components/loader";
import { useAppContext } from "@/app/providers/AppContextProvider";
import { useEffect, useState } from "react";

const PostReadOnlyView = ({ params }) => {
  const { slug, id } = params;
  const { user } = useAppContext();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    setPost(await CrispyReadClient.getPostById(id, slug));
  };

  useEffect(() => {
    fetchPost();
  }, [slug, id, fetchPost]);

  if (post === null) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <title>{`Crispy Read | ${post.title}`}</title>
          <meta name="description" content={post.seoDescription} />
          <script async src="https://platform.twitter.com/widgets.js"></script>
          <script async src="//www.instagram.com/embed.js"></script>
          <button
            style={{
              display:
                user.username === post.author.username ? "block" : "none",
              background: post.published ? "#5f050f" : "green",
            }}
            className={styles.publish}
            onClick={() => {}}
          >
            {post.published ? "Archive" : "Publish"}
          </button>
          <button className={styles.categoryBadge}>{post.category.name}</button>
          <h1>{post?.title}</h1>
          <span style={{ color: "gray", fontSize: "14px" }}>
            {new Date(post.createdAt).toUTCString()}
          </span>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
      <div className={styles.aside}></div>
    </div>
  );
};

export default PostReadOnlyView;

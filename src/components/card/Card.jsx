/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  const date = new Date(item.createdAt);
  return (
    <div className={styles.container} style={{backgroundColor:'white', padding:'1rem'}}>
      <Link href={`/posts/${item.slug}`}>
        <img src={item.img} alt="" width={"100%"} height={200} />
        <h3>{item.title}</h3>
        <div className={styles.date}>
          {date.toLocaleString("default", { dateStyle: "medium" })}
        </div>
        <div
            style={{textTransform: 'none'}}
            dangerouslySetInnerHTML={{ __html: `${item?.desc.substring(0, 120)}...` }}
          />
      </Link>

      <div key={key}>
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          {/* <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 1200) }}
          /> */}
          <div>
            {/* <Link href={`/posts/${item.slug}`} className={styles.link}>
              Read More
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

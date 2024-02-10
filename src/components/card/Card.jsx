import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  const date = new Date(item.createdAt);
  return (
    <div>
      <Link href={`/posts/${item.slug}`}>
        <span className={styles.date}>
          {date.toLocaleString("default", { dateStyle: "medium" })}
        </span>
        <h1>{item.title}</h1>
      </Link>

      <div className={styles.container} key={key}>
        {item.img && (
          <div className={styles.imageContainer}>
            <Image src={item.img} alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 1200) }}
          />
          <Link href={`/posts/${item.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

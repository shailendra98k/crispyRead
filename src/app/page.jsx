import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, education and sports, in a concise, easy-to-digest format. Say goodbye to information overload and hello to a streamlined reading experience. Stay informed effortlessly with Crispy Read."
      />
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page}/>
        {/* <Menu /> */}
      </div>
    </div>
  );
}

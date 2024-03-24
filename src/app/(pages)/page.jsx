import styles from "./homepage.module.css";
import CategoryList from "@/app/components/categoryList/CategoryList";
import CardList from "@/app/components/cardList/CardList";
import Featured from "@/app/components/featured/Swappable";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 0;

  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, coding and sports, in a concise, easy-to-digest format. Stay informed effortlessly with Crispy Read."
      />
      <Featured />
      <CardList page={page} />
      <CategoryList />
      {/* </div> */}
    </div>
  );
}
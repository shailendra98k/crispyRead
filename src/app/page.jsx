import styles from "./homepage.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <title>Crispy Read - Where content meets clarity</title>
      <meta
        name="description"
        content="Experience a fresh approach to reading and learning with Crispy Read! Our web app delivers freshly brewed artcile on finance, news, entertainment, coding and sports, in a concise, easy-to-digest format. Stay informed effortlessly with Crispy Read."
      />
      
        <CardList page={page} />
      {/* </div> */}
    </div>
  );
}

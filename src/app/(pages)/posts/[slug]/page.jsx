import styles from "./singlePage.module.css";
import axios from "axios";
import { CRISPY_READ_CORE_BASE_URL, noCacheHeader } from "@/utils/constant";
import { Comp } from "./Comp";

const getData = async (slug) => {
  const res = await axios.get(`${CRISPY_READ_CORE_BASE_URL}/api/post/${slug}`, {
    headers: noCacheHeader,
  });
  if (res.status !== 200) {
    throw new Error("Failed");
  }

  const data = res.data;

  const date = new Date(data?.createdAt);
  return {
    _id: data?.id,
    desc: data?.content,
    title: data?.title,
    seoDescription: data?.seoDescription,
    img: "",
    slug: data?.slug,
    ...data,
    createdAt: date?.toLocaleDateString("default", { dateStyle: "medium" }),
    published: data?.published,
  };
};



// eslint-disable-next-line @next/next/no-async-client-component
const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Comp data={data} slug={slug} />
      </div>
      <div className={styles.aside}></div>
    </div>
  );
};

export default SinglePage;

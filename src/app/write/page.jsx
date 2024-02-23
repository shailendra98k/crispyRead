"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import axios from "axios";
import { getCookie } from "@/utils/constant";
const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["image", "link", "video"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("news");

  useEffect(() => {
    if (getCookie("auth") != process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
      router.push("/");
    }
  }, [router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await axios.post("/api/posts", {
      desc: description,
      slug: slugify(title),
      title: title,
      img: file,
      category: category,
      featured: false,
    });

    if (res.status === 200) {
      router.push(`/posts/${res.data["slug"]}`);
    }
  };

  return (
    <div className={styles.container}>
      <form>
        <div>
          <input
            required
            type="text"
            placeholder="Title"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <select
            required
            style={{ width: 200, padding: "16px", margin: "4px 0px" }}
            onChange={(value) => setCategory(value.target.value)}
          >
            <option value="news">News</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="sports">Sports</option>
            <option value="automobile">Automobile</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        <div className={styles.editor}>
          <ReactQuill
            className={styles.textArea}
            theme="snow"
            value={description}
            onChange={(value) => setDescription(value)}
            placeholder="Tell your story..."
            modules={{
              toolbar: toolbarOptions,
            }}
          />
        </div>
        <div>
          <textarea
            required
            style={{ margin: "60px 0px", height: "100px", width: "100%" }}
            placeholder="Seo Description"
          />
        </div>
        <button type="button" className={styles.publish} onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default WritePage;

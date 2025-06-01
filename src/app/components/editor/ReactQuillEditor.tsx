import dynamic from "next/dynamic";
import styles from "./editor.module.css";
import { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import * as React from "react";
import CategorySelect from "@/app/components/cardList/CategorySelect";

export const ReactQuillEditor = ({
  intialData = undefined,
  submitHandler = ({}) => {},
}) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import("react-quill");
          /* eslint-disable react/display-name */
          return (
            props: { forwardedRef: React.Ref<any> } & Record<string, any>
          ) => <RQ ref={props.forwardedRef} {...props} />;
        },
        {
          ssr: false,
        }
      ),
    []
  );

  const ImageHandler = (quill, value, callback) => {
    const range = quill.getSelection(true);
    const img = `<img src="${value}" alt="External Image"/>`;

    quill.clipboard.dangerouslyPasteHTML(range.index, img, "api");
    quill.setSelection(range.index + 1, 0);
    callback();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],

        handlers: {
          image: () => {
            const imageUrl = prompt("Enter the image URL");
            if (imageUrl) {
              ImageHandler(quillRef.current.getEditor(), imageUrl, () => {});
            }
          },
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [category, setCategory] = useState("news");
  const quillRef = React.useRef(null);

  useEffect(() => {
    if (intialData) {
      setDescription(intialData.content);
      setTitle(intialData.title);
      setSeoDescription(intialData.seoDescription);
      setCategory(intialData.category.name);
    }
  }, [intialData]);

  const handleSubmit = async () => {
    submitHandler({
      ...intialData,
      id: intialData?.id,
      slug: intialData?.slug,
      title,
      content: description,
      seoDescription,
      category: category,
    });
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <CategorySelect
          category={category}
          setCategory={setCategory}
          showAllCategory={false}
          redirection={false}
        />

        <div className={styles.editor} ref={quillRef}>
          <ReactQuill
            forwardedRef={quillRef}
            className={styles.textArea}
            theme="snow"
            value={description}
            onChange={(value) => setDescription(value)}
            placeholder="Tell your story..."
            modules={modules}
          />
        </div>
        <div>
          <textarea
            value={seoDescription}
            onChange={(e) => {
              setSeoDescription(e?.target?.value);
            }}
            required
            style={{ margin: "60px 0px", height: "100px", width: "100%" }}
            placeholder="Seo Description"
          />
        </div>
        <button type="button" className={styles.publish} onClick={handleSubmit}>
          {intialData ? "Update" : "Publish"}
        </button>
      </form>
    </div>
  );
};

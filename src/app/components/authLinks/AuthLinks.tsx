"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useEffect, useState } from "react";
import React from "react";
import { useAppContext } from "@/app/providers/AppContextProvider";
import { Loader } from "../loader";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppContext();
  useEffect(() => {}, [user]);
  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link
            style={{ color: "rgb(158, 118, 88)" }}
            onClick={() => setOpen(false)}
            href="/about"
          >
            About
          </Link>
          <Link
            style={{ color: "rgb(158, 118, 88)" }}
            onClick={() => setOpen(false)}
            href="/contact"
          >
            Contact
          </Link>
          <Link
            style={{ color: "rgb(158, 118, 88)" }}
            onClick={() => setOpen(false)}
            href={user.id ? "/write" : "/login"}
          >
            {user.id ? "Write a post" : "Login"}
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;

"use client";
import React, { useEffect } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import { useAppContext, UserType } from "@/app/providers/AppContextProvider";
import { Loader } from "../loader";

const Navbar = () => {
  const { user } = useAppContext();
  if (!user) {
    return <Loader />;
  }
  console.log("user", user.id);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={"/favicon.ico"} width="36" height={"36"} alt="" />
          <span
            style={{
              color: "#9e7658",
              position: "relative",
              bottom: "4px",
            }}
          >
            Crispy Read
          </span>
        </Link>
      </div>
      <div className={styles.links}>
        <Link
          href="/about"
          className={styles.link}
          style={{ color: "#9e7658" }}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={styles.link}
          style={{ color: "#9e7658" }}
        >
          Contact
        </Link>
        <Link
          href={user.type === UserType.LOGGED_IN ? "/write" : "/login"}
          className={styles.link}
          style={{ color: "#9e7658" }}
        >
          {user.type === UserType.LOGGED_IN ? "Write a post" : "Login"}
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;

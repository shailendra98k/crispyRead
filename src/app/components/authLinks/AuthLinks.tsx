"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import React from "react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

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
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;

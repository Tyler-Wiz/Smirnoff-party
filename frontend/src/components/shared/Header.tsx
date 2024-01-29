import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import bannerAd from "@/assets/leader.png";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navContainer}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <Image src={logo} alt="smirnoff logo" fill />
          </div>
        </Link>
        <h2>NKA 3.0</h2>
      </nav>
      <div className={styles.bannerContainer}>
        <Image src={bannerAd} alt="banner" fill />
      </div>
      <h3>Book Your Flight</h3>
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";
import bannerAd from "@/assets/leader.png";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navContainer}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <Image
              src="https://tooxclusive.com/wp-content/uploads/2024/01/logo.png"
              alt="smirnoff logo"
              fill
            />
          </div>
        </Link>
        <h2>NKA 3.0</h2>
      </nav>
      <div className={styles.bannerContainer}>
        <Image src={bannerAd} alt="banner" fill />
      </div>
    </header>
  );
};

export default Header;

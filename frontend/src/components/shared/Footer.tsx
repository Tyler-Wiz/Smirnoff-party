import Image from "next/image";
import styles from "../styles/Footer.module.css";
import myLogo from "@/assets/myLogo.png";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <p>&copy; 2024 All rights reserved.</p>
      <div className={styles.flex}>
        <p>Designed by</p>
        <div className={styles.imageContainer}>
          <Image src={myLogo} alt="Developer logo" fill />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

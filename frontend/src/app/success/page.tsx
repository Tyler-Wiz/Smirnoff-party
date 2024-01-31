import React from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import mailIcon from "@/assets/mobile-mail.png";
import Image from "next/image";
import styles from "@/components/styles/Success.module.css";

const page = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Image src={mailIcon} alt="paper plane" width={300} />
        <h3>Thank you for booking smirnoff flight 1864</h3>
        <p>Check your email for booking confirmation</p>
      </div>
      <Footer />
    </>
  );
};

export default page;

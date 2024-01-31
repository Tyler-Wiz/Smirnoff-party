"use client";

import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import styles from "@/components/styles/Modal.module.css";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [userAge, setUserAge] = useState<string>("");
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  const handleAgeInputChange = (e: any) => {
    setUserAge(e.target.value);
  };

  const handleAccessRequest = () => {
    const parsedAge = parseInt(userAge, 10);
    if (!isNaN(parsedAge) && parsedAge >= 18) {
      setAccessGranted(true);
    } else {
      setAccessGranted(false);
    }
  };

  useEffect(() => {
    setIsModalOpen(true);
    if (accessGranted) {
      setIsModalOpen(false);
    }
  }, [accessGranted]);

  return (
    <>
      {isModalOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <Image src={logo} alt="smirnoff logo" width={100} />
            <h3 className="uppercase text-3xl">Are You 18 Or Older?</h3>
            <div className="flex flex-col text-center gap-3">
              <p className="capitalize text-sm">Enter your age:</p>
              <input
                type="text"
                value={userAge}
                onChange={handleAgeInputChange}
              />
              <div className={styles.buttonContainer}>
                <button onClick={handleAccessRequest} type="submit">
                  Enter
                </button>
              </div>
            </div>
            <p>You must be 18 years or above to enter this site.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

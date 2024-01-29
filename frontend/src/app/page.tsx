"use client";

import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/shared/Header";
import { useState } from "react";
import styles from "@/components/styles/Home.module.css";
import Footer from "@/components/shared/Footer";
import Modal from "@/components/Modal";

export default function Home() {
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>("");

  return (
    <main>
      <Header />
      <AuthForm agreeTerms={agreeTerms} setSubmitError={setSubmitError} />
      {/* About the Event Section  */}
      <section className={styles.aboutContainer}>
        <p>
          Smirnoff <span>NoKnownAddress</span> is an invitation to explore the
          world, Smirnoff style, intriguing drinks inspired by Smirnoff’s global
          exploits to help you discover a new take on place and immerse yourself
          somewhere different for a moment. This year, we are inviting all vibe
          shifters, part rockers, game changers and table shakers to Fly
          Smirnoff Flight 1864.
        </p>
        <p>
          Come enjoy a world class Smirnoff party experience with a huge range
          of inflight entertainment, including music from XXX, XXXX and XXXX.
        </p>
      </section>
      {/* Agree to Terms checkbox */}
      <div className={styles.checkboxContainer}>
        <p aria-label="agreed-error">{submitError && submitError}</p>
        <div className={styles.checkBox}>
          <input
            type="checkbox"
            name="agreed"
            id="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            data-testid="agreed-checkbox"
          />
          <label htmlFor="checkbox">Accept Image Right & Data Privacy</label>
        </div>
      </div>
      {/* Image Right & Data Privacy */}
      <section className={styles.termsContainer}>
        <div>
          <h3>Image Right</h3>
          <p>
            By taking part in this event, you grant the event organizers full
            right to use the images resulting from the photography/video filming
            and any reproductions or adaptations for public purposes. This might
            include (but not limited to) the right to use them in printed and
            online publicity, social media and press releases.
          </p>
        </div>
        <div>
          <h3>Data Privacy</h3>
          <p>
            We will process your personal data to reserve a place for you at the
            event and provide you with event updates
          </p>
        </div>
      </section>
      <Footer />
      <Modal />
    </main>
  );
}

"use client";

import React, { useState } from 'react';
import styles from './Social.module.css';

// Sous-composant pour gérer l'ouverture/fermeture fluide de chaque question
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
      <div className={styles.faqHeader} onClick={() => setIsOpen(!isOpen)}>
        {question}
      </div>
      <div className={styles.faqContent}>
        <div className={styles.faqInner}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Social() {
  return (
    <section className={styles.socialContainer} id="faq-testimonials">

      {/* SECTION TÉMOIGNAGES */}
      <div>
        <h2 className={styles.sectionTitle}>Témoignages</h2>
        <div className={styles.sliderWrapper}>
          <div className={styles.slider}>

            <div className={styles.testimonialCard}>
              <p className={styles.quote}>"Les photos sont magnifiques, l'œil de qtn.raw a su capter exactement l'ambiance que nous voulions pour notre événement. Je recommande vivement !"</p>
              <div className={styles.author}>
                <div className={styles.authorImg}></div>
                <div className={styles.authorInfo}>
                  <h4>Camille L.</h4>
                  <span>Paris, Événement</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.quote}>"Une séance portrait très fluide. Il a su me mettre à l'aise direct et le rendu 'raw' est juste incroyable, avec une lumière naturelle parfaite."</p>
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <h4>Thomas B.</h4>
                  <span>Versailles, Portrait Solo</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <p className={styles.quote}>"Professionnel, réactif, et surtout très créatif. Les retouches sont légères et mettent en valeur le sujet sans dénaturer. Top !"</p>
              <div className={styles.author}>
                <div className={styles.authorImg}></div>
                <div className={styles.authorInfo}>
                  <h4>Sarah M.</h4>
                  <span>Fontainebleau, Couple</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION FAQ */}
      <div>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <div className={styles.faqList}>

          <FaqItem
            question="Combien de temps avant de recevoir les photos ?"
            answer="En général, je livre une première sélection sous 48h. Les retouches finales sont livrées sous 1 à 2 semaines en fonction du volume."
          />

          <FaqItem
            question="Vous déplacez-vous hors Île-de-France ?"
            answer="Oui, je suis basé à Paris et me déplace partout en France et à l'étranger pour des projets professionnels. Des frais de déplacement peuvent s'appliquer."
          />

          <FaqItem
            question="Livrez-vous les fichiers RAW bruts ?"
            answer="Non, mon travail inclut le tri et la colorimétrie (l'éditing fait partie de ma patte artistique). Vous recevrez les fichiers JPEG haute définition traités."
          />

        </div>
      </div>

    </section>
  );
}
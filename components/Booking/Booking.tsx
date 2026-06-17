"use client";

import React from 'react';
import styles from './Booking.module.css';

export default function Booking() {
  return (
    <section className={styles.bookingContainer} id="booking">
      <h2 className={styles.title}>Réserver un Shooting</h2>

      <div className={styles.content}>
        <div className={styles.pricing}>

          {/* Carte Tarif Standard */}
          <div className={styles.pricingCard}>
            <h3>Session Standard</h3>
            <div className={styles.price}>350€</div>
            <p>
              15 à 20 photos retouchées en haute définition. Idéal pour un book personnel, du stylisme ou du contenu éditorial.
            </p>
            <span className={styles.priceNote}>
              * Le tarif peut varier selon la nature du projet, la complexité du lieu, le studio, etc.
            </span>
          </div>

          {/* Carte Sur Devis */}
          <div className={styles.pricingCard}>
            <h3>Projets Spéciaux / Marques</h3>
            <div className={styles.price}>Sur devis</div>
            <p>
              Campagnes de marque, lookbooks complets, street-marketing ou projets artistiques à grande échelle avec DA sur-mesure.
            </p>
          </div>
        </div>

        {/* Formulaire de contact */}
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom / Prénom</label>
            <input type="text" id="name" required placeholder="Votre nom" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="votre@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">Type de projet</label>
            <select id="type" required>
              <option value="">Sélectionnez une option</option>
              <option value="portrait">Portrait / Solo</option>
              <option value="brand">Lookbook / Mode / Marque</option>
              <option value="event">Événementiel / Concert</option>
              <option value="other">Autre projet</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Votre projet</label>
            <textarea id="message" rows={4} required placeholder="Décrivez vos attentes, l'ambiance, les pièces à shooter, le lieu envisagé..."></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Envoyer la demande
          </button>
        </form>
      </div>
    </section>
  );
}
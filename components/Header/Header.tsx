import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <picture>
        <source srcSet="/logob.png" media="(prefers-color-scheme: light)" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logow.png" alt="qtn.raw logo" className={styles.logo} />
      </picture>
      <nav className={styles.nav}>
        <a href="#">Accueil</a>
        <a href="#map">Spots</a>
        <a href="#booking">Réservation</a>
        <a href="#faq-testimonials">Infos</a>
      </nav>
    </header>
  );
}

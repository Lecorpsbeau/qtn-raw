"use client";

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDragging, setIsTouchDragging] = useState(false);

  // 🎯 RÈGLE TON POINT DE FOCUS ICI (X Y)
  // "50% 50%" = centre
  // "50% 100%" = tout en bas (idéal pour voir la route/voiture)
  const focusPoint = "50% 90%";

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setPosition(percent);
  };

  // 🖥️ SUR PC : Suivi direct de la souris au survol (pas besoin de cliquer)
  const onMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  // 📱 SUR MOBILE : Mode "appui et glisse" pour ne pas bloquer le scroll du site
  const onTouchStart = (e: TouchEvent) => {
    setIsTouchDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isTouchDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleTouchEnd = () => setIsTouchDragging(false);

    // Sécurité : si le doigt quitte l'écran n'importe où, on arrête le mouvement
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Post-Production & Retouches</h2>
      <div
        className={styles.sliderWrapper}
        ref={containerRef}
        style={{
          '--position': `${position}%`,
          '--focus-point': focusPoint // ⚡️ Ajout du point de focus ici
        } as React.CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/apres.jpg" alt="Après" className={`${styles.image} ${styles.afterImage}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/avant.jpg" alt="Avant" className={`${styles.image} ${styles.beforeImage}`} />

        <div className={styles.handle}>
          <div className={styles.handleCircle}>
            <div className={`${styles.arrow} ${styles.arrowLeft}`}></div>
            <div className={`${styles.arrow} ${styles.arrowRight}`}></div>
          </div>
        </div>

        {/* L'overlay écoute désormais le simple survol de souris OU le touché mobile */}
        <div
          className={styles.sliderOverlay}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        ></div>
      </div>
    </section>
  );
}
"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ParallaxGrid.module.css';

export default function ParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const itemPositions = useRef<number[]>([]);

  const photos = [
    { id: '1', url: '/photos/IMG_0452 2.jpg', title: 'Paris Centre' },
    { id: '2', url: '/photos/IMG_0456 2.jpg', title: 'Street' },
    { id: '3', url: '/photos/IMG_0459.jpg', title: 'Nature' },
    { id: '4', url: '/photos/IMG_0468 2.jpg', title: 'Montmartre' },
    { id: '5', url: '/photos/IMG_0482 2.jpg', title: 'Versailles' },
    { id: '6', url: '/photos/IMG_0482.jpg', title: 'Auto' },
    { id: '7', url: '/photos/IMG_0484 2.jpg', title: 'Architecture' },
    { id: '8', url: '/photos/IMG_0485 2.jpg', title: 'Portrait' },
    { id: '9', url: '/photos/IMG_1529 2.jpg', title: 'Urbain' },
    { id: '10', url: '/photos/IMG_1530 2.jpg', title: 'Fontainebleau' },
    { id: '11', url: '/photos/IMG_1538 2.jpg', title: 'Sport' },
    { id: '12', url: '/photos/IMG_2836 2.jpg', title: 'Château' },
    { id: '13', url: '/photos/IMG_7958 2.jpg', title: 'Voyage' },
    { id: '14', url: '/photos/P1330206.JPG', title: 'Détails' },
    { id: '15', url: '/photos/qtn.raw-2 2.jpg', title: 'Iconique' },
  ];

  useEffect(() => {
    const calculatePositions = () => {
      itemPositions.current = itemsRef.current.map(item => {
        if (!item) return 0;
        return item.getBoundingClientRect().top + window.scrollY;
      });
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const centerY = scrollY + vh / 2;

      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const itemTop = itemPositions.current[index];
        const itemCenter = itemTop + 150;
        const dist = (itemCenter - centerY) / (vh / 2);

        // Effets cinématiques
        const scale = Math.max(0.7, 1 - Math.abs(dist) * 0.3);
        const rotateX = -dist * 25;
        // Bombé vers l'intérieur : colonne 0 (gauche) pivote positif, colonne 1 (droite) négatif
        const rotateY = (index % 2 === 0 ? 1 : -1) * (dist * 20);
        const blur = Math.max(0, (Math.abs(dist) - 0.4) * 12);
        const y = (index % 4) * 60 * (scrollY / 1000);

        item.style.setProperty('--scale', scale.toString());
        item.style.setProperty('--rotate-x', `${rotateX}deg`);
        item.style.setProperty('--rotate-y', `${rotateY}deg`);
        item.style.setProperty('--blur', `${blur}px`);
        item.style.setProperty('--y', `${y}px`);
      });
    };

    const onScroll = () => requestAnimationFrame(updateParallax);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          MIO SAKURAI — SHIN YAMAMOTO — MIO SAKURAI — SHIN YAMAMOTO —
        </div>
      </div>

      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={styles.gridItem}
            ref={(el) => { itemsRef.current[index] = el; }}
          >
            <img src={photo.url} alt={photo.title} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
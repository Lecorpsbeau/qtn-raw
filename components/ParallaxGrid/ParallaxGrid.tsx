"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ParallaxGrid.module.css';

export default function ParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);

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
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;

      // Envoie la valeur exacte du scroll au conteneur pour le texte
      if (containerRef.current) {
        containerRef.current.style.setProperty('--scroll-y', `${scrollY}px`);
      }

      wrappersRef.current.forEach((wrapper) => {
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;

        const dist = (itemCenter - viewportCenter) / viewportCenter;
        const absDist = Math.abs(dist);

        // Effet de cylindre 3D
        const rotateX = dist * -70;
        const z = -Math.pow(absDist, 1.5) * 400;
        const scale = Math.max(0.6, 1 - absDist * 0.2);
        const opacity = Math.max(0, 1 - absDist * 0.8);
        const blur = Math.max(0, (absDist - 0.2) * 10);

        const innerItem = wrapper.firstElementChild as HTMLElement;
        if (innerItem) {
          innerItem.style.setProperty('--rotate-x', `${rotateX}deg`);
          innerItem.style.setProperty('--z', `${z}px`);
          innerItem.style.setProperty('--scale', scale.toString());
          innerItem.style.setProperty('--blur', `${blur}px`);
          innerItem.style.setProperty('--opacity', opacity.toString());
        }
      });
    };

    const onScroll = () => requestAnimationFrame(updateParallax);
    window.addEventListener('scroll', onScroll, { passive: true });

    updateParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Texte lié au Scroll */}
      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          qtn.raw - the portfolio of raw -  qtn.raw - the portfolio of raw - qtn.raw
        </div>
      </div>

      {/* Grille d'images */}
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={styles.gridItemWrapper}
            ref={(el) => { wrappersRef.current[index] = el; }}
          >
            <div className={styles.gridItem}>
              <img src={photo.url} alt={photo.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
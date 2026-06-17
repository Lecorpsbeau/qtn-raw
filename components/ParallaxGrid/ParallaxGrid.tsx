"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ParallaxGrid.module.css';

export default function ParallaxGrid() {
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  // J'utilise tes photos existantes, l'effet s'appliquera dessus
  const photos = [
    { id: '1', url: '/photos/IMG_0452_2.jpg', title: 'Paris Centre' },
    { id: '2', url: '/photos/IMG_0456_2.jpg', title: 'Street' },
    { id: '3', url: '/photos/IMG_0459.jpg', title: 'Nature' },
    { id: '4', url: '/photos/IMG_0468_2.jpg', title: 'Montmartre' },
    { id: '5', url: '/photos/IMG_0482_2.jpg', title: 'Versailles' },
    { id: '6', url: '/photos/IMG_0482.jpg', title: 'Auto' },
    { id: '7', url: '/photos/IMG_0484_2.jpg', title: 'Architecture' },
    { id: '8', url: '/photos/IMG_0485_2.jpg', title: 'Portrait' },
    { id: '9', url: '/photos/IMG_1529_2.jpg', title: 'Urbain' },
    { id: '10', url: '/photos/IMG_1530_2.jpg', title: 'Fontainebleau' },
    { id: '11', url: '/photos/IMG_1538_2.jpg', title: 'Sport' },
    { id: '12', url: '/photos/IMG_2836_2.jpg', title: 'Château' },
    { id: '13', url: '/photos/IMG_7958_2.jpg', title: 'Voyage' },
    { id: '14', url: '/photos/P1330206.JPG', title: 'Détails' },
    { id: '15', url: '/photos/qtn.raw-2_2.jpg', title: 'Iconique' },
  ];

  useEffect(() => {
    const updateParallax = () => {
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;

      wrappersRef.current.forEach((wrapper) => {
        if (!wrapper) return;

        // On mesure le conteneur parent (qui ne bouge pas avec la 3D)
        const rect = wrapper.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;

        // Distance normalisée entre -1 (haut de l'écran) et 1 (bas de l'écran)
        const dist = (itemCenter - viewportCenter) / viewportCenter;
        const absDist = Math.abs(dist);

        // --- MATHS DU CYLINDRE (Exactement comme la vidéo) ---

        // 1. Rotation X : Les images s'inclinent en haut et en bas
        const rotateX = dist * -70; // 70 degrés d'angle max

        // 2. Traduction Z : Les images s'enfoncent dans le fond aux extrémités
        const z = -Math.pow(absDist, 1.5) * 400; // Courbe douce pour repousser

        // 3. Scale : Légèrement plus petit sur les bords
        const scale = Math.max(0.6, 1 - absDist * 0.2);

        // 4. Opacité & Flou : Disparaissent aux extrémités
        const opacity = Math.max(0, 1 - absDist * 0.8);
        const blur = Math.max(0, (absDist - 0.2) * 10);

        // On applique les variables CSS sur l'enfant (l'image)
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

    // Initialisation au chargement
    updateParallax();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Le texte défilant exact de la vidéo */}
      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          SORA TAKAHASHI 空 高橋 AOI NAKAMURA 葵 中村 REN FUJIMOTO 蓮 藤本 MIO SAKURAI 澪 桜井 SHIN YAMAMOTO 真 山本
          &nbsp;&nbsp;&nbsp;&nbsp;
          SORA TAKAHASHI 空 高橋 AOI NAKAMURA 葵 中村 REN FUJIMOTO 蓮 藤本 MIO SAKURAI 澪 桜井 SHIN YAMAMOTO 真 山本
        </div>
      </div>

      {/* La Grille */}
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
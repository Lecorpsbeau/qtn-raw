import React from 'react';
import styles from './InteractiveMap.module.css';

const spots = [
  { id: 'notre_dame', name: 'Notre - Dame', x: '47%', y: '40%', desc: 'Cœur de ville, Street', img: '/map_spots/notre_dame.jpg' },
  { id: 'versailles', name: 'Versailles', x: '38%', y: '45%', desc: 'Château et Jardins', img: '/map_spots/versailles.jpeg' },
  { id: 'fontainebleau', name: 'Fontainebleau', x: '60%', y: '55%', desc: 'Forêt et rochers', img: '/map_spots/fontainebleau.jpg' },
  { id: 'montmartre', name: 'Montmartre', x: '46%', y: '35%', desc: 'Ambiance bohème', img: '/map_spots/montmartre.jpg' },
];

export default function InteractiveMap() {
  return (
    <section className={styles.mapContainer} id="map">
      <h2 className={styles.title}>Spots de Shooting en Île-de-France</h2>
      <div className={styles.mapWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/carte.svg" alt="Carte Île-de-France" className={styles.carteSvg} />

        {spots.map((spot) => (
          <div
            key={spot.id}
            className={styles.point}
            style={{ left: spot.x, top: spot.y }}
          >
            <div className={styles.tooltip}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={spot.img} alt={spot.name} />
              <h4>{spot.name}</h4>
              <p>{spot.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Publicaciones.js
import React, { useState } from 'react';
import PublicacionList from '../components/Publications/PublicationList';
import SearchBar from '../components/Publications/SearchBar';

export const Publicaciones = () => {

  const [busqueda, setBusqueda] = useState('');

  return (
    <main>
      <section className="section-publications">
        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        <div className="text-container">

          <h2>PUBLICACIONES</h2>
          <h1>Explorando finanzas de impacto</h1>
          <h3>Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente</h3>
        </div>
      </section>

      <section style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '319.33px',
            clipPath: 'polygon(100% 100%, 0% 100% , 0.00% -0.63%, 2.00% -0.12%, 4.00% 0.44%, 6.00% 1.04%, 8.00% 1.69%, 10.00% 2.39%, 12.00% 3.14%, 14.00% 3.92%, 16.00% 4.75%, 18.00% 5.61%, 20.00% 6.51%, 22.00% 7.44%, 24.00% 8.41%, 26.00% 9.40%, 28.00% 10.42%, 30.00% 11.47%, 32.00% 12.53%, 34.00% 13.61%, 36.00% 14.71%, 38.00% 15.83%, 40.00% 16.95%, 42.00% 18.08%, 44.00% 19.21%, 46.00% 20.35%, 48.00% 21.48%, 50.00% 22.62%, 52.00% 23.74%, 54.00% 24.85%, 56.00% 25.95%, 58.00% 27.04%, 60.00% 28.11%, 62.00% 29.16%, 64.00% 30.18%, 66.00% 31.18%, 68.00% 32.15%, 70.00% 33.08%, 72.00% 33.99%, 74.00% 34.86%, 76.00% 35.69%, 78.00% 36.48%, 80.00% 37.23%, 82.00% 37.93%, 84.00% 38.59%, 86.00% 39.20%, 88.00% 39.77%, 90.00% 40.28%, 92.00% 40.74%, 94.00% 41.15%, 96.00% 41.51%, 98.00% 41.81%, 100.00% 42.05%)',
            backgroundColor: '#226516',
            zIndex: -1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '252px',
            left: 0,
            width: '100%',
            height: '619.33px',
            clipPath: 'polygon(100% 0%, 0% 0% , 0.00% 31.01%, 2.00% 31.71%, 4.00% 32.40%, 6.00% 33.08%, 8.00% 33.74%, 10.00% 34.39%, 12.00% 35.02%, 14.00% 35.65%, 16.00% 36.25%, 18.00% 36.84%, 20.00% 37.41%, 22.00% 37.96%, 24.00% 38.49%, 26.00% 39.00%, 28.00% 39.49%, 30.00% 39.95%, 32.00% 40.40%, 34.00% 40.82%, 36.00% 41.22%, 38.00% 41.60%, 40.00% 41.95%, 42.00% 42.27%, 44.00% 42.57%, 46.00% 42.84%, 48.00% 43.09%, 50.00% 43.31%, 52.00% 43.50%, 54.00% 43.67%, 56.00% 43.81%, 58.00% 43.92%, 60.00% 44.00%, 62.00% 44.05%, 64.00% 44.08%, 66.00% 44.07%, 68.00% 44.04%, 70.00% 43.99%, 72.00% 43.90%, 74.00% 43.78%, 76.00% 43.64%, 78.00% 43.47%, 80.00% 43.27%, 82.00% 43.05%, 84.00% 42.80%, 86.00% 42.52%, 88.00% 42.21%, 90.00% 41.88%, 92.00% 41.53%, 94.00% 41.15%, 96.00% 40.75%, 98.00% 40.32%, 100.00% 39.87%)',
            backgroundColor: '#226516',
            zIndex: -2,
          }}
        />

        {/* Contenido */}
        <div style={{ zIndex: 1 }}>
          <PublicacionList busqueda={busqueda} />
        </div>
      </section>

    </main>
  );
};

export default Publicaciones;
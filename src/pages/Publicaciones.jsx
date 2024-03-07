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

      <section>
        <PublicacionList busqueda={busqueda} />
      </section>

    </main>
  );
};

export default Publicaciones;
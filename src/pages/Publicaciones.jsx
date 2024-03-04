// Publicaciones.js

import React, { useState } from 'react';
import PublicacionList from '../components/Publications/PublicacionList';
import SearchBar from '../components/Publications/SearchBar';


export const Publicaciones = () => {
  
  const [busqueda, setBusqueda] = useState('');

  return (
    <main>
      <section className="section-port">
        <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        <h2>Publicaciones</h2>
        <h1>Explorando finanzas de impacto</h1>
        <h3>Conocé cómo decisiones financieras pueden impactar positivamente en la sociedad y el medio ambiente</h3>
      </section>

      <section>
        <PublicacionList busqueda={busqueda} />
      </section>

    </main>
  );
};

export default Publicaciones;
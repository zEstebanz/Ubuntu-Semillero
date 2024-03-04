import React, { useState } from 'react';
import SearchMicro from '../components/Microenterprises/SearchMicro';
import MicroList from '../components/Microenterprises/MicroList';
import Categories from '../components/Microenterprises/Categories';

export const Micro = () => {
    const [search, setSearch] = useState('');

    return (
        <main>
            <section className="section-port">
                <SearchMicro search={search} setSearch={setSearch} />
                <h2>MICROEMPRENDIMIENTOS</h2>
                <h1>Invertí sostenible</h1>
                <h3>Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras</h3>
            </section>

            <section>
                <Categories />
            </section>
            
            {/* <section>
                <MicroList search={search} />
            </section> */}
            
        </main>
    )
}
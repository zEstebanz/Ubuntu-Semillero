import React, { Children, useState } from 'react';
import SearchMicro from '../components/Microenterprises/SearchMicro';
import MicroList from '../components/Microenterprises/MicroList';
import MicroCategori from '../components/Microenterprises/MicroCategori';
import { Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Micro = ({ children }) => {
    const [search, setSearch] = useState('');
    const { pathname } = useLocation();

    console.log(pathname)

    return (
        <main>
            <section className="section-micro">

                <SearchMicro search={search} setSearch={setSearch}/>

                <div className='text-container'>
                    <h2>MICROEMPRENDIMIENTOS</h2>
                    <h1>Invertí sostenible</h1>
                    <h3>Explorá las categorías y encontrá la inversión sostenible que mejor se ajuste a tus metas financieras</h3>
                </div>

            </section>

            <section>
                {pathname === '/microemprendimientos' ? <MicroCategori /> : null}
            </section>

            <section>
                <Outlet />
            </section>
        </main>
    )
}
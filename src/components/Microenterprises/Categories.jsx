import React from 'react';

const Caracteristicas = () => {
    return (
        <div>
            <h1>ODS 2030</h1>
            <div className="categories">
                <div className="category">
                    <img src="https://image.png" alt="Inclusión financiera" />
                    <h2>Inclusión financiera</h2>
                    <ul>
                        <li>Economía social/Desarrollo local</li>
                        <li>Microcréditos</li>
                    </ul>
                </div>
                <div className="category">
                    <img src="https://image.png" alt="Agroecología" />
                    <h2>Agroecología</h2>
                    <ul>
                        <li>Agricultura sostenible</li>
                        <li>Comercio justo</li>
                    </ul>
                </div>
                <div className="category">
                    <img src="https://image.png" alt="Alimentación saludable" />
                    <h2>Alimentación saludable</h2>
                    <ul>
                        <li>Nutrición infantil</li>
                        <li>Seguridad alimentaria</li>
                    </ul>
                </div>
                <div className="category">
                    <img src="https://image.png" alt="Conservación/regeneración" />
                    <h2>Conservación/regeneración</h2>
                    <ul>
                        <li>Cambio climático</li>
                        <li>Biodiversidad</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Caracteristicas;

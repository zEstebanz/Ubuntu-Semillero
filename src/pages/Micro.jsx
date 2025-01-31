/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MicroCategori from "../components/Microenterprises/MicroCategori";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MicroResults from "../components/MicroResults";
import axios from "axios";
import { ubuntuApi } from "../utils/services/axiosConfig";

export const Micro = ({ children }) => {
  const [search, setSearch] = useState("");
  const [microList, setMicroList] = useState([]);
  const [microFilterList, setMicroFilterList] = useState([]);
  const { pathname } = useLocation();

  console.log(pathname);

  useEffect(() => {
    const fetchMicroList = async () => {
      try {
        const response = await ubuntuApi.get("/microemprendimientos/findAll");
        setMicroList(response.data.body);
      } catch (error) {
        console.error(
          "Error al obtener la lista de microemprendimientos:",
          error
        );
      }
    };

    fetchMicroList();
  }, []);

  useEffect(() => {
    const filteredMicroList = microList?.filter((micro) => {
      return micro.nombre.toLowerCase().includes(search);
    });
    setMicroFilterList(filteredMicroList);
  }, [search, microList]);

  return (
    <main>
      <SearchBar busqueda={search} setBusqueda={setSearch} />
      {search ? (
        <MicroResults microFilterList={microFilterList} />
      ) : (
        <div>
          <section className="section-micro">
            <div className="text-container">
              <h2>MICROEMPRENDIMIENTOS</h2>
              <h1>Invertí sostenible</h1>
              <h3>
                Explorá las categorías y encontrá la inversión sostenible que
                mejor se ajuste a tus metas financieras
              </h3>
            </div>
          </section>

          <section style={{ position: "relative" }}>
            


            <div
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                minHeight: "619.33px",
                height: 'auto',
                clipPath:
                  "polygon(100% 100%, 0% 100% , 0.00% -0.67%, 1.33% -0.39%, 2.67% -0.06%, 4.00% 0.32%, 5.33% 0.77%, 6.67% 1.27%, 8.00% 1.82%, 9.33% 2.43%, 10.67% 3.08%, 12.00% 3.80%, 13.33% 4.56%, 14.67% 5.37%, 16.00% 6.22%, 17.33% 7.12%, 18.67% 8.07%, 20.00% 9.06%, 21.33% 10.09%, 22.67% 11.16%, 24.00% 12.27%, 25.33% 13.41%, 26.67% 14.59%, 28.00% 15.79%, 29.33% 17.03%, 30.67% 18.29%, 32.00% 19.58%, 33.33% 20.89%, 34.67% 22.21%, 36.00% 23.56%, 37.33% 24.92%, 38.67% 26.30%, 40.00% 27.69%, 41.33% 29.08%, 42.67% 30.48%, 44.00% 31.88%, 45.33% 33.29%, 46.67% 34.69%, 48.00% 36.09%, 49.33% 37.48%, 50.67% 38.87%, 52.00% 40.24%, 53.33% 41.59%, 54.67% 42.94%, 56.00% 44.26%, 57.33% 45.56%, 58.67% 46.84%, 60.00% 48.09%, 61.33% 49.32%, 62.67% 50.52%, 64.00% 51.68%, 65.33% 52.81%, 66.67% 53.91%, 68.00% 54.96%, 69.33% 55.98%, 70.67% 56.95%, 72.00% 57.89%, 73.33% 58.77%, 74.67% 59.62%, 76.00% 60.41%, 77.33% 61.15%, 78.67% 61.85%, 80.00% 62.49%, 81.33% 63.08%, 82.67% 63.61%, 84.00% 64.09%, 85.33% 64.52%, 86.67% 64.89%, 88.00% 65.20%, 89.33% 65.45%, 90.67% 65.65%, 92.00% 65.78%, 93.33% 65.86%, 94.67% 65.88%, 96.00% 65.84%, 97.33% 65.74%, 98.67% 65.59%, 100.00% 65.37%)",
                backgroundColor: "#226516",
                zIndex: -1,
              }}
            />
            {pathname === "/microemprendimientos" ? <MicroCategori /> : null}
          </section>

          <section>
            <Outlet />
          </section>
        </div>
      )}
    </main>
  );
};

import Goals from "../components/landing/goals";
import Categories from "../components/landing/categories";
import { Hero } from "../components/landing/Hero";
import LandingPosts from "../components/landing/LandingPosts";
import SearchBar from "./../components/SearchBar";
import { useEffect, useState } from "react";
import MicroResults from "../components/landing/MicroResults";
import { ubuntuApi } from "../utils/services/axiosConfig";

export const Landing = () => {
  const [search, setSearch] = useState("");
  const [microList, setMicroList] = useState([]);
  const [microFilterList, setMicroFilterList] = useState([]);

  useEffect(() => {
    const fetchMicroList = async () => {
      try {
        const response = await ubuntuApi("/microemprendimientos/findAll");
        setMicroList(response.data);
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
      return micro.name.toLowerCase().includes(search);
    });
    setMicroFilterList(filteredMicroList);
  }, [search, microList]);

  return (
    <div>
      <SearchBar busqueda={search} setBusqueda={setSearch} />
      {search ? (
        <MicroResults microFilterList={microFilterList} />
      ) : (
        <div>
          <Hero />
          <Goals />
          <Categories />
          <LandingPosts />
        </div>
      )}
    </div>
  );
};

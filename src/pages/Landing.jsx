import Goals from "../components/landing/goals";
import Categories from "../components/landing/categories";
import { Hero } from "../components/landing/Hero";
import LandingPosts from "../components/landing/LandingPosts";
import SearchBar from "./../components/SearchBar";

export const Landing = () => {
  return (
    <div>
      <SearchBar />
      <Hero />
      <Goals />
      <Categories />
      <LandingPosts />
    </div>
  );
};

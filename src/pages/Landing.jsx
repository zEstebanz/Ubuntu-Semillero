import Goals from "../components/landing/goals";
import Categories from "../components/landing/categories";
import { Hero } from "../components/landing/Hero";
import LandingPosts from "../components/landing/LandingPosts";
import { useSession } from "../hooks/useSession";

export const Landing = () => {
  const user = useSession();

  return (
    <div>
      <Hero />
      <Goals />
      <Categories />
      <LandingPosts />
    </div>
  );
};

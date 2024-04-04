import Goals from "../components/landing/goals";
import Categories from "../components/landing/categories";
import { Hero } from "../components/landing/Hero";
import LandingPosts from "../components/landing/LandingPosts";
import { useSession } from "../hooks/useSession";
import { Navigate } from "react-router-dom";

export const Landing = () => {
  const user = useSession();

  if(user) {
    return <Navigate to='/dashboard-admin'/>
  }

  return (
    <div>
      <Hero />
      <Goals />
      <Categories />
      <LandingPosts />
    </div>
  );
};

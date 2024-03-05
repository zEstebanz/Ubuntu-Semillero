import React from "react";
import Goals from "../components/landing/goals";
import Categories from "../components/landing/categories";
import LandingPosts from "../components/LandingPosts";

export const Landing = () => {
  return (
    <div>
      <Goals />
      <Categories />
      <LandingPosts />
    </div>
  );
};

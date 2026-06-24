import React from "react";
import { HeroSection } from "../components/hero/HeroSection";
import TicketsContainer from "../components/TicketsContainer";

const MainPage = () => {
  return (
    <main className="">
      <HeroSection></HeroSection>
      <TicketsContainer />
    </main>
  );
};

export default MainPage;

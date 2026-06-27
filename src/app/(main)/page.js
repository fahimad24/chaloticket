import React from "react";
import { HeroSection } from "../components/hero/HeroSection";
import TicketsContainer from "../components/TicketsContainer";
import ExtraSections from "../components/ExtraSections";
import CTAAction from "../components/CTAAction";

const MainPage = () => {
  return (
    <main className="">
      <HeroSection></HeroSection>
      <TicketsContainer />
      <CTAAction />
      <ExtraSections />
    </main>
  );
};

export default MainPage;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import TopBanner from "./TopBanner";
import ClassesSection from "./ClassesSection";
import Footer from "./Footer";
import AdsSection from "./AdsSection";

const HomePage = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-wrapper">
      <div className="circle deco-pink"></div>
      <div className="circle deco-mint"></div>
      <div className="circle deco-yellow"></div>
      <div className="circle deco-sky"></div>

      <Header />
      <TopBanner activeBanner={activeBanner} />
      <ClassesSection />
      <AdsSection/>
      <Footer />
    </div>
  );
};

export default HomePage;

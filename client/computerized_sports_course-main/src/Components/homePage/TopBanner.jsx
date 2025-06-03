import React from "react";

const TopBanner = ({ activeBanner }) => {
  return (
    <div className="top-banner">
      <div className={`banner-slide ${activeBanner === 0 ? "active" : ""}`}>
        <img src="/assets/ח.jpg" alt="vcccc" className="banner-image2" />
        <img
          src="/assets/good2.gif"
          alt="פרסומת מיוחדת"
          className="banner-like2"
        />
        <div className="banner-caption2"></div>
        <p className="aaa">Fitmiss</p>
        <p className="caption-small2">עולם הכושר שלך</p>
      </div>
      <div className={`banner-slide ${activeBanner === 1 ? "active" : ""}`}>
        <img src="/assets/ads3.jpg" alt="vcccc" className="banner-image" />
        <img
          src="/assets/Like Button.gif"
          alt="פרסומת מיוחדת"
          className="banner-like"
        />
        <div className="banner-caption">הגעת למקום הנכון</div>
        <div className="caption-small">כאן תוכלי להגיע לשיא הכושר בקלות וביעילות</div>
      </div>
    </div>
  );
};

export default TopBanner;

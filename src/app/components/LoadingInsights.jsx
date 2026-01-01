"use client";
import React, { useEffect, useState } from "react";
import { WEBSITE_INSIGHTS } from "../constants/insights";

const LoadingInsights = () => {
  const insights = WEBSITE_INSIGHTS;

  const [currentInsight, setCurrentInsight] = useState(insights[0]);
  const [isVisible, setIsVisible] = useState(true);

  const getRandomInsight = (currentInsight) => {
    const filteredInsights = insights.filter(
      (insight) => insight !== currentInsight
    );
    const randomIndex = Math.floor(Math.random() * filteredInsights.length);
    return filteredInsights[randomIndex];
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentInsight((prevInsight) => getRandomInsight(prevInsight));
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p
      className={`w-11/12 text-center transition-opacity duration-500 text-sm underline ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {currentInsight}
    </p>
  );
};

export default LoadingInsights;

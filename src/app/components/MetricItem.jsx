'use client'
import { useEffect, useState } from "react";
import Circle from "react-circle";

export default function MetricItem({ name, score }) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      setProgress(score);
    }, [score]);

    const genColor = () => {
        if(score >= 90) return "#4caf50";
        if(score >= 70) return "#ff9800";
        return "#f44336"; 
    }
    
  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <h3>{name}</h3>
      <Circle
        progress={progress}
        animate={true}
        roundedStroke
        animationDuration="2s"
        lineWidth={40}
        progressColor={genColor()}
        size={"5rem"}
      />
    </div>
  );
}

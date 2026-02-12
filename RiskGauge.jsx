import React, { useEffect, useRef } from "react";

const RiskGauge = ({ riskScore, riskLevel }) => {
  const needleRef = useRef(null);

  // Convert riskScore (0–200) → 0–100%
  const percentage = Math.min((riskScore / 200) * 100, 100);

  // Rotation: -90° to +90°
  const rotation = -90 + percentage * 1.8;

  const getColor = () => {
    if (riskLevel === "High") return "text-red-500";
    if (riskLevel === "Moderate") return "text-yellow-400";
    return "text-green-400";
  };

  const getBgColor = () => {
    if (riskLevel === "High") return "bg-red-500";
    if (riskLevel === "Moderate") return "bg-yellow-400";
    return "bg-green-500";
  };

  useEffect(() => {
    if (needleRef.current) {
      needleRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  const getRiskFactors = () => {
    const factors = [];
    if (riskScore >= 150) factors.push("High Rainfall");
    if (riskScore >= 120 && riskScore < 180)
      factors.push("Moderate Conditions");
    if (riskScore >= 180) factors.push("Poor Drainage");
    if (riskScore >= 180) factors.push("Low Elevation");
    return factors;
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 text-white">
      
      <h2 className="text-2xl font-semibold mb-4">
        Risk Assessment
      </h2>

      {/* Risk Level */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-blue-200">Flood Risk Level:</span>
        <span className={`font-bold text-xl ${getColor()}`}>
          {riskLevel.toUpperCase()}
        </span>
      </div>

      {/* Gauge */}
      <div className="relative flex justify-center items-center mb-6">
        
        {/* Semicircle */}
        <div className="w-52 h-28 overflow-hidden">
          <div className="w-52 h-52 rounded-full border-[16px] border-gray-300 border-b-transparent border-l-transparent border-r-transparent"></div>
        </div>

        {/* Needle */}
        <div
          ref={needleRef}
          className="absolute w-1 h-20 origin-bottom transition-transform duration-700 ease-out"
          style={{
            backgroundColor:
              riskLevel === "High"
                ? "#ef4444"
                : riskLevel === "Moderate"
                ? "#eab308"
                : "#22c55e",
          }}
        ></div>

        {/* Center dot */}
        <div className={`absolute w-4 h-4 rounded-full ${getBgColor()}`}></div>
      </div>

      {/* Score */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getColor()}`}>
          {Math.round(riskScore)}%
        </div>
        <p className="text-blue-200 text-sm">Risk Score</p>
      </div>

      {/* Risk Factors */}
      <div>
        <h4 className="text-blue-200 mb-2">
          Contributing Factors:
        </h4>
        <div className="space-y-1 text-sm">
          {getRiskFactors().length === 0 ? (
            <p className="text-green-300">Stable Conditions</p>
          ) : (
            getRiskFactors().map((factor, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>{factor}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
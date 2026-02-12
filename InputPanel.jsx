import React from "react";

const InputPanel = ({
  city,
  setCity,
  rainfall,
  setRainfall,
  drainage,
  setDrainage,
  elevation,
  setElevation,
  onAnalyze,
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 space-y-6">
      
      <h2 className="text-2xl font-semibold text-white">
        Input Data
      </h2>

      {/* City Selection */}
      <div className="space-y-2">
        <label className="text-sm text-blue-200">Select City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>Mumbai</option>
          <option>Chennai</option>
          <option>Bangalore</option>
        </select>
      </div>

      {/* Rainfall */}
      <div className="space-y-2">
        <label className="text-sm text-blue-200">
          Rainfall in Last 24 Hours
        </label>

        <input
          type="range"
          min="0"
          max="300"
          value={rainfall}
          onChange={(e) => setRainfall(Number(e.target.value))}
          className="w-full accent-blue-500"
        />

        <div className="text-right text-blue-100 text-sm">
          {rainfall} mm
        </div>
      </div>

      {/* Drainage */}
      <div className="space-y-2">
        <label className="text-sm text-blue-200">
          Drainage Capacity
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={drainage}
          onChange={(e) => setDrainage(Number(e.target.value))}
          className="w-full accent-green-400"
        />

        <div className="text-right text-blue-100 text-sm">
          {drainage}%
        </div>
      </div>

      {/* Elevation */}
      <div className="space-y-2">
        <label className="text-sm text-blue-200">
          Elevation Factor
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={elevation}
          onChange={(e) => setElevation(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />

        <div className="text-right text-blue-100 text-sm">
          {elevation}%
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onAnalyze}
        className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg"
      >
        ANALYZE RISK
      </button>
    </div>
  );
};

export default InputPanel;
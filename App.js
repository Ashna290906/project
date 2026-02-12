import { useState } from "react";
import Header from "./components/Header";
import InputPanel from "./components/InputPanel";
import RiskGauge from "./components/RiskGauge";
import MapView from "./components/MapView";
import ActionCards from "./components/ActionCards";
import "./index.css";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [rainfall, setRainfall] = useState(120);
  const [drainage, setDrainage] = useState(60);
  const [elevation, setElevation] = useState(40);

  // Risk calculation logic (unchanged)
  const riskScore =
    rainfall * 0.5 +
    (100 - drainage) * 0.3 +
    (100 - elevation) * 0.2;

  let riskLevel = "Low";
  if (riskScore >= 180) riskLevel = "High";
  else if (riskScore >= 120) riskLevel = "Moderate";

  // GeoJSON data for Mumbai
  const mumbaiData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Zone 1" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [72.85, 19.05],
              [72.92, 19.05],
              [72.92, 19.12],
              [72.85, 19.12],
              [72.85, 19.05],
            ],
          ],
        },
      },
    ],
  };

  const handleAnalyze = () => {
    console.log("Analyzing risk...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white p-6">
      
      {/* HEADER */}
      <Header />

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        
        {/* LEFT PANEL */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5">
            <InputPanel
              city={city}
              setCity={setCity}
              rainfall={rainfall}
              setRainfall={setRainfall}
              drainage={drainage}
              setDrainage={setDrainage}
              elevation={elevation}
              setElevation={setElevation}
              onAnalyze={handleAnalyze}
            />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5">
            <RiskGauge 
              riskScore={riskScore}
              riskLevel={riskLevel}
            />
          </div>

        </div>

        {/* MAP PANEL */}
        <div className="col-span-12 lg:col-span-9 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4">
          <MapView 
            city={city}
            riskLevel={riskLevel}
            mumbaiData={mumbaiData}
          />
        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="mt-10">
        <ActionCards />
      </div>

    </div>
  );
}

export default App;
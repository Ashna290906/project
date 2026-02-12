import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================================
   Utility Functions
================================ */

const generateZones = () => {
  return [
    { lat: 19.095, lng: 72.900, radius: 5000, risk: 92 },
    { lat: 19.075, lng: 72.880, radius: 4500, risk: 85 },
    { lat: 19.115, lng: 72.920, radius: 4200, risk: 78 },
    { lat: 19.135, lng: 72.850, radius: 5500, risk: 70 },
    { lat: 19.155, lng: 72.830, radius: 6000, risk: 60 },
    { lat: 19.175, lng: 72.810, radius: 6500, risk: 45 },
    { lat: 19.205, lng: 72.780, radius: 7000, risk: 30 },
  ];
};

const calculateDynamicRisk = (baseRisk, rainfall) => {
  const multiplier = 1 + rainfall / 250;
  return Math.min(100, Math.round(baseRisk * multiplier));
};

const getColorAndOpacity = (risk) => {
  if (risk >= 90) return { color: "#8B0000", opacity: 0.7 };
  if (risk >= 75) return { color: "#DC143C", opacity: 0.65 };
  if (risk >= 60) return { color: "#FF7F50", opacity: 0.55 };
  if (risk >= 45) return { color: "#FFD700", opacity: 0.45 };
  return { color: "#4CAF50", opacity: 0.35 };
};

/* ================================
   Flood Heat Layer
================================ */

const FloodRiskHeatmap = ({ rainfall }) => {
  const map = useMap();
  const baseZones = useMemo(() => generateZones(), []);

  const zones = useMemo(() => {
    return baseZones.map(zone => {
      const dynamicRisk = calculateDynamicRisk(zone.risk, rainfall);
      const { color, opacity } = getColorAndOpacity(dynamicRisk);
      return { ...zone, risk: dynamicRisk, color, opacity };
    });
  }, [baseZones, rainfall]);

  useEffect(() => {
    if (!map) return;

    const layer = L.layerGroup();

    zones.forEach(zone => {

      // Outer glow
      const outer = L.circle([zone.lat, zone.lng], {
        radius: zone.radius * 1.8,
        fillColor: zone.color,
        fillOpacity: zone.opacity * 0.15,
        color: zone.color,
        weight: 0,
        className: "smooth-risk-layer"
      });

      // Mid blend
      const mid = L.circle([zone.lat, zone.lng], {
        radius: zone.radius * 1.2,
        fillColor: zone.color,
        fillOpacity: zone.opacity * 0.4,
        color: zone.color,
        weight: 0,
        className: "smooth-risk-layer"
      });

      // Core hotspot
      const core = L.circle([zone.lat, zone.lng], {
        radius: zone.radius * 0.65,
        fillColor: zone.color,
        fillOpacity: zone.opacity * 0.9,
        color: zone.color,
        weight: 0,
      });

      core.bindPopup(`
        <div style="font-family: system-ui; padding:10px;">
          <strong>Flood Risk</strong><br/>
          Risk Score: ${zone.risk}%<br/>
          Radius: ${(zone.radius / 1000).toFixed(1)} km
        </div>
      `);

      layer.addLayer(outer);
      layer.addLayer(mid);
      layer.addLayer(core);
    });

    layer.addTo(map);
    return () => map.removeLayer(layer);

  }, [map, zones]);

  return null;
};

/* ================================
   Main Map View
================================ */

const MapView = ({ city = "Mumbai" }) => {
  const center = [19.076, 72.8777];
  const [rainfall, setRainfall] = useState(0);

  return (
    <div className="relative w-full">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-2xl">
        <h2 className="text-xl font-bold">
          🌊 Flood Risk Map - {city}
        </h2>
      </div>

      {/* Map */}
      <div className="rounded-b-2xl overflow-hidden border border-white/20 shadow-2xl relative">

        <MapContainer
          center={center}
          zoom={11.5}
          style={{ height: "600px", width: "100%" }}
          scrollWheelZoom={true}
        >

          {/* Satellite base */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles © Esri"
          />

          <FloodRiskHeatmap rainfall={rainfall} />

        </MapContainer>

        {/* Rainfall Control */}
        <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-xl w-64">
          <div className="text-sm font-semibold mb-2">
            Rainfall: {rainfall} mm
          </div>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={rainfall}
            onChange={(e) => setRainfall(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Legend */}
        <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-xl">
          <div className="font-bold mb-2">Risk Levels</div>
          <div className="space-y-1 text-sm">
            <div><span style={{color:"#8B0000"}}>■</span> Critical</div>
            <div><span style={{color:"#DC143C"}}>■</span> High</div>
            <div><span style={{color:"#FF7F50"}}>■</span> Moderate</div>
            <div><span style={{color:"#FFD700"}}>■</span> Low</div>
            <div><span style={{color:"#4CAF50"}}>■</span> Safe</div>
          </div>
        </div>

      </div>

      {/* Smooth blur style */}
      <style jsx global>{`
        .smooth-risk-layer {
          filter: blur(14px);
        }
      `}</style>

    </div>
  );
};

export default MapView;
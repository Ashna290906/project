import React from "react";

const Header = () => {
  return (
    <header className="text-center py-6">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">
        URBAN FLOOD RISK VISUALIZER
      </h1>

      <p className="mt-3 text-blue-200 text-lg">
        AI-Assisted Flood Prediction System
      </p>

      <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-blue-300 to-blue-600 rounded-full"></div>
    </header>
  );
};

export default Header;
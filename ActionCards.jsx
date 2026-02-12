import React from 'react';

const ActionCards = () => {
  const cards = [
    {
      icon: "🚨",
      title: "Emergency Alerts",
      description: "Stay Updated",
      weather1: { icon: "🌧️", value: "90%" },
      weather2: { icon: "⛈️", value: "75%" },
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: "🛡️",
      title: "Safety Tips",
      description: "Avoid Flooded Areas",
      weather1: { icon: "🌧️", value: "75%" },
      weather2: { icon: "☁️", value: "60%" },
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🚿",
      title: "Flood Zones",
      description: "Know Safe Zones",
      weather1: { icon: "☁️", value: "60%" },
      weather2: { icon: "🌤️", value: "60%" },
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="action-cards-section">
      <h2 className="section-title">Recommended Actions</h2>
      <div className="action-cards">
        {cards.map((card, index) => (
          <div key={index} className={`action-card glass-card ${card.gradient}`}>
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <div className="card-title-section">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
            <div className="card-weather">
              <div className="weather-item">
                <span className="weather-icon">{card.weather1.icon}</span>
                <span className="weather-value">{card.weather1.value}</span>
              </div>
              <div className="weather-item">
                <span className="weather-icon">{card.weather2.icon}</span>
                <span className="weather-value">{card.weather2.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCards;

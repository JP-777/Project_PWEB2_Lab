import React, { useState } from "react";
import "../styles/accesosDirectos.css"; 

export const AccesosDirectos = ({ icons = [] }) => {
  // Estado para el ítem activo
  const [activeItem, setActiveItem] = useState("Home");

  //elementos del menú
  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📄", label: "Feed" },
    { icon: "➕", label: "Create Post" },
    { icon: "🔍", label: "Search" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📦", label: "Trading Post" },
  ];

  return (
    <div className="menu-options">
      {/* accesos directos */}
      {menuItems.map((item, index) => (
        <div
          className={`menu-item ${activeItem === item.label ? "active" : ""}`}
          key={index}
          onClick={() => setActiveItem(item.label)}
        >
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
        </div>
      ))}

      {/* iconos personalizados */}
      <div className="icon-bar">
        {icons.map((icon, index) => (
          <div className="icon-item" key={index}>
            <span className="icon">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "../styles/perfilInfo.css";

export const PerfilInfo = () => {
  // Estado de la sección activa
  const [activeSection, setActiveSection] = useState("Perfil");

  // Elementos del menú de perfil
  const profileSections = [
    { icon: "👤", label: "Perfil" },
    { icon: "📧", label: "Mensajes" },
    { icon: "🔔", label: "Notificaciones" },
    { icon: "⚙️", label: "Configuraciones" },
    { icon: "🔒", label: "Privacidad" },
  ];

  return (
    <div className="perfil-info">
      <h1 className="perfil-nombre">Denilson Bedoya</h1>
      <div className="perfil-secciones">
        {profileSections.map((section, index) => (
          <div
            className={`seccion-item ${activeSection === section.label ? "activo" : ""}`}
            key={index}
            onClick={() => setActiveSection(section.label)}
          >
            <span className="seccion-icono">{section.icon}</span>
            <span className="seccion-etiqueta">{section.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

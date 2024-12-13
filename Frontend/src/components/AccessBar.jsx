/* eslint-disable react/prop-types */
import "../styles/AccessBar.css"; 
import { useState } from "react";

export const AccessBar = () => {
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

  const userData = {
    profileImage: "https://media.gq.com.mx/photos/61a7f7b82ef9853c053f789c/master/pass/THINK.jpg",
    name: "REACT TY",
    description: "probando una breve descripcionxd",
  };

  const icons = ["🔥", "🎉", "📚", "🛠️", "📝", "💬", "🖖", "A", "B", "C", "D", "E", "F"];


  return (

    <div className="accessBar">
        <div className="user-menu">
            <div className="profile-header">
                <img
                    src={userData.profileImage}
                    alt="User Profile"
                    className="profile-image"
                />
                <div className="profile-details">
                    <h3 className="profile-name">{userData.name}</h3>
                    <p className="profile-subtitle">{userData.description}</p>
                </div>
            </div>

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
        </div>
    </div>
    
  );
};
import React from "react";
import "./App.css";
import { AccesosDirectos } from "./components/accesosDirectos.jsx";
import { FriendBar } from "./components/FriendBar.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { PostingPanel } from "./components/PostingPanel.jsx";

export function App() {
  const userData = {
    profileImage: "https://media.gq.com.mx/photos/61a7f7b82ef9853c053f789c/master/pass/THINK.jpg",
    name: "REACT TY",
    description: "probando una breve descripcionxd",
  };

  const userIcons = ["🔥", "🎉", "📚", "🛠️", "📝", "💬", "🖖", "A", "B", "C", "D", "E", "F"];

  const testPost = [
    { id: 1, userName: "Saul Andre Sivincha Machaca" },
    { id: 2, userName: "Matias Dario Davila Flores" },
    { id: 3, userName: "Jefferson Joao Basurco Cassani" },
  ];

  return (
    <div className="App">
      <NavBar
        selfProfilePhoto={`https://unavatar.io/${userData.name}`}
        selfProfileName={userData.name}
      />
      <div className="principalBody">
        <div className="sidebar">
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
            <AccesosDirectos icons={userIcons} />
          </div>
        </div>
        <PostingPanel content={testPost} />
        <FriendBar />
      </div>
    </div>
  );
}

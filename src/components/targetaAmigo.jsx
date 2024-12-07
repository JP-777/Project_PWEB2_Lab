import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";

//Aplicacion con uso limitado, aun sin base de datos
function Card() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1></h1>
      <div class="app">
        <div className="card">
          <button className="add-friend-button">
            <img
              src="https://scontent.faqp2-3.fna.fbcdn.net/v/t39.30808-6/424928843_1493051167945093_1708641926734425325_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFd5qdGBN8EXlyM3xkTxsiFYDWO47JE7xxgNY7jskTvHApbARttw4vS2SxtmaNpSFV1vWkYtOy5pNogzaTudTxV&_nc_ohc=lAliyCgh2oAQ7kNvgHh0TeT&_nc_zt=23&_nc_ht=scontent.faqp2-3.fna&_nc_gid=ABtBL8AGwroEwU61A6lWRC1&oh=00_AYCAYwwcFjrJF4oLi736PbE8Lxa0zclT6nBaG4tfJOZqaw&oe=6755AC3B" // Usa una URL de imagen
              alt="Add friend icon"
              className="button-icon"
            />
          </button>
          <p className="nameBox">Saul Andre Sivincha Machaca</p>
          <button className="add-friend-button">
            <span className="icon">👤+</span>
            Agregar a amigos
          </button>
        </div>
        <div>
          <div className="card">
            <button className="add-friend-button">
              <img
                src="https://scontent.faqp2-1.fna.fbcdn.net/v/t39.30808-6/464911799_1105642590959130_8367772827919038025_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGpe1kzFZviOQbTrN4rztaEXxHVLvpuWO5fEdUu-m5Y7nXK0wKio7qlmrDZx_gIiDvXtpvNxwE9HIn5xQ6biqwA&_nc_ohc=4nrvuUNAjekQ7kNvgEhGeqO&_nc_zt=23&_nc_ht=scontent.faqp2-1.fna&_nc_gid=Am5xTcz-JsKqsIqp_oy6zAh&oh=00_AYAmAXi8NzjV3lAD4FrxN0eU19fb9ghyiY5E4PjqOMNI-w&oe=67595608" // Usa una URL de imagen
                alt="Add friend icon"
                className="button-icon"
              />
            </button>
            <p className="nameBox">Sebastian Alfredo Riveros Valeriano</p>
            <button className="add-friend-button">
              <span className="icon">👤+</span>
              Agregar a amigos
            </button>
          </div>
        </div>
        <div>
          <div className="card">
            <button className="add-friend-button">
              <img
                src="https://scontent.faqp2-2.fna.fbcdn.net/v/t39.30808-6/320900609_629869685563583_7200874032410821408_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHUZTcg_HJWy5oLFF2T3ngzhZenGsRnhGGFl6caxGeEYaJ2-mDhSyGfM1ADLOeYTpReQTsvAGCATVqrdb4uUImL&_nc_ohc=_K_JTiAkJBMQ7kNvgHZT7RV&_nc_zt=23&_nc_ht=scontent.faqp2-2.fna&_nc_gid=AQGgQhR3gJ4Vqn95rG-z8Js&oh=00_AYDFqiMukliEtq1zllBTuhAaBmcs9hf8Hph4J8z6STg1kQ&oe=67596889" // Usa una URL de imagen
                alt="Add friend icon"
                className="button-icon"
              />
            </button>
            <p className="nameBox">Brayan Denilson Choquehuanca Bedoya</p>
            <button className="add-friend-button">
              <span className="icon">👤+</span>
              Agregar a amigos
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;

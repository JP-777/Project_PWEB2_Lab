/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/Post.css";

export function Post({ userName }) {
    const [memeImageUrl, setMemeImageUrl] = useState("");

    /* ESTA PARTE DEL useEffect ES TEMPORAL, EN RESUMEN
       ES UNA API QUE MUESTRA MEMES RANDOM, SOLO PARA MOSTRAR
       LA FUNCIONALIDAD DEL COMPONENTE
    */
     
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const memes = data.data.memes;
                    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
                    setMemeImageUrl(randomMeme.url);
                } else {
                    console.error("Error al obtener los memes");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud a Imgflip API:", error);
            });
    }, []);

    return (
        <article className="post">
            <div className="profileInfo">
                <img alt="Profile Photo" src={`https://unavatar.io/${userName.split(" ")[0]}`} />
                <span>{userName}</span>
            </div>

            <div className="content">
                <p>Text</p>
                {memeImageUrl ? (
                    <img src={memeImageUrl} alt="Meme from Imgflip" />
                ) : (
                    <p>Loading meme...</p>
                )}
            </div>

            <div className="interactionRegister">
                <span>38 likes</span>
                <span>2 commentaries</span>
                <span>4 shares</span>
            </div>

            <div className="interactionBar">
                <ul>
                    <li><button>Like</button></li>
                    <li><button>Comment</button></li>
                    <li><button>Share</button></li>
                </ul>
            </div>
        </article>
    );
}

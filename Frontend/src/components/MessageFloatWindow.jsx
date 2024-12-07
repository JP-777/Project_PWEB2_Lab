/* eslint-disable react/prop-types */

// AUN TRABAJANDO EN ESTE COMPONENTE, SI CONSIDERAS QUE PUEDES COMPLETARLO SERIA MARAVILLOSO
// EXPLICACION: ESTE COMPONENTE PRETENDE SER UNA VENTANA FLOTANTE PARA ENVIAR MENSAJES, AL ESTILO DE LAS VENTANAS DE FACEBOOK
// NO BORRAR

/*
import { useEffect, useState } from "react";
import { MessagesDevice } from "../devices/MessagesDevice";
import "../styles/MessageFloatWindow.css"

export function MessageFloatWindow({ userFriend, selfUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        MessagesDevice.getMessagesFrom(selfUser, userFriend).then(messages => {
            setMessages(messages.data);
        });
    }, [selfUser, userFriend]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            MessagesDevice.sendMessage(selfUser, userFriend, newMessage).then(() => {
                setMessages([...messages, { content: newMessage, time: new Date().toLocaleTimeString() }]);
                setNewMessage("");
            });
        }
    };

    return (
        <div className="messageFloatWindow">
            <div className="FriendInfo">
                <img alt="Profile Image" src={`https://unavatar.io/${userFriend.split(" ")[0]}/`} />
                <span>{userFriend}</span>
            </div>
            <article>
                {messages.map((message) => (
                    <div className="messageGlobe" key={message.id}>
                        {message.content}
                        <span>{message.time}</span>
                    </div>
                ))}
            </article>
            <div>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}
*/
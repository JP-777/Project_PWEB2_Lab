/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../styles/MessageFloatWindow.css";
import Draggable from "react-draggable";
import MessageDevice from "../devices/MessageDevice";

export function MessageFloatWindow({ friendPhoto, friendName, friendId, closeChat, initialPosition }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const userId = localStorage.getItem("userId"); // ID del usuario actual

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await MessageDevice.getMessagesBetweenUsers(userId, friendId);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [userId, friendId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const message = {
            senderId: userId,
            recipientId: friendId,
            content: newMessage.trim(),
        };

        try {
            const response = await MessageDevice.sendMessage(message);
            setMessages((prev) => [...prev, response.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Draggable handle=".chatHeader" defaultPosition={initialPosition}>
            <div className="chatWindow">
                <div className="chatHeader">
                    <img src={friendPhoto} alt={`${friendName}'s profile`} />
                    <span>{friendName}</span>
                    <button onClick={closeChat} className="closeButton">X</button>
                </div>
                <div className="chatBody">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.senderId === userId ? "messageSent" : "messageReceived"}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="chatFooter">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </Draggable>
    );
}

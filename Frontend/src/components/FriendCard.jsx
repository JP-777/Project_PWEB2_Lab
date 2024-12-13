import { useEffect, useState } from "react";
import "../styles/FriendCard.css";
import UserDevice from "../devices/UserDevice.js";

export function FriendCard() {
    const [friends, setFriends] = useState([]);
    const [requestsSent, setRequestsSent] = useState(new Set()); // Para rastrear las solicitudes enviadas
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await UserDevice.getAllUsers();
                setFriends(response.data);
            } catch (error) {
                console.error("Error fetching friends:", error);
                alert("No se pudo cargar la lista de amigos. Verifica tu autenticación.");
            }
        };

        fetchFriends();
    }, []);

    const handleAddFriend = async (recipientId) => {
        try {
            await UserDevice.sendFriendRequest(userId, recipientId);
            setRequestsSent((prev) => new Set(prev).add(recipientId)); // Agrega el ID al conjunto
            alert(`Solicitud de amistad enviada a ${recipientId}`);
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("No se pudo enviar la solicitud de amistad.");
        }
    };

    return (
        <>
            {friends.map((info) => (
                <div className="card" key={info.id}>
                    <button className="add-friend-button">
                        <img
                            src={`https://unavatar.io/${info.name.split(" ")[0]}/`}
                            alt={`${info.name}'s profile`}
                            className="button-icon"
                        />
                    </button>
                    <p className="nameBox">{info.name}</p>
                    <button
                        className="add-friend-button"
                        onClick={() => handleAddFriend(info.id)}
                        disabled={requestsSent.has(info.id)} // Desactiva el botón si ya se envió la solicitud
                    >
                        {requestsSent.has(info.id) ? "Solicitud enviada" : "👤+ Agregar a amigos"}
                    </button>
                </div>
            ))}
        </>
    );
}

import { FriendBox } from "./FriendBox";
import { MessageFloatWindow } from "./MessageFloatWindow";
import "../styles/FriendBar.css";
import { useEffect, useState } from "react";
import UserDevice from "../devices/UserDevice.js";

export function FriendBar() {
    const [friends, setFriends] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

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

    const openChat = (friend) => {
        setActiveChat(friend);
    };

    const closeChat = () => {
        setActiveChat(null);
    };

    return (
        <div>
            <div className="friendBar">
                {friends.map((info) => (
                    <FriendBox
                        key={info.id}
                        friendPhoto={`https://unavatar.io/${info.name.split(" ")[0]}/`}
                        friendName={`${info.name} ${info.lastName}`}
                        lastTimeActive={{
                            hours: info.hourAgo,
                            minutes: info.minuteAgo,
                        }}
                        onClick={() =>
                            openChat({
                                photo: `https://unavatar.io/${info.name.split(" ")[0]}/`,
                                name: `${info.name} ${info.lastName}`,
                                id: info.id,
                            })
                        }
                    />
                ))}
            </div>

            {activeChat && (
                <MessageFloatWindow
                    friendPhoto={activeChat.photo}
                    friendName={activeChat.name}
                    friendId={activeChat.id}
                    closeChat={closeChat}
                    initialPosition={{ x: 100, y: 100 }}
                />            
            )}
        </div>
    );
}

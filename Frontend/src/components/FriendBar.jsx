import { FriendBox } from "./FriendBox";
import "../styles/FriendBar.css";
import { useEffect, useState } from "react";
import UserDevice from "../devices/UserDevice.js";

export function FriendBar() {
    const [friends, setFriends] = useState([]);

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

    return (
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
                />
            ))}
        </div>
    );
}

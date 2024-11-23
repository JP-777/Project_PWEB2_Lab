/* eslint-disable react/prop-types */
import { FriendBox } from "./FriendBox";
import '../styles/FriendBar.css';

/* Estos imports estan destinados a la conexion
   con la base de datos, por ahora no los usaremos
   NO BORRAR

import { useEffect, useState } from "react";
import UsersDevice from "../devices/UsersDevice";
*/

export function FriendBar () {

    /* Esta parte del codigo esta destinada a mostrar la
       informacion de la base de datos por ahora lo 
       reemplazaremos por lo que explique debajo

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        UsersDevice.getAllUsers().then(response => {
            setFriends(response.data);
        })
    },[])
    */

    /* Esta lista de objetos usersDatabaseTempReplace, 
    la estoy utilizando temporalmente como reemplazo
    de la base de datos, dado que para eso tenemos que
    realizar la conexion mediante SpringBoot con MySQL,
    lo cual haremos en los dias posteriores, al final
    lo borraremos para que el codigo sea mas elegante ;D*/
    const usersDatabaseTempReplace = [
        {
            "id": 1,
            "name": "Saul Andre",
            "lastName": "Sivincha Machaca",
            "hourAgo": 23,
            "minuteAgo": 44
        },
        {
            "id": 2,
            "name": "Jefferson Joao",
            "lastName": "Basurco Cassani",
            "hourAgo": 22,
            "minuteAgo": 6
        },
        {
            "id": 3,
            "name": "Mathias Dario",
            "lastName": "Davila Flores",
            "hourAgo": 23,
            "minuteAgo": 14
        },
        {
            "id": 4,
            "name": "Freddy Jose",
            "lastName": "Aragon Carpio",
            "hourAgo": 0,
            "minuteAgo": 40
        },
        {
            "id": 5,
            "name": "Anderson Lino",
            "lastName": "Arce Valencia",
            "hourAgo": 0,
            "minuteAgo": 52
        },
        {
            "id": 6,
            "name": "Sebastian Alfredo",
            "lastName": "Riveros Valeriano",
            "hourAgo": 1,
            "minuteAgo": 2
        },
        //Saul coloco este ultimo
        {
            "id": 7,
            "name": "Dolly Yadhira",
            "lastName": "Mollo Chuquicaña",
            "hourAgo": 3,
            "minuteAgo": 55
        }
    ]

    return(
        <div className="friendBar">
            {usersDatabaseTempReplace.map( info =>
                <FriendBox 
                    key= {info.id}
                    friendPhoto={`https://unavatar.io/${info.name.split(" ")[0]}/`}
                    friendName={`${info.name} ${info.lastName}`}
                    lastTimeActive={{ hours: info.hourAgo, minutes: info.minuteAgo }}
                />
            )}
        </div>
    )
}
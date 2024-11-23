/* eslint-disable react/prop-types */
import '../styles/FriendBox.css'
import { useEffect, useState } from 'react'

export function FriendBox ({ friendPhoto , friendName, lastTimeActive}) {
    const [activeState, setActiveState] = useState();

    useEffect(() => {
        function isActive(){
            const now = new Date();
            const nowInMinutes = now.getHours() * 60 + now.getMinutes();

            const lastTimeActiveInMinutes = lastTimeActive.hours * 60 + lastTimeActive.minutes;

            const minutesSinceActive = nowInMinutes - lastTimeActiveInMinutes;

            if (minutesSinceActive === 0) {
                setActiveState("Active 🟢");
            } else if (minutesSinceActive < 60) {
                setActiveState(`${minutesSinceActive} minutes ago`);
            } else {
                const hoursSinceActive = Math.floor(minutesSinceActive / 60);
                const remainingMinutes = minutesSinceActive % 60;
                setActiveState(`${hoursSinceActive} hours and ${remainingMinutes} minutes ago`);
            }
        }

        const checkInterval = setInterval(isActive, 60000);
        isActive();

        return () => clearInterval(checkInterval);

    }, [lastTimeActive]);

    return(
        <div className='friendBox'>
            <img src={friendPhoto} alt={`${friendName}'s profile`}/>
            <span>{friendName}</span>
            <strong>{activeState}</strong>
        </div>
    )
}
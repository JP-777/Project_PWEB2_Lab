/* eslint-disable react/prop-types */
import '../styles/FriendBox.css';
import { useEffect, useState } from 'react';

export function FriendBox({ friendPhoto, friendName, lastTimeActive, onClick }) {
    const [activeState, setActiveState] = useState();

    useEffect(() => {
        function isActive() {
            const now = new Date();
            const lastActive = new Date();
            lastActive.setHours(lastTimeActive.hours);
            lastActive.setMinutes(lastTimeActive.minutes);

            const differenceInMs = now - lastActive;

            if (differenceInMs < 0) {
                const yesterdayLastActive = new Date();
                yesterdayLastActive.setDate(now.getDate() - 1);
                yesterdayLastActive.setHours(lastTimeActive.hours);
                yesterdayLastActive.setMinutes(lastTimeActive.minutes);

                const correctedDifferenceInMs = now - yesterdayLastActive;

                const daysSinceActive = Math.floor(correctedDifferenceInMs / (1000 * 60 * 60 * 24));
                if (daysSinceActive === 1) {
                    setActiveState("1 day ago");
                } else {
                    setActiveState(`${daysSinceActive} days ago`);
                }
                return;
            }

            const minutesSinceActive = Math.floor(differenceInMs / (1000 * 60));
            if (minutesSinceActive === 0) {
                setActiveState("Active 🟢");
            } else if (minutesSinceActive < 60) {
                setActiveState(`${minutesSinceActive} minutes ago`);
            } else if (minutesSinceActive < 1440) {
                const hoursSinceActive = Math.floor(minutesSinceActive / 60);
                const remainingMinutes = minutesSinceActive % 60;
                setActiveState(`${hoursSinceActive} hours and ${remainingMinutes} minutes ago`);
            } else {
                const daysSinceActive = Math.floor(minutesSinceActive / 1440);
                setActiveState(`${daysSinceActive} days ago`);
            }
        }

        const checkInterval = setInterval(isActive, 60000);
        isActive();

        return () => clearInterval(checkInterval);
    }, [lastTimeActive]);

    return (
        <div className="friendBox" onClick={onClick}>
            <img src={friendPhoto} alt={`${friendName}'s profile`} />
            <span>{friendName}</span>
            <strong>{activeState}</strong>
        </div>
    );
}

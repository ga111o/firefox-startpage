import React, { useEffect, useState } from "react";

function Title() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const addLeadingZero = (num) => num.toString().padStart(2, "0");

    const formattedTime = `${addLeadingZero(
        currentTime.getHours()
    )}:${addLeadingZero(currentTime.getMinutes())}:${addLeadingZero(
        currentTime.getSeconds()
    )}`;

    const formattedDate = `${currentTime.getFullYear()}.${addLeadingZero(
        currentTime.getMonth() + 1
    )}.${addLeadingZero(currentTime.getDate())}`;

    return (
        <div>
            <h1 id="Title">Welcome!</h1>
            <h1 id="time">{formattedTime}</h1>
            <p id="date">{formattedDate}</p>
        </div>
    );
}

export default Title;

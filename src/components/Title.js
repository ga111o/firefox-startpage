import React, { useEffect, useState } from "react";
import "./Title.css";

function Title() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [name, setName] = useState("");
    const [isInputVisible, setInputVisible] = useState(true);

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const expirationTime = localStorage.getItem("expirationTime");
        const now = new Date();

        if (storedName && expirationTime && new Date(expirationTime) > now) {
            setName(storedName);
            setInputVisible(false);
        }

        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveName(name);
            setInputVisible(false);
        }
    };

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const saveName = (newName) => {
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        localStorage.setItem("name", newName);
        localStorage.setItem("expirationTime", expirationTime);
        setName(newName);
    };

    const handleUsernameClick = () => {
        setInputVisible(true);
    };

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
            <div className="titleContainer">
                {isInputVisible ? (
                    <input
                        id="nameInput"
                        type="text"
                        placeholder="Type Your Name!"
                        value={name}
                        onChange={handleInputChange}
                        onKeyPress={handleEnterKeyPress}
                        autoFocus
                    />
                ) : (
                    <h1 id="Title" onClick={handleUsernameClick}>
                        WELCOME! {name}
                    </h1>
                )}
                <h1 id="time">{formattedTime}</h1>
                <h2 id="date">{formattedDate}</h2>
            </div>
        </div>
    );
}

export default Title;

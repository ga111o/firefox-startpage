import React, { useState, useEffect } from "react";
import "./ShortCut.css";

function ShortCut() {
    const [shortCutLink, setShortCutLink] = useState("");
    const [storedLinks, setStoredLinks] = useState([]);

    const onChange = (event) => {
        setShortCutLink(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (shortCutLink.trim() === "") {
            return null;
        } else {
            let updatedLinks = [...storedLinks, shortCutLink];
            localStorage.setItem("shortCutLinks", JSON.stringify(updatedLinks));
            setStoredLinks(updatedLinks);
            setShortCutLink(""); // Clear the input field after submitting
        }
    };

    useEffect(() => {
        const linksFromStorage = JSON.parse(
            localStorage.getItem("shortCutLinks")
        );
        if (linksFromStorage) {
            setStoredLinks(linksFromStorage);
        }
    }, []);

    const handleLinkClick = (url) => {
        window.location.href = url;
    };

    return (
        <div id="shortCutContainer">
            <form onSubmit={onSubmit}>
                <input
                    placeholder="shortCut // shape like other div box"
                    value={shortCutLink}
                    onChange={onChange}
                />
            </form>
            <div id="shortCutListContainer">
                {storedLinks.map((link, index) => (
                    <div
                        key={index}
                        id="shortCutList"
                        onClick={() => handleLinkClick(link)}
                    >
                        {link}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShortCut;

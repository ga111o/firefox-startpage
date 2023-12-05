import React, { useState, useEffect, useRef } from "react";
import "./ShortCut.css";

function ShortCut() {
    const [shortCutLink, setShortCutLink] = useState("");
    const [storedLinks, setStoredLinks] = useState([]);
    const [linkTitles, setLinkTitles] = useState([]);
    const inputRef = useRef(null);

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
            setShortCutLink("");
        }
    };

    const onDelete = (index) => {
        const updatedLinks = [...storedLinks];
        updatedLinks.splice(index, 1);
        localStorage.setItem("shortCutLinks", JSON.stringify(updatedLinks));
        setStoredLinks(updatedLinks);
    };

    const onEdit = (index, newTitle) => {
        const updatedLinkTitles = [...linkTitles];
        updatedLinkTitles[index] = newTitle;
        setLinkTitles(updatedLinkTitles);
        localStorage.setItem("linkTitles", JSON.stringify(updatedLinkTitles));
    };

    useEffect(() => {
        const linksFromStorage = JSON.parse(
            localStorage.getItem("shortCutLinks")
        );
        if (linksFromStorage) {
            setStoredLinks(linksFromStorage);
        }
    }, [storedLinks]);

    useEffect(() => {
        const linkTitlesFromStorage = JSON.parse(
            localStorage.getItem("linkTitles")
        );
        if (linkTitlesFromStorage) {
            setLinkTitles(linkTitlesFromStorage);
        }
    }, [linkTitles]);

    const handleLinkClick = (event, url) => {
        if (event.target !== inputRef.current) {
            window.open(url, "_blank");
        }
    };

    return (
        <div id="shortCutContainer">
            <div id="shortCutListContainer">
                {storedLinks.map((link, index) => (
                    <div
                        key={index}
                        id="shortCutList"
                        onClick={(event) => handleLinkClick(event, link)}
                    >
                        <input
                            id="editInput"
                            type="text"
                            value={linkTitles[index]}
                            onChange={(e) => onEdit(index, e.target.value)}
                            ref={inputRef}
                        />
                        <button onClick={() => onDelete(index)}>
                            <b>Delete</b>
                        </button>
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                    <input
                        placeholder="New Bookmark!"
                        value={shortCutLink}
                        onChange={onChange}
                        id="shortCutInput"
                    />
                </form>
            </div>
        </div>
    );
}

export default ShortCut;

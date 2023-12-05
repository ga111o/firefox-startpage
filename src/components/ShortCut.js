import React, { useState, useEffect } from "react";
import "./ShortCut.css";

function ShortCut() {
    const [shortCutLink, setShortCutLink] = useState("");
    const [storedLinks, setStoredLinks] = useState([]);
    const [linkTitles, setLinkTitles] = useState([]);

    useEffect(() => {
        const fetchLinkTitles = async () => {
            const updatedLinkTitles = [];
            for (const link of storedLinks) {
                try {
                    const response = await fetch(link);
                    const data = await response.text();
                    const parser = new DOMParser();
                    const htmlDocument = parser.parseFromString(
                        data,
                        "text/html"
                    );
                    const titleElement = htmlDocument.querySelector("title");
                    const title = titleElement ? titleElement.innerText : "";
                    updatedLinkTitles.push(title);
                } catch (error) {
                    console.error(
                        "링크를 가져오는 중 오류가 발생했습니다:",
                        error
                    );
                    const displayedLink = link.split("/")[2]; // 두 번째 슬래시 이후부터 첫 번째 점 사이의 문자열 대신 "github.com" 사용
                    updatedLinkTitles.push(displayedLink); // 오류 발생 시 수정된 링크를 추가
                }
            }
            setLinkTitles(updatedLinkTitles);
        };

        fetchLinkTitles();
    }, [storedLinks]);

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

    useEffect(() => {
        const linksFromStorage = JSON.parse(
            localStorage.getItem("shortCutLinks")
        );
        if (linksFromStorage) {
            setStoredLinks(linksFromStorage);
        }
    }, []);

    const handleLinkClick = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div id="shortCutContainer">
            <div id="shortCutListContainer">
                {storedLinks.map((link, index) => (
                    <div
                        key={index}
                        id="shortCutList"
                        onClick={() => handleLinkClick(link)}
                    >
                        <h2 id="shortCutLink">{linkTitles[index] || link}</h2>

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

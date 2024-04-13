import React from "react";

import Todo from "./Todo";
import Title from "./Title";
import ShortCut from "./ShortCut";

import "./MainPage.css";

function MainPage() {
  return (
    <div>
      <Title />
      <div id="container">
        <ShortCut />
        <Todo />
      </div>
    </div>
  );
}

export default MainPage;

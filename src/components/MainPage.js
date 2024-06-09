import React from "react";

import Todo from "./Todo";
import Title from "./Title";
import ShortCut from "./ShortCut";
import CommitCheck from "./CommitCheck";

import "./MainPage.css";

function MainPage() {
  return (
    <div>
      <Title />
      {/* <CommitCheck /> */}
      <div id="container">
        <ShortCut />
        <Todo />
      </div>
    </div>
  );
}

export default MainPage;

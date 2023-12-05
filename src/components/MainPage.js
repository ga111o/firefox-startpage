import Todo from "./Todo";
import Title from "./Title";

import "./MainPage.css";

function MainPage() {
    return (
        <div>
            <Title />
            <div id="container">
                <h1>test</h1>
                <Todo />
            </div>
        </div>
    );
}

export default MainPage;

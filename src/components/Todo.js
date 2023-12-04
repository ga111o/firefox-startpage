import { useState } from "react";

function Todo() {
    const [todoValue, setTodoValue] = useState("");
    const ifUserTypeTodo = (event) => {
        setTodoValue(event.target.value);
    };

    const [todoList, setTodoList] = useState([]);
    const ifUserSubmitTodo = (event) => {
        event.preventDefault();
        if (todoValue === "") {
            return null;
        } else {
            setTodoList((currentArray) => [todoValue, ...currentArray]);
            setTodoValue("");
            console.log(todoList);
        }
    };

    return (
        <div id="Todo">
            <form onSubmit={ifUserSubmitTodo}>
                <input
                    placeholder="Input Todo!"
                    onChange={ifUserTypeTodo}
                    value={todoValue}
                ></input>
                <button>Add Todo!</button>
            </form>
        </div>
    );
}

export default Todo;

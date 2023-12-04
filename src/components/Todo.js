import React, { useState, useEffect } from "react";

function Todo() {
    const [todoValue, setTodoValue] = useState("");
    const ifUserTypeTodo = (event) => {
        setTodoValue(event.target.value);
    };

    const [todoList, setTodoList] = useState(() => {
        const storedTodoList = window.localStorage.getItem("todoList");
        return storedTodoList ? JSON.parse(storedTodoList) : [];
    });

    useEffect(() => {
        window.localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const ifUserSubmitTodo = (event) => {
        event.preventDefault();
        if (todoValue === "") {
            return null;
        } else {
            setTodoList((currentArray) => [todoValue, ...currentArray]);
            setTodoValue("");
        }
    };

    const DeleteTodo = (index) => {
        setTodoList((currentArray) => [
            ...currentArray.slice(0, index),
            ...currentArray.slice(index + 1),
        ]);
    };

    return (
        <div id="Todo">
            <form onSubmit={ifUserSubmitTodo}>
                <input
                    placeholder="Input Todo!"
                    onChange={ifUserTypeTodo}
                    value={todoValue}
                ></input>
            </form>
            <ul>
                {todoList.map((item, index) => (
                    <li key={index} onClick={() => DeleteTodo(index)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;

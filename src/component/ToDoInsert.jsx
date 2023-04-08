import React, { useState, useRef, useEffect, memo } from 'react';
import styled from 'styled-components';

const ToDoInputtBlock = styled.input`
  width: 70%;
  height: 50px;
  border: 2px solid black;
`;

const ToDoBtn = styled.button`
    cursor: pointer;
    width: 100px;
    height: 50px;
    border: 2px solid black; 
    margin-top: 0px;

`
const ToDoInputbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 550px;
    border-radius: 30px;
`

function ToDoInsert({ todos, setTodos }) {
    const [inputvalue, setInputvalue] = useState('')
    const token = localStorage.getItem("access_token");

    const insertChange = (e) => {
        setInputvalue
            (e.target.value);
    };

    const addTodo = (e) => {
        e.preventDefault();
        console.log("실행")
        if (inputvalue.length > 0) {
            let newTodo = { id: todos[todos.length - 1].id + 1, todo: inputvalue, isCompleted: false, userId: todos[todos.length - 1].id + 1 }
            setInputvalue('')
            return fetch
                ("https://www.pre-onboarding-selection-task.shop/todos", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTodo)
                })
                .then((res) => res.json())
                .then((res) => {
                    setTodos([...todos, res])
                })
        };

    }




    return (
        <div className="insert">
            <form onSubmit={(e) => addTodo(e)}>
                <ToDoInputbox>
                    <ToDoInputtBlock
                        data-testid="new-todo-input"
                        type="text"
                        value={inputvalue}
                        name="insert"
                        id="insert"
                        onChange={insertChange} >
                    </ToDoInputtBlock>
                    <ToDoBtn data-testid="new-todo-add-button" type="submit">추가</ToDoBtn>


                </ToDoInputbox>


            </form>

        </div>
    );
}

export default ToDoInsert
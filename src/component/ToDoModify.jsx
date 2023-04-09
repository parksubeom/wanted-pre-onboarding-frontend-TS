import React, { useState } from 'react';
import styled from 'styled-components';

const ToDoInputtBlock = styled.input`
  width: 70%;
  height: 40px;
  border: 2px solid black;
`;

const ModifyBtn = styled.button`
    font-size: 12px;
    cursor: pointer;
    width: 50px;
    height: 40px;
    border: 2px solid black; 
    margin-top: 0px;
`
const CancelBtn = styled.button`
    font-size: 12px;
    cursor: pointer;
    width: 50px;
    height: 40px;
    border: 2px solid black; 
    margin-top: 0px;
`
const ToDoInputbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 500px;
    height: 30px;
    border-radius: 30px;
`

function ToDoModyfy({ todos,todo, id, isCompleted, setIsModify }) {
    const [inputvalue, setInputvalue] = useState(todo)
    const token = localStorage.getItem("access_token");

    const insertChange = (e) => {
        setInputvalue
            (e.target.value);
    };

    const modifyTodo = (e) => {
        e.preventDefault();
        console.log("실행")
        if (inputvalue.length > 0) {
            setInputvalue('')
            return fetch
                (`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ todo: inputvalue, isCompleted: isCompleted })
                })
                /**스테이트를 업데이트 해주지 않았는데 즉시반영됨 왜지? */
                .then((res) => res.json())
                .then((res) => {
                    setIsModify(false)
                    let copy = [...todos]
                    for (let el of copy) {
                        if (el.id === res.id) {
                            el.todo = res.todo
                        }
                    }
                })
        };
    }

    const cancelTodo = () => {
        setIsModify(false)
    }

    return (
        <div className="insert">
            <form onSubmit={(e) => modifyTodo(e)}>
                <ToDoInputbox>
                    <ToDoInputtBlock
                        data-testid="modify-input"
                        type="text"
                        value={inputvalue}
                        name="insert"
                        id="insert"
                        onChange={insertChange} >
                    </ToDoInputtBlock>
                    <ModifyBtn data-testid="submit-button" type="submit">제출</ModifyBtn>
                    <CancelBtn data-testid="cancel-button" type="submit" onClick={cancelTodo}>취소</CancelBtn>
                </ToDoInputbox>
            </form>
        </div>
    );
}

export default ToDoModyfy
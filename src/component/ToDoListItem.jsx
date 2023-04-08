import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';



const ToDodivBlock = styled.div`
 width: 100%;
`;


const ToDoliBlock = styled.li`
 
 position: relative;
 width: 100%;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: rgba( 160, 200, 160, 0.7 );
  box-shadow: 0 8px 32px 0 rgba( 248, 244, 204, 0.37 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 5px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
 &:hover{  
    background: rgba( 200, 260, 200, 0.8 );
    color : #f4e8ff
  }
  .Btnbox {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ToDoTimeoverBlock = styled.li`
 color: rgba( 200, 200, 200, 0.8 );
 width: 100%;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: rgba( 50, 50, 50, 0.7 );
 box-shadow: 0 0 8px 0 rgba(0, 0, 20, 0.3);
 font-size: 16px;
 border: 2px solid rgba( 50, 50, 50, 0.8 );
 
`;

const ToDoSuccessBlock = styled.li`
 position: relative;
 width: 100%;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: #7ce97c;
  box-shadow: 0 8px 32px 0 rgba( 248, 244, 204, 0.37 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 5px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  .Btnbox {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ToDotodoBlock = styled.span`
text-align: right;
font-size: 20px;
> a{
    text-decoration-line: none;
    color: #19191a;
    &:hover{  
    color : #ffffff

    }
}  
`
const ToDoSuccessspan = styled.span`
test-align: right;
font-size: 18px;
> a{
    todo-decoration-line: none;
    color: #69696c;
}  
`

const ToDodateBlock = styled.p`
text-align: right;
color: #19191a;
font-size: 12px;
margin-right: 10px;
`;

const ToDolateBlock = styled.p`
color: #ff0000;
text-align: right;
margin-right: 10px;
font-size: 12px;
animation: blink 1s infinite;
@keyframes blink {
    50% {
        color: #19191a;
    }
}
`;

const ToDoSuccsessBtn = styled.span`
width: 30px;
cursor: pointer;
font-size:12px;
margin-left:10px;
text-decoration: none;
`;

const ToDoDeleteBtn = styled.span`
width: 30px;
margin-left:10px;
cursor: pointer;
font-size:12px;
`;

const ToDoCheckBox = styled.input`
width: 30px;
height: 15px;
margin-left:10px;
cursor: pointer;
font-size:12px;
`




function ToDoListItem({ list, todos, setTodos }) {

    const { id, todo, isCompleted } = list;
    const googleulr = `https://www.google.com/search?q=${todo}&sxsrf=AJOqlzWmKMltXpsKhW5LXn5NeZhVRSGEUQ%3A1678406201764&source=hp&ei=OXIKZKm-LIP5hwPdlo2oAw&iflsig=AK50M_UAAAAAZAqASUnEuWXCverjO0fsiwQN9qHNa017&ved=0ahUKEwjpvsWrhtD9AhWD_GEKHV1LAzUQ4dUDCAo&uact=5&oq=%EB%A6%AC%EB%8D%95%EC%8A%A4&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoRCC4QgAQQsQMQgwEQxwEQ0QM6CwgAEIAEELEDEIMBOgsILhCABBCxAxDUAjoKCC4QgAQQ1AIQCjoECAAQQzoECC4QQzoKCC4QxwEQ0QMQQzoQCAAQgAQQFBCHAhCxAxCDAToKCAAQgAQQFBCHAjoOCC4QgAQQsQMQgwEQ1AI6CwguEIAEELEDEIMBULICWKoUYOgUaApwAHgCgAF2iAHZCpIBBDEuMTKYAQCgAQGwAQo&sclient=gws-wiz`
    const token = localStorage.getItem("access_token");



    const deleteTodo = () => {
        fetch
            (`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })
        alert("삭제완료")
    }

    const successTodo = () => {
        let copy = [...todos]
        for (let el of copy) {
            if (el.id === id) {
                el.isCompleted = !el.isCompleted
            }
        }
        setTodos(copy)

    }

    return (
        <ToDodivBlock>
            {!isCompleted ? <ToDoliBlock>
                <ToDotodoBlock><a href={googleulr} target="_blank">{todo}</a></ToDotodoBlock>
                <div className="Btnbox">
                    <ToDoCheckBox type="checkbox" onClick={successTodo} />
                    <ToDoDeleteBtn data-testid="delete-button" onClick={deleteTodo}>🗑️</ToDoDeleteBtn>
                    <ToDoSuccsessBtn >✏️</ToDoSuccsessBtn>
                </div>
            </ToDoliBlock> :
                <ToDoSuccessBlock>
                    <ToDoSuccessspan>{todo}</ToDoSuccessspan>
                    <div className="Btnbox">
                        <ToDoCheckBox type="checkbox" onClick={successTodo} />
                        <ToDoSuccsessBtn onClick={deleteTodo}>🗑️</ToDoSuccsessBtn>
                    </div>
                </ToDoSuccessBlock>}
        </ToDodivBlock>
    );
}

export default ToDoListItem
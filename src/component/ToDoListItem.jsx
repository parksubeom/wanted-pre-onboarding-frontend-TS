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
 background: rgba( 248, 244, 204, 0.6 );
  box-shadow: 0 8px 32px 0 rgba( 248, 244, 204, 0.37 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 5px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
 &:hover{  
    background: rgba( 248, 244, 204, 0.8 );
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
 width: 100%;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: rgba( 40, 250, 80, 0.4 );
 box-shadow: 0 0 8px 0 rgba(0, 0, 20, 0.3);
 font-size: 16px;
 border: 3px solid green;
`;

const ToDotodoBlock = styled.span`
todo-align: right;
font-size: 20px;
> a{
    todo-decoration-line: none;
    color: #19191a;
    &:hover{  
    background: rgba( 232, 201, 237, 0.8 );
    color : #ffffff

    }
}  
`
const ToDoSuccessspan = styled.span`
todo-align: right;
font-size: 18px;
> a{
    todo-decoration-line: none;
    color: #69696c;
}  
`

const ToDodateBlock = styled.p`
todo-align: right;
color: #19191a;
font-size: 12px;
margin-right: 10px;
`;

const ToDolateBlock = styled.p`
color: #ff0000;
todo-align: right;
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
todo-decoration: none;
`;

const ToDoDeleteBtn = styled.span`
width: 30px;
margin-left:10px;
cursor: pointer;
font-size:12px;
`;

const ToDoModifyBtn = styled.span`
width: 30px;
margin-left:10px;
cursor: pointer;
font-size:12px;
`;



function ToDoListItem({ list, todos, setTodos, setUpdateModal, updateModal, setTodoId }) {
    const [success, setSuccess] = useState(false)



    // success 상태가 변경 될 때 success값을 로컬스토리지에 저장해준다.
    // 문제 1. 렌더링 될 때마다 초기값인 false가 스토리지로 들어간다.
    // 문제 2. 렌더링이 되면 success의 상태를 로컬스토리지의 값으로 업데이트한다



    const { id, todo, isCompleted } = list;
    const googleulr = `https://www.google.com/search?q=${todo}&sxsrf=AJOqlzWmKMltXpsKhW5LXn5NeZhVRSGEUQ%3A1678406201764&source=hp&ei=OXIKZKm-LIP5hwPdlo2oAw&iflsig=AK50M_UAAAAAZAqASUnEuWXCverjO0fsiwQN9qHNa017&ved=0ahUKEwjpvsWrhtD9AhWD_GEKHV1LAzUQ4dUDCAo&uact=5&oq=%EB%A6%AC%EB%8D%95%EC%8A%A4&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoRCC4QgAQQsQMQgwEQxwEQ0QM6CwgAEIAEELEDEIMBOgsILhCABBCxAxDUAjoKCC4QgAQQ1AIQCjoECAAQQzoECC4QQzoKCC4QxwEQ0QMQQzoQCAAQgAQQFBCHAhCxAxCDAToKCAAQgAQQFBCHAjoOCC4QgAQQsQMQgwEQ1AI6CwguEIAEELEDEIMBULICWKoUYOgUaApwAHgCgAF2iAHZCpIBBDEuMTKYAQCgAQGwAQo&sclient=gws-wiz`

    const now = new Date()
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const today = new Date(year + "-" + (("00" + month.toString()).slice(-2)) + "-" + (("00" + day.toString()).slice(-2)))



    const successTodo = () => {


    }

    const deleteTodo = () => {
        console.log("딜리트")
        let copy = [...todos]
        let copy2 = copy.filter((el) => {
            return el.id !== todo.id
        })
        console.log(copy2)
        setTodos(copy2)
    }
    const modifyTodo = () => {
        setUpdateModal(!updateModal)
        setTodoId(todo)
    }
    return (
        <ToDodivBlock>

            <ToDoliBlock>
                <ToDotodoBlock><a href={googleulr} target="_blank">{todo}</a></ToDotodoBlock>

                <div className="Btnbox">
                    <ToDoSuccsessBtn onClick={successTodo}>✔️</ToDoSuccsessBtn>
                    <ToDoDeleteBtn onClick={deleteTodo}>🗑️</ToDoDeleteBtn>
                    <ToDoModifyBtn onClick={modifyTodo}>✏️</ToDoModifyBtn>
                </div>
            </ToDoliBlock>



        </ToDodivBlock>

    );
}

export default ToDoListItem
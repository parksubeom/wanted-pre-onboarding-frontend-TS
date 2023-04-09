import styled from 'styled-components';
import React, { useState} from 'react';
import ToDoModyfy from './ToDoModify';

const ToDodivBlock = styled.div`
 width: 100%;
`;

const ToDoliBlock = styled.li`
 position: relative;
 width: 100%;
 height: 50px;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: rgba(66, 50, 241,0.5);
  box-shadow: 0 8px 32px 0 rgba( 248, 244, 204, 0.37 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 5px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
 &:hover{  
    background: rgba(66, 50, 241,0.8);
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

const ToDoSuccessBlock = styled.li`
 position: relative;
 width: 100%;
 list-style: none;
 padding: 10px 0;
 margin: 5px 0;
 background: rgba( 50, 50, 50, 0.7 );
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
text-align: right;
font-size: 18px;
> a{
    text-decoration-line: none;
    color: #69696c;
}  
`
const ToDoSuccsessBtn = styled.span`
width: 30px;
cursor: pointer;
font-size:12px;
margin-left:3px;
text-decoration: none;
`;

const ToDoDeleteBtn = styled.span`
width: 30px;
margin-left:3px;
cursor: pointer;
font-size:12px;
`;

const ToDoCheckBox = styled.input`
width: 15px;
height: 15px;
margin-left:10px;
cursor: pointer;
font-size:12px;
`

function ToDoListItem({ list, todos, setTodos}) {
    const [isModify, setIsModify] = useState(false)
    const { id, todo, isCompleted } = list;
    const googleulr = `https://www.google.com/search?q=${todo}&sxsrf=AJOqlzWmKMltXpsKhW5LXn5NeZhVRSGEUQ%3A1678406201764&source=hp&ei=OXIKZKm-LIP5hwPdlo2oAw&iflsig=AK50M_UAAAAAZAqASUnEuWXCverjO0fsiwQN9qHNa017&ved=0ahUKEwjpvsWrhtD9AhWD_GEKHV1LAzUQ4dUDCAo&uact=5&oq=%EB%A6%AC%EB%8D%95%EC%8A%A4&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoRCC4QgAQQsQMQgwEQxwEQ0QM6CwgAEIAEELEDEIMBOgsILhCABBCxAxDUAjoKCC4QgAQQ1AIQCjoECAAQQzoECC4QQzoKCC4QxwEQ0QMQQzoQCAAQgAQQFBCHAhCxAxCDAToKCAAQgAQQFBCHAjoOCC4QgAQQsQMQgwEQ1AI6CwguEIAEELEDEIMBULICWKoUYOgUaApwAHgCgAF2iAHZCpIBBDEuMTKYAQCgAQGwAQo&sclient=gws-wiz`
    const token = localStorage.getItem("access_token");

    /** 투두 삭제 요청 함수 */
    const deleteTodo = () => {
       fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}`}
        })
        .then(() => {
        setTodos(prev => prev.filter((el) => el.id !== id))       
        }) 
    }
    /** 투두의 성공여부를 변경해주는 함수 */
    const successTodo = () => {
        setTodos(prev => prev.map((el) => el.id === id ? ({...el, isCompleted: !el.isCompleted}): el))
    }
    /** 투두 수정창이 나오게 해주는 함수 */
    const modifyTodo = () => {
        setIsModify(!isModify)
    }

    return (
        <ToDodivBlock>
            {!isCompleted ? <ToDoliBlock>
                <ToDotodoBlock>{isModify ? <ToDoModyfy setTodos={setIsModify} todos={todos} todo={todo} id={id} isCompleted={isCompleted} setIsModify={setIsModify} /> : <a href={googleulr} target="_blank">{todo}</a>}</ToDotodoBlock>
                <div className="Btnbox">
                    <ToDoCheckBox type="checkbox" checked={isCompleted} onChange={successTodo} />
                    <ToDoDeleteBtn data-testid="delete-button" onClick={deleteTodo}>🗑️</ToDoDeleteBtn>
                    <ToDoSuccsessBtn data-testid="modify-button" onClick={modifyTodo}>✏️</ToDoSuccsessBtn>
                </div>
            </ToDoliBlock> 
            :
                <ToDoSuccessBlock>
                    <ToDoSuccessspan>{todo}</ToDoSuccessspan>
                    <div className="Btnbox">
                        <ToDoCheckBox type="checkbox" checked={isCompleted} onChange={successTodo} />
                    </div>
                </ToDoSuccessBlock>}
        </ToDodivBlock>
    );
}

export default ToDoListItem
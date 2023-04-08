import React from 'react';
import styled from 'styled-components';
import ToDoList from './ToDoList';


const ToDoMainBlock = styled.div`
  width: 500px;
  min-height: 700px;
  position: relative;
  border-radius: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 2;
  background: rgba( 70, 70, 250, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 248, 244, 204, 0.57 );
  backdrop-filter: blur( 3.5px );
  -webkit-backdrop-filter: blur( 3.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`;

const ToDoHeaderBlock = styled.header`
  width: 500px;
  height: 130px;
  position: relative;
  background: rgba( 200, 260, 200, 0.65 );
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  h1 {
    color: #19191c;
    text-align: left;
    margin-left: 10px;
    margin-top:20px;
  
  }
  h3 {
    color: #4e4e51;
    text-align: left;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  h4 {
    color: #1c1919;
    text-align: left;
    margin-left: 10px;
  }
`;

let today = `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 `;
let week = new Array('일', '월', '화', '수', '목', '금', '토')[new Date().getDay()]

function ToDoMain({ todos, setTodos, modal, setModal, setUpdateModal, updateModal,  setTodoId}) {
  return (
    <ToDoMainBlock>
      <ToDoHeaderBlock>
        <h1>{today}</h1>
        <h3>{week}요일</h3>
        <h4>TO-DO-LIST {todos.length}개</h4>
      </ToDoHeaderBlock>
      <ToDoList todos={todos} setTodos={setTodos} setModal={setModal} modal={modal} setUpdateModal={setUpdateModal} updateModal={updateModal}  setTodoId={ setTodoId} />
    </ToDoMainBlock>
  );
}

export default ToDoMain
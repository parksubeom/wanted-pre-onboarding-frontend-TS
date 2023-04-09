import { React, useState, useEffect } from 'react';
import ToDoMain from '../component/ToDoMain';
import ToDoUpdate from '../component/ToDoUpdate';
import styled from 'styled-components';

const ToDocontainer = styled.div`
  text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-position: center;
    background-size: cover;
    
`


export default function TodoList({ token }) {
  const [updateModal, setUpdateModal] = useState(false)
  const [todos, setTodos] = useState([{
    todo: "선별과제 최선을 다하기",
    userId: 1,
    id: 1,
    isCompleted: false,

  }
  ])
  const getFunction = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setTodos([...todos, ...res])
      })
  }

  useEffect(() => {
    getFunction()
  }, [])





  return (
    <ToDocontainer>
      <ToDoMain todos={todos} setTodos={setTodos} setUpdateModal={setUpdateModal}/>
      {updateModal ? <ToDoUpdate todos={todos} setUpdateModal={setUpdateModal} setTodos={setTodos}  /> : null}


    </ToDocontainer>
  )
}

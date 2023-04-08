import { React, useState, useEffect } from 'react';
import ToDoMain from '../component/ToDoMain';
import ToDoUpdate from '../component/ToDoUpdate';
import './TodoList.css'


export default function TodoList({ token }) {
  const [modal, setModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [todoId, setTodoId] = useState(0)
  const [todos, setTodos] = useState([{
    todo: "선별과제 최선을 다하기",
    userId: 1,
    id: 1,
    isCompleted: false,
  
  }
  ])
  useEffect(() => {
    fetch
      ("https://www.pre-onboarding-selection-task.shop/todos", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
      .then((res) => {
          setTodos([...todos,...res])
      })
  }, [])



  return (
    <div className="ToDo-container">
      <ToDoMain todos={todos} setTodos={setTodos} modal={modal} setModal={setModal} setUpdateModal={setUpdateModal} updateModal={updateModal} setTodoId={setTodoId} />
      {updateModal ? <ToDoUpdate todos={todos} setUpdateModal={setUpdateModal} setTodos={setTodos} todoId={todoId} /> : null}


    </div>
  )
}

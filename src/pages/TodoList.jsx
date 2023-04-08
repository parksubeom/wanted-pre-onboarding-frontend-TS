import { React, useState, useEffect } from 'react';
import ToDoMain from '../component/ToDoMain';
import ToDoInsert from '../component/ToDoInsert';
import ToDoUpdate from '../component/ToDoUpdate';
import './TodoList.css'


export default function TodoList({token}) {
  const [modal, setModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [todoId, setTodoId] = useState(0)
  const [todos, setTodos] = useState([{
    id: 1,
    todo: "과제하기",
    isCompleted: false,
    userId: 1
  },
  {
    id: 2,
    todo: "치카하기",
    isCompleted: false,
    userId: 2
  }])
 console.log(token)
  useEffect(() => { 
    fetch
    ("https://www.pre-onboarding-selection-task.shop/todos", {
     method: "GET",
     headers: {
      "Authorization": `Bearer ${token}`,
     }
   })
     .then((res) => {
     if(res.status === 200){
       setTodos([...todos,res])
     }
     })
  },[])
  

 
  return (
    <div className="ToDo-container">
      <ToDoMain todos={todos} setTodos={setTodos} modal={modal} setModal={setModal} setUpdateModal={setUpdateModal} updateModal={updateModal}  setTodoId={ setTodoId}  />
      {updateModal ? <ToDoUpdate todos={todos} setUpdateModal={setUpdateModal} setTodos={setTodos} todoId={todoId} /> : null}


    </div>
  )
}

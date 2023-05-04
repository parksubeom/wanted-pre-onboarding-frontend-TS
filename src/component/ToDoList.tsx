import React from "react";
import ToDoInsert from "./ToDoInsert";
import ToDoListItem from "./ToDoListItem";
import styled from "styled-components";
import { TodoType } from "../types/Todo";

const ToDoListul = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
interface TodoProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
/**메인에서 받아 온 todos를 맵으로 뿌려주는 컴포넌트 */
function ToDoList({ todos, setTodos }: TodoProps) {
  return (
    <ToDoListul>
      <ToDoInsert todos={todos} setTodos={setTodos} />
      {todos.map((list) => (
        <ToDoListItem
          list={list}
          key={list._id}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ToDoListul>
  );
}

export default ToDoList;

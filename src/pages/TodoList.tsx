import React, { useState, useEffect } from "react";
import ToDoMain from "../component/ToDoMain";
import styled from "styled-components";
import { TodoType } from "../types/Todo";

const ToDocontainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

export default function TodoList({ token }): React.ReactElement {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const getFunction = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTodos([...res]);
      });
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <ToDocontainer>
      <ToDoMain todos={todos} setTodos={setTodos} />
    </ToDocontainer>
  );
}

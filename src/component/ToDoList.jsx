import ToDoInsert from './ToDoInsert';
import ToDoListItem from './ToDoListItem';
import styled from 'styled-components';


const ToDoListul = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
`


function ToDoList ({todos,setTodos,setUpdateModal}) {
    return(
        <ToDoListul>
            <ToDoInsert todos={todos} setTodos={setTodos} />
            {todos.map((list) => (
                <ToDoListItem list={list} key={list.id} todos={todos} setTodos={setTodos} setUpdateModal={setUpdateModal}/>))}
        </ToDoListul>
    );
}

export default ToDoList
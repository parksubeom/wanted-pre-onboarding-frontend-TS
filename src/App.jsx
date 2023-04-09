import './App.css';
import { Routes, Route, Navigate,HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Signup from './pages/Signup';
import React, { useState } from 'react';
import axios from 'axios';

/**모든 요청에 withCredentials이 true로 설정.*/
axios.defaults.withCredentials = true;

const LogoutBtn = styled.button`
  position:  absolute;
  top: 0;
  right: 0;
  margin: 5rem 5rem;
  border: 0px;
  background-color: #0545f7; 
  color: white;
  width: 12rem;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  letter-spacing:5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &hober {
    background-color: #1cf4ed;
  color: rgb(51, 45, 45);
  }
`

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token")) 
  const [userInfo, setUserInfo] = useState(null);

  /**로그아웃 함수(토큰을 스토리지에서 비워준다.)*/
const logout = () => {
  window.localStorage.clear();
  setToken(null)
}



  return (
    <HashRouter>
      <div className='main'>
        {token !== null? <LogoutBtn onClick={logout}>로그아웃</LogoutBtn> : null}
        <Routes>
          {/* localhost:3000 으로 접속한 로그인이 되어있다면(토큰이있다면) /todo로, 토큰이 없다면 /sign 으로 보낸다.  */}
          <Route path='/' element={
              token ? (
                <Navigate to="/todo"/>) 
                : (<Navigate to="/signin"/>) 
            }
          />
           {/* localhost:3000/signin 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signin로 이동한다.  */}
           <Route path="/signin" element ={token? <Navigate to="/todo"/>:<Login setUserInfo={setUserInfo} setToken={setToken}/>}/>
           {/* localhost:3000/signup 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signup로 이동한다.  */}
           <Route path="/signup" element ={token? <Navigate to="/todo"/>:<Signup/>}/>
           {/* localhost:3000/todo 으로 접속한 경우 토큰이 없다면 /signin으로, 있다면 그대로 localhost:3000/todo로 이동한다.  */}
           <Route path="/todo" element ={token === null ?  <Navigate to="/signin"/>:<TodoList userInfo={userInfo} setUserInfo={setUserInfo} token={token} />}/> :

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;


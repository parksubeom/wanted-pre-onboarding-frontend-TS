import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Signup from './pages/Signup';
import React, { useState } from 'react';
import axios from 'axios';



// 모든 요청에 withCredentials가 true로 설정.
axios.defaults.withCredentials = true;

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token")) 
  const [userInfo, setUserInfo] = useState(null);
  //const token = localStorage.getItem("access_token");
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          {/* localhost:3000 으로 접속한 로그인이 되어있다면(토큰이있다면) /todo로, 토큰이 없다면 /sign 으로 보낸다.  */}
          <Route path='/' element={
              token ? (
                <Navigate to="/todo"/>) 
                : (<Navigate to="/signin"/>) 
            }
          />
           {/* localhost:3000/signin 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signin로 이동한다.  */}
           <Route path="/signin" element ={token? <Navigate to="/todo"/>:<Login setUserInfo={setUserInfo} setToken={setToken} />}/>
           {/* localhost:3000/signup 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signup로 이동한다.  */}
           <Route path="/signup" element ={token? <Navigate to="/todo"/>:<Signup/>}/>
           {/* localhost:3000/todo 으로 접속한 경우 토큰이 없다면 /signin으로, 있다면 그대로 localhost:3000/todo로 이동한다.  */}
           <Route path="/todo" element ={!token ?  <Navigate to="/signin"/>:<TodoList userInfo={userInfo} setUserInfo={setUserInfo} token={token} />}/> :

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


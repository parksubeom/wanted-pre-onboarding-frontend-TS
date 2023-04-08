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
  const [isLogin, setIsLogin] = useState(false);
  const [issingup, setSingup] = useState(false);
  const [istodo, setIstodo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("access_token");
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          {/* localhost:3000 으로 접속한 로그인이 되어있다면(토큰이있다면) /todo로, issignup이 false라면(회원가입버튼을 누르지 않은상태) /signin으로 회원가입버튼이 눌린상태  */}
          <Route path='/' element={
              isLogin ? (
                <Navigate to="/todo"/>) 
                : !issingup?(<Navigate to="/signin"/>) 
                : (<Navigate to="/signup"/>)
            }
          />
           {/* localhost:3000/signin 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signin로 이동한다.  */}
           <Route path="/signin" element ={token? <Navigate to="/todo"/>:issingup ? <Navigate to="/signup"/>:<Login setSingup={setSingup} setUserInfo={setUserInfo} setIstodo={setIstodo} />}/>
           {/* localhost:3000/signup 으로 접속한 경우 토큰이 있다면 /todo로, 없다면 그대로 localhost:3000/signup로 이동한다.  */}
           <Route path="/signup" element ={token? <Navigate to="/todo"/>:isLogin ? <Navigate to="/signin"/> :<Signup setSingup={setSingup} setIsLogin={setIsLogin} />}/>
           {/* localhost:3000/todo 으로 접속한 경우 토큰이 없다면 /signin으로, 있다면 그대로 localhost:3000/todo로 이동한다.  */}
           <Route path="/todo" element ={!token ?  <Navigate to="/signin"/>:<TodoList userInfo={userInfo}  setUserInfo={setUserInfo} token={token} />}/> :

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

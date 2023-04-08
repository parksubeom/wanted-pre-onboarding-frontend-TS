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
          <Route
            path='/'
            element={
              isLogin ? (
                <Navigate to="/todo"/>) 
                : !issingup?(<Navigate to="/signin"/>) 
                : (<Navigate to="/signup"/>)
            }
          />
           <Route path="/signin" element ={token? <Navigate to="/todo"/>:issingup ? <Navigate to="/signup"/>:<Login setSingup={setSingup} setUserInfo={setUserInfo} setIstodo={setIstodo} />}/>
           <Route path="/signup" element ={token? <Navigate to="/todo"/>:isLogin ? <Navigate to="/signin"/> :<Signup setSingup={setSingup} setIsLogin={setIsLogin} />}/>
           <Route path="/todo" element ={!token ?  <Navigate to="/signin"/>:<TodoList userInfo={userInfo}  setUserInfo={setUserInfo} token={token} />}/> :

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

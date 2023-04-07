import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Signup from './pages/Signup';


// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [issingup, setSingup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          <Route
            path='/'
            element={
              isLogin ? (
                <TodoList userInfo={userInfo} setIsLogin={setIsLogin} setUserInfo={setUserInfo} />) 
                : !issingup?(<Login setSingup={setSingup} setUserInfo={setUserInfo} setIsLogin={setIsLogin} />) : (<Signup  setSingup={setSingup}/>)
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

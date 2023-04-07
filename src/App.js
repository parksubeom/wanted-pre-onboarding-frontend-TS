import './App.css';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Signup from './pages/Signup';
import React, { useState } from 'react';
import axios from 'axios';



// 모든 요청에 withCredentials가 true로 설정.
axios.defaults.withCredentials = true;

function App() {
  const [issingup, setSingup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          <Route
            path='/'
            element={
              token ? (
                <TodoList userInfo={userInfo} setUserInfo={setUserInfo} />) 
                : !issingup?(<Login setSingup={setSingup} setUserInfo={setUserInfo}  />) 
                : (<Signup  setSingup={setSingup}/>)
            }
          />
           <Route path="/signin" element ={token? <TodoList userInfo={userInfo}  setUserInfo={setUserInfo} /> : <Login setSingup={setSingup} setUserInfo={setUserInfo}  />}/>
           <Route path="/signup" element ={token? <TodoList userInfo={userInfo}  setUserInfo={setUserInfo} /> :<Signup  setSingup={setSingup}/>}/>
           <Route path="/todo" element ={!token ? <Login setSingup={setSingup} setUserInfo={setUserInfo}  /> : <TodoList userInfo={userInfo}  setUserInfo={setUserInfo} />}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

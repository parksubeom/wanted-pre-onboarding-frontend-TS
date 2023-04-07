import React, { useState } from 'react';
import axios from 'axios';

export default function Signup({setSingup}) {
  const [loginInfo, setLoginInfo] = useState({
    password: '',
    email: '',
  
  });
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  
  const signupHandler = () => {
    if (!loginInfo.password || !loginInfo.email) {
     return alert("정보를 모두 입력해주십쇼.")
    } else {
      setSingup(false)
      return axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signup", {
        data: {
          email:loginInfo.email,
          password:loginInfo.password
        }
       },{
        headers : {
          'Content-Type': 'application/json'
        }
       }, {

      })
      .then((res) => {
        alert("회원가입에 성공하셨습니다.")
      })
    }
    }
    
  return (
    <div className='container'>
      <div className='left-box'>
      <span>
          FRONTEND
          <p>INTERNSHIP</p>
          SIGN UP
        </span>
      </div>
      <div className='right-box'>
      <h1>WANTED SIGN UP</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>
          <span>E-mail</span>
          <input
              type='email'
              data-testid='email-input'
              onChange={handleInputValue('email')}
            />
            <span>Password</span>
            <input
              type='password'
              data-testid='password-input'
              onChange={handleInputValue('password')}
            />
            
        
          </div>
          <button type='submit'onClick={signupHandler} >
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}
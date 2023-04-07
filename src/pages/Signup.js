import React, { useState } from 'react';
import axios from 'axios';

export default function Signup({setIsLogin, setSingup}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    password: '',
    email: '',
  
  });
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  
  const signupHandler = () => {
    if (loginInfo.password.length < 8 || !loginInfo.email.includes("@")) {
      setErrorMessage('비밀번호는 8자리 이상, 이메일은 @ 를 포함시켜주시길 바랍니다.');
    } else {
      setSingup(false)
      setIsLogin(true)
      return fetch
     ("https://www.pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo)
    })
      .then((res) => {
      if(res.status === 201){
        alert("회원가입에 성공하셨습니다.")
      }else{
        alert("회원가입에 실패하셨습니다..")
      }
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
            {errorMessage ? (
            <div id='alert-message' data-testid='alert-message'>
              {errorMessage}
            </div>
          ) : (
            ''
          )}
            
        
          </div>
          <button type='submit'onClick={signupHandler} disabled="">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}
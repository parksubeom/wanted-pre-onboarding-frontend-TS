import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setUserInfo, setIsLogin,setSingup }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const loginRequestHandler = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
      return;
    } else {
      setErrorMessage('');
    }
    return axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signin", { loginInfo, checkedKeepLogin })
      .then((res) => {
        console.log(res.data)
        setUserInfo(res.data)
        setIsLogin(true)
        setErrorMessage("")
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMessage("로그인에 실패했습니다.")
        }

      });
  };

  const signupBtnHandler = () => {
    setSingup(true)
  }


  return (
    <div className='container'>
      <div className='left-box'>
        <span>
          FRONTEND
          <p>INTERNSHIP</p>
          LOGIN
        </span>
      </div>
      <div className='right-box'>
        <h1>WANTED AUTH</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>
            <span>e-mail</span>
            <input type='text' 
            data-testid='email-input' 
            onChange={handleInputValue('email')} />
            <span>Password</span>
            <input
              type='password'
              data-testid='password-input'
              onChange={handleInputValue('password')}
            />
            <label className='checkbox-container'>
              <input type='checkbox' onChange={() => setCheckedKeepLogin(!checkedKeepLogin)} />
              {' 로그인 상태 유지하기'}
            </label>
          </div>
          <button type='submit' data-testid="signin-button" onClick={loginRequestHandler}>
            LOGIN
          </button>
          <button type='button' data-testid="signup-button" onClick={signupBtnHandler} >
            SIGNUP
          </button>
          {errorMessage ? (
            <div id='alert-message' data-testid='alert-message'>
              {errorMessage}
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}

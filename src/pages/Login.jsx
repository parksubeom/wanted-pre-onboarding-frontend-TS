import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setIstodo, setSingup }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**입력값 상태값으로 저장하는 함수 */
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  /**로그인 요청 함수 */
  const loginRequestHandler = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
      return;
    } else {
      setErrorMessage('');
    }
    return fetch
      ("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo)
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token !== undefined) {
        window.localStorage.setItem('access_token', res.access_token)
        setErrorMessage("")
        setIstodo(true)
        }else if(res.statusCode === 404){
          setErrorMessage("로그인에 실패했습니다.")
        }
        /**일단 가이드라인 따라가자 */
        /*if(checkedKeepLogin){
          window.localStorage.setItem('access_token', res.access_token)
        }*/
      })
    
  };
  /**회원가입 이동 함수 */
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
        <img src='https://live.staticflickr.com/65535/52249182884_80a9c34075_o.png'></img>
        <h2>AUTH</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>
            <span>E-mail</span>
            <input type='text'
              data-testid='email-input'
              onChange={handleInputValue('email')} />
            <span>Password</span>
            <input
              type='password'
              data-testid='password-input'
              onChange={handleInputValue('password')}
            />
            {/**일단 가이드라인을 준수하기위해 로직은 넣지않았습니다.*/}
            <label className='checkbox-container'>
              <input type='checkbox' onChange={() => setCheckedKeepLogin(!checkedKeepLogin)} />
              {' 로그인 상태 유지하기'}
            </label>
          </div>
          {errorMessage ? (
            <div id='alert-message' data-testid='alert-message'>
              {errorMessage}
            </div>
          ) : (
            ''
          )}
          <button type='submit' data-testid="signin-button" onClick={loginRequestHandler}>
            LOGIN
          </button>
          <button type='button' data-testid="signup-button" onClick={signupBtnHandler} >
            SIGNUP
          </button>
         
        </form>
      </div>
    </div>
  );
}

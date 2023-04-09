import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken}) {

  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({userId: '',password: '',});
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
     fetch
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
        setToken(localStorage.getItem("access_token"))
        } else if(res.statusCode === 404){
          setErrorMessage("로그인에 실패했습니다.")
        }
      })
  };
  /**회원가입 이동 함수 */
  const signupBtnHandler = () => {
    navigate('/signup')
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
        <form onSubmit={loginRequestHandler}>
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
          <button type='submit' data-testid="signin-button">
            LOGIN
          </button>     
        </form>
        <button className='signupBtn' type='button' data-testid="signup-button" onClick={signupBtnHandler} >
            SIGNUP
          </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**유효성검사 통과 못할 시 버튼 비활성화 */
const Disablebtn = styled.button`
  border: 0px;
  background-color: #aaa9ac; 
  color: white;
  width: 12rem;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  margin-top: 1rem;
  font-size: 1rem;
  letter-spacing:5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:hover{  
    background-color : #aaa9ac;
    color : white
  }
`

export default function Signup() {
  const navigate = useNavigate()
  /**이메일, 패스워드 확인 */
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  /**이메일, 패스워드 에러메시지 */
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  /**입력값 저장*/
  const [loginInfo, setLoginInfo] = useState({
    password: '',
    email: '',

  });
  /**이메일 유효성검사 함수 */
  const handleEmailValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    if (!e.target.value.includes("@") && e.target.value.length > 0) {
      setEmailMessage('이메일 형식에는 @를 포함해주세요.')
      setIsEmail(false)
    }else if(e.target.value.length === 0){
      setEmailMessage('')
    }
    if (e.target.value.includes("@")) {
      setEmailMessage('')
      setIsEmail(true)
    }
  };
  /**패스워드 유효성검사 함수 */
  const handlePasswordValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    if (e.target.value.length < 8 && e.target.value.length > 0) {
      setPasswordMessage('비밀번호는 8자리 이상 입력해주세요.')
      setIsPassword(false)
    }else if(e.target.value.length === 0){
      setPasswordMessage('')
    }
    if (e.target.value.length >= 8) {
      setPasswordMessage('')
      setIsPassword(true)
    }
  };

  const signupHandler = () => {
    /*위에서 유효성 검사를 거치고 넘어오겠지만, 회원가입은 방어적으로 로직을 짜는게 좋다. */
    if (isPassword && isEmail) {
      return fetch
        ("https://www.pre-onboarding-selection-task.shop/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo)
        })
        .then((res) => {
          if (res.status === 201) {
            alert("회원가입에 성공하셨습니다.")
            navigate('/signin')
          } else {
            alert("동일한 이메일이 이미 존재합니다.")
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
        <img src='https://live.staticflickr.com/65535/52249182884_80a9c34075_o.png'></img>
        <h2>SIGN UP</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='input-field'>


            {/* 이메일 인풋창 */}
            <span>E-mail</span>
            <input
              type='email'
              data-testid='email-input'
              onChange={handleEmailValue('email')}
            />
            {emailMessage ? (
              <div id='alert-message' data-testid='alert-message'>
                {emailMessage}
              </div>) : ('')}
            {/* 패스워드 인풋창 */}
            <span>Password</span>
            <input
              type='password'
              data-testid='password-input'
              onChange={handlePasswordValue('password')}
            />
            {passwordMessage ? (
              <div id='alert-message' data-testid='alert-message'>
                {passwordMessage}
              </div>) : ('')}
          </div>
          {/*이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여*/}    
          {!isEmail || !isPassword ?
            <Disablebtn disabled={!(isEmail && isPassword)}>가입하기</Disablebtn>
            :
            <button 
            data-testid="signup-button"
            type='submit' 
            onClick={signupHandler}>
              가입하기
            </button>}

        </form>
      </div>
    </div>
  );
}
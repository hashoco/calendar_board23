import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {LoginDiv,BackgroundDiv} from '../../Style/UserCSS'
import firebase from '../../firebase.js'
function Login() {
  const [Email, setEmail] = useState('')
  const [PW, setPW] = useState('')
  const [ErrorMsg, setErrorMsg] = useState('')
  let navigate = useNavigate()

  const SingInFunc = async (e) => {
    e.preventDefault()
    if (!(Email && PW)) {
      return alert('모든 값을 입력해주세요.')
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW)
      navigate('/')
    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/invalid-login-credentials') {
        setErrorMsg('이메일 또는 비밀번호를 확인해주세요.')
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('유효하지 않는 이메일 주소입니다.')
      } else {
        setErrorMsg('로그인에 실패하였습니다.')
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('')
    }, 5000)
  }, [ErrorMsg])

  return (
    <BackgroundDiv>
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input
          type="email"
          required
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          required
          value={PW}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        {ErrorMsg !== '' && <p>{ErrorMsg}</p>}
        <button
          onClick={(e) => {
            SingInFunc(e)
          }}
        >
          로그인
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            navigate('/register')
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
    </BackgroundDiv>
  )
}

export default Login

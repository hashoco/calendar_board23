import React, { useState } from 'react'
import { LoginDiv, BackgroundDiv } from '../../Style/UserCSS'
import firebase from '../../firebase.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [PW, setPW] = useState('')
  const [PWconfirm, setPWconfirm] = useState('')
  const [Flag, setFlag] = useState(false)
  const [NameCheck, setNameCheck] = useState(false)
  const [NameInfo, setNameInfo] = useState('')

  let navigate = useNavigate()
  //async await를 하는 이유는 인증하는동안 기다려야하기에 세팅
  const RegisterFunc = async (e) => {
    setFlag(true)
    e.preventDefault()
    if (!(Name && Email && PW && PWconfirm)) {
      return alert('모든 값을 입력해주세요.')
    }
    if (PW !== PWconfirm) {
      return alert('비밀번호를 확인해주세요.')
    }
    if (!NameCheck) {
      return alert('이름 중복검사를 진행해 주세요.')
    }
    if (PW.length < 8) {
      return alert('비밀번호는 8자리 이상 입력해주세요.')
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW)
    //기본적으로 이메일/패스워드만 세팅을 했는데 추가로 firebase에서 사용자명도 보여주기 위함.
    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL:
        'https://kr.object.ncloudstorage.com/react-board/post/defaultImage.png',
    })

    //console.log(createdUser.user); //회원가입시 auth데이터 확인을 위함
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        'https://kr.object.ncloudstorage.com/react-board/post/defaultImage.png',
      hpNo: '',
      birthDt: '',
      rmrk: '',
    }
    axios.post('/api/user/register', body).then((response) => {
      setFlag(false)
      if (response.data.success) {
        navigate('/login')
      } else {
        return alert('회원가입이 실패하였습니다.')
      }
    })
  }

  const NameCheckFunc = (e) => {
    e.preventDefault()
    if (!Name) {
      return alert('이름을 입력해주세요.')
    }
    var pattern = /\s/g
    if (Name.match(pattern)) {
      return alert('공백을 제거해주세요.')
    }

    let body = {
      displayName: Name,
    }

    if (NameCheck) {
      setNameCheck(false)
      setNameInfo('')
      return
    }

    axios.post('/api/user/namecheck', body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true)
          setNameInfo('사용 가능한 이름입니다.')
        } else {
          setNameInfo('사용 불가능한 이름입니다.')
        }
      }
    })
  }
  return (
    <BackgroundDiv>
      <LoginDiv>
        <form>
          <label>이름</label>
          <input
            type="name"
            value={Name}
            onChange={(e) => {
              setName(e.currentTarget.value)
            }}
            disabled={NameCheck}
            
          />
          <div style={{color:"#cbcbcb"}}>{NameInfo} </div>
          <button onClick={(e) => NameCheckFunc(e)}>
            {NameCheck ? '변경' : '중복검사'}
          </button>
          <label>이메일</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.currentTarget.value)
            }}
          />
          <label>비밀번호</label>
          <input
            type="password"
            value={PW}
            onChange={(e) => {
              setPW(e.currentTarget.value)
            }}
          />
          <label>비밀번호확인</label>
          <input
            type="password"
            value={PWconfirm}
            onChange={(e) => {
              setPWconfirm(e.currentTarget.value)
            }}
          />
          <button
            disabled={Flag}
            onClick={(e) => {
              RegisterFunc(e)
            }}
          >
            회원가입
          </button>
        </form>
      </LoginDiv>
    </BackgroundDiv>
  )
}

export default Register

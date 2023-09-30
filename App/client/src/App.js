import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
//redux import
import {  useDispatch } from 'react-redux'
import { loginUser, clearUser } from './Reducer/userSlice.js'
import firebase from './firebase.js'
//redux import
import Heading from './Component/Heading'
import MainPage from './Component/MainPage.js'
import Upload from './Component/Post/Upload'
import Detail from './Component/Post/Detail'
import Edit from './Component/Post/Edit'
import MyPage from './Component/User/MyPage.js'
import Login from './Component/User/Login'
import Register from './Component/User/Register'

import Home from './Component/Home.js'
import NotFound from './Component/NotFound.js'

import Calendar from './Component/Calendar/Calendar.js'
function App() {
  const dispatch = useDispatch()
  //const user = useSelector((state) => state.user)
  useEffect(() => {
    //사용자가 로그인,로그아웃 상태를 알려줌.
    firebase.auth().onAuthStateChanged((userInfo) => {
      //console.log(userInfo)
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user))
      }else{
        dispatch(clearUser())
      }
    })

    return () => {}
  }, [])
  
  return (
    <>
      <Heading />
      <Routes>
       {/*post*/ }
       <Route path="/" element={<Home />}></Route>
        <Route path="/mainPage" element={<MainPage />}></Route>
        <Route path="/Upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
       {/*User*/ }
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        {/*calendar*/ }
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </>
  )
}

export default App

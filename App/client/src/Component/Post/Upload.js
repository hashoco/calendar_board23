import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  UploadButtonDiv,
  UploadDiv,
  UploadForm,
} from '../../Style/UploadCSS.js'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function Upload(props) {
  const [Title, setTitle] = useState('')
  const [Content, setContent] = useState('')
  // eslint-disable-next-line
  const [Image, setImage] = useState('')

  let navigate = useNavigate()
  const user = useSelector((state) => state.user)
  //<ImageUpload setImage={setImage} 이미지 기능구현완료, 사용은안함
  const handleQuillChange = (value) => {
    setContent(value) // 상태를 업데이트합니다.
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!user.accessToken) {
      alert('로그인한 회원만 글을 작성할 수 있습니다.')
      navigate('/login')
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    if (Title === '' || Content === '') {
      return alert('모든 항목을 채워주세요.')
    }
    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    }
    axios
      .post('/api/post/submit', body)
      .then((respose) => {
        if (respose.data.success) {
          alert('글 작성이 완료되었습니다.')
          navigate('/mainpage')
        } else {
          alert('글 작성에 실패하였습니다.')
        }
      })
      .catch((err) => {
        console.log('err=>' + err)
      })
  }

  const onCancle = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <UploadDiv>
      <UploadForm>
        <label>title</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
        />

        <label>content</label>

        <ReactQuill
         
         value={Content}
          onChange={handleQuillChange}

        />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e)
            }}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              onCancle(e)
            }}
          >
            Cancle
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  )
}

export default Upload

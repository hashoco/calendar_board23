import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  UploadButtonDiv,
  UploadDiv,
  UploadForm,
} from '../../Style/UploadCSS.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function edit() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  // eslint-disable-next-line
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState(''); // Provide an initial value

  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post('/api/post/detail', body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content || ''); // Set initial value or an empty string
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (Title === '' || Content === '') {
      return alert('모든 항목을 채워주세요.');
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
    };

    axios
      .post('/api/post/edit', body)
      .then((response) => {
        if (response.data.success) {
          alert('글 수정이 완료되었습니다.');
          navigate(`/Post/${params.postNum}`);
        } else {
          alert('글 수정에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log('err=>' + err);
      });
  };

  const handleQuillChange = (value) => {
    setContent(value); // Update the state
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label>title</label>
        <input
          id="title"
          type="text"
          value={Title || ''}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <label>content</label>

        <ReactQuill value={Content || ''} onChange={handleQuillChange} />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Save
          </button>
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancle
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default edit;

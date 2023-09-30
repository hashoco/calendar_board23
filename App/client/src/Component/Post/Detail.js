import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { PostDiv, SpinnerDiv, Post, BtnDiv } from '../../Style/PostDetailCSS';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);
  
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

  const DeleteHandler = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .post('/api/post/delete', body)
        .then((response) => {
          if (response.data.success) {
            alert('삭제되었습니다.');
            navigate('/mainpage');
          }
        })
        .catch((err) => {
          alert('실패하였습니다.');
        });
    }
  };

  return (
    <div style={{ backgroundColor: '#272829', height: '100vh' }}>
      <PostDiv>
        {Flag ? (
          <>
            <Post>
              <p style={{ fontSize: '2.0rem', marginBottom: '10px' }}>
                {PostInfo.title}
              </p>
              <div
                className="author"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Avatar
                  size="30"
                  round={true}
                  src={PostInfo.author.photoURL}
                  style={{ border: '1px solid #c6c6c6' }}
                />
                <p
                  style={{
                    fontSize: '1.2rem',
                    marginLeft: '10px',
                  }}
                >
                  {PostInfo.author.displayName}
                </p>
              </div>
              {PostInfo.image ? (
                <img
                  src={PostInfo.image}
                  alt=""
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : null}
              {/* Display content generated with ReactQuill */}
              <div
                style={{ fontSize: '1.3rem', marginTop: '10px' }}
                dangerouslySetInnerHTML={{ __html: PostInfo.content }}
              />
            </Post>
            {user.uid === PostInfo.author.uid && (
              <BtnDiv>
                <Link to={`/edit/${PostInfo.postNum}`}>
                  <button className="edit">Modify</button>
                </Link>
                <Link>
                  <button className="delete" onClick={() => DeleteHandler()}>
                    Delete
                  </button>
                </Link>
              </BtnDiv>
            )}
          </>
        ) : (
          <SpinnerDiv>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </SpinnerDiv>
        )}
      </PostDiv>
    </div>
  );
}

export default Detail;

import React, { useState, useEffect } from 'react'
import List from './Post/List.js'
import axios from 'axios'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { GNBDiv, FooterDiv } from '../Style/MainPageCSS.js'
import Spinner from 'react-bootstrap/Spinner'

import { SpinnerDiv } from '../Style/PostDetailCSS'
function MainPage() {
  const [PostList, setPostList] = useState([])
  const [Sort, setSort] = useState('Registration')
  const [SearchTerm, setSearchTerm] = useState('')
  const [Skip, setSkip] = useState(0)
  const [LoadMore, setLoadMore] = useState(true)
  const [Flag, setFlag] = useState(false)
  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    }
    axios
      .post('/api/post/list', body)
      .then((response) => {
        if (response.data.success) {
          setFlag(true)
          setPostList([...PostList, ...response.data.postList])
          setSkip(Skip + response.data.postList.length)
          //개수를 5개로 limit로 세팅하였음.
          if (response.data.postList.length < 5) {
            setLoadMore(false)
          }
          
          console.log(Flag);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getPostList = () => {
    setSkip(0)

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    }

    axios
      .post('/api/post/list', body)
      .then((response) => {
        if (response.data.success) {
          setFlag(true)
          setPostList([...response.data.postList])
          setSkip(response.data.postList.length)
          if (response.data.postList.length < 5) {
            setLoadMore(false)
          }
          if (response.data.postList.length === 0) {
            setLoadMore(false)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getPostList()
  }, [Sort])

  const SearchHandler = () => {
    getPostList()
  }

  return (
    <div style={{ backgroundColor: '#272829' }}>
      <GNBDiv>
        <div className="search">
          <input
            style={{ backgroundColor: '#383c3c', color: '#cbcbcb' }}
            type="text"
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchHandler()
            }}
          />
         <button
  onClick={() => SearchHandler()}
  style={{
    backgroundColor: '#cbcbcb',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // 가로 정렬을 위해 추가
    color: 'black', // 모바일 화면에서 텍스트 색상 변경
  }}
>
  <i
    className="bi bi-search"
    style={{ fontSize: '1.2rem', marginRight: '5px'}}
  ></i>
  Search
</button>

        </div>

        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item
            onClick={() => setSort('Registration')}
            style={{
              borderTop: 'none', // 상단 테두리 제거
              borderRight: 'none', // 우측 테두리 제거
              borderLeft: 'none', // 좌측 테두리 제거
              borderBottom: '1px solid #ccc', // 아래쪽 테두리 설정
              width: '80%', // 테두리 너비를 80%로 설정
            }}
          >
            Registration
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort('Modification')}>
            Modification
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      {Flag ? (
        <List PostList={PostList} />
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
      {LoadMore && (
        <FooterDiv>
          <button
            style={{ marginBottom: '10vh' }}
            onClick={() => getLoadMore()}
          >
            더보기
          </button>
        </FooterDiv>
      )}
    </div>
  )
}

export default MainPage

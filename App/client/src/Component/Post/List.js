import React from 'react';
import { Link } from 'react-router-dom';
import { ListDiv, ListItem } from '../../Style/ListCSS.js';
import Avatar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko';

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format('YYYY년 MMMM Do, HH:mm') + '(수정됨)';
    } else {
      return moment(a).format('YYYY년 MMMM Do, HH:mm');
    }
  }

  const renderListItems = () => {
    return props.PostList.map((post, idx) => (
      <ListItem key={idx}>
        <Link to={`/post/${post.postNum}`}>
          <div className="title">
            <p style={{ fontSize: '2.0rem' }}>{post.title}</p>
          </div>
          <div className="author" style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              size="40"
              round={true}
              src={post.author.photoURL}
              style={{ border: '1px solid #c6c6c6' }}
            />
            <p style={{ fontSize: '1.2rem', marginLeft: '10px', marginTop: '10px' }}>
              {post.author.displayName}
            </p>
          </div>
          <div className="content">
            {/* ReactQuill로 작성된 데이터를 보여줍니다. */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="time">
            <p style={{ fontSize: '0.9rem' }}>
              {SetTime(post.createdAt, post.updatedAt)}
            </p>
          </div>
        </Link>
      </ListItem>
    ));
  }

  return <ListDiv>{renderListItems()}</ListDiv>;
}

export default List;

import React from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
function ImageUpload(props) {
  /*
    'image/*' 이미지만 올릴수 있도록 처리
    */
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file",(e.target.files[0]));
    axios.post("/api/post/image/upload",formData).then((response)=>{
        console.log(response.data);
        props.setImage(response.data.filepath);
    });
  }
  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => {
          FileUpload(e)
        }}
      />
    </div>
  )
}

export default ImageUpload

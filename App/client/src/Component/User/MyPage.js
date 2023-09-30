import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'
import axios from 'axios'
import firebase from '../../firebase.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MyPageDiv, InputDiv } from '../../Style/MyPageCSS.js'
import moment from 'moment'
function MyPage() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [CurrentImage, setCurrentImage] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [Birthdate, setBirthdate] = useState('')
  const [Notes, setNotes] = useState('')

  useEffect(() => {
    let body = {
      uid: user.uid,
    }
    axios
      .post('/api/user/profile/list', body)
      .then((response) => {
        //console.log(response.data)
        setPhoneNumber(response.data.user.hpNo);
        let birthDate;
        if (response.data.user.birthDt) {
          birthDate = moment(response.data.user.birthDt, 'YYYY-MM-DD').toDate();
        } else {
          birthDate = ""; // 빈 문자열
        }

        setBirthdate(birthDate);
        setNotes(response.data.user.rmrk);
      })
      .catch((err) => {
        //console.log(err)
      })
  }, [user])

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate('/login')
    } else {
      setCurrentImage(user.photoURL)
    }
  }, [user])

  const ImageUpload = (e) => {
    var formData = new FormData()
    formData.append('file', e.target.files[0])
    axios.post('/api/user/profile/img', formData).then((response) => {
      console.log(response.data)
      setCurrentImage(response.data.filepath)
    })
  }

  // Function to format the phone number with dashes
  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const numericInput = input.replace(/\D/g, '')
    if (numericInput.length === 0) return '' // Return empty if no digits
    if (numericInput.length <= 3) return numericInput // No need for dashes if 3 or fewer digits

    // Insert dashes at appropriate positions
    if (numericInput.length <= 7) {
      return `${numericInput.slice(0, 3)}-${numericInput.slice(3)}`
    } else {
      return `${numericInput.slice(0, 3)}-${numericInput.slice(
        3,
        7,
      )}-${numericInput.slice(7)}`
    }
  }

  const handlePhoneNumberChange = (e) => {
    // Format the input value with dashes
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhoneNumber(formattedPhoneNumber)
  }

  const SaveProfile = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: CurrentImage,
      })
    } catch (error) {
      return alert('프로필 저장에 실패하였습니다.')
    }
    let body = {
      photoURL: CurrentImage,
      phoneNumber: PhoneNumber,
      birthdate: Birthdate,
      notes: Notes,
      uid: user.uid,
      hpNo: PhoneNumber,
      birthDt: Birthdate,
      rmrk: Notes,
    }
    //console.log(body);
    axios.post('/api/user/profile/update', body).then((response) => {
      if (response.data.success) {
        alert('프로필 저장에 성공하였습니다.')
        window.location.reload()
      } else {
        return alert('프로필 저장에 실패하였습니다.')
      }
    })
  }

  return (
    <MyPageDiv>
      <form>
        <label>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => ImageUpload(e)}
          />
          <Avatar
            size="100"
            round={true}
            src={CurrentImage}
            style={{ border: '1px solid #c6c6c6', cursor: 'pointer' }}
          />
        </label>
        <InputDiv>
          <label htmlFor="phoneNumber">Tel</label>
          <input
            type="text"
            id="phoneNumber"
            value={PhoneNumber}
            onChange={handlePhoneNumberChange} // Use the formatted input handler
          />
        </InputDiv>
        <InputDiv>
          <label htmlFor="birthdate">Birth date</label>
          <DatePicker
            id="birthdate"
            selected={Birthdate}
            onChange={(date) => setBirthdate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </InputDiv>
        <InputDiv>
          <label htmlFor="notes">About Me</label>
          <textarea
            id="notes"
            rows="4"
            value={Notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </InputDiv>
        <button onClick={(e) => SaveProfile(e)}>Save</button>
      </form>
    </MyPageDiv>
  )
}

export default MyPage

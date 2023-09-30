import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Calendar() {
  const user = useSelector((state) => state.user)
  const [showModal, setShowModal] = useState(false)
  const [EventDate, setEventDate] = useState('') // 선택한 날짜 상태
  const [EventEndDate, setEventEndDate] = useState('') // 선택한 날짜 상태
  const [EventContent, setEventContent] = useState('') // 이벤트 내용 상태
  const [CalendarList, setCalendarList] = useState([]) // 이벤트 내용 상태
  let navigate = useNavigate()
  useEffect(() => {
    /*   if (!user.accessToken) {
      alert('로그인한 회원만 접근 가능합니다.')
      navigate('/login')
    }
*/
  }, [])
  const handleShow = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }
  const getCalendarList = () => {
    axios
      .post('/api/calendar/list')
      .then((response) => {
        if (response.data.success) {
          //console.log(response.data.calendarList);
          const calendarList = response.data.calendarList
          //console.log(calendarList)
          // CalendarList 배열을 사용하여 events 배열 생성

          const updatedEvents = calendarList.map((item) => {
            // eventEndDate를 Date 객체로 변환
            const endDate = new Date(item.eventEndDate)

            // 하루를 추가
            endDate.setDate(endDate.getDate() + 1)

            // 업데이트된 날짜를 'YYYY-MM-DD' 형식으로 포맷
            const formattedEndDate = endDate.toISOString().split('T')[0]

            return {
              title: item.eventContent,
              start: item.eventDate,
              uid: item.uid,
              calendarNum: item.calendarNum,
              end: formattedEndDate, // 업데이트된 end 날짜 사용
            }
          })
          //console.log(updatedEvents)
          setCalendarList(updatedEvents) // events 상태 업데이트
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getCalendarList()
  }, [])

  const onSubmitModal = (e) => {
    e.preventDefault()

    if (EventDate === '' || EventContent === '') {
      return alert('모든 항목을 채워주세요.')
    }
    let body = {
      eventDate: EventDate,
      eventEndDate: EventEndDate,
      eventContent: EventContent,
      uid: user.uid,
    }
    axios
      .post('/api/calendar/submit', body)
      .then((respose) => {
        if (respose.data.success) {
          alert('일정등록에 성공하였습니다.')
          // 일정을 등록한 후 목록을 다시 가져오기
          getCalendarList()

          // 모달 닫기
          handleClose()
        } else {
          alert('일정등록에 실패하였습니다.')
        }
      })
      .catch((err) => {
        console.log('err=>' + err)
      })
    // 모달을 닫고 상태를 초기화합니다.
    setShowModal(false)
    setEventDate('')
    setEventEndDate('')
    setEventContent('')
  }
  const deleteCalendarhandle = (info) => {
    const { event } = info
    //console.log(event._def.extendedProps.uid);
    //console.log(user.uid);
    if (user.uid !== event._def.extendedProps.uid) {
      return alert('등록자만 삭제할 수 있습니다.')
    }
    if (window.confirm('삭제하시겠습니까?')) {
      console.log(event._def.extendedProps.calendarNum)
      let body = {
        calendarNum: event._def.extendedProps.calendarNum,
      }

      axios
        .post('/api/calendar/delete', body)
        .then((response) => {
          if (response.data.success) {
            alert('삭제되었습니다.')

            // 삭제된 이벤트를 제외하고 새로운 CalendarList 생성
            const updatedCalendarList = CalendarList.filter((item) => {
              return item.calendarNum !== event._def.extendedProps.calendarNum
            })

            // CalendarList 상태 업데이트
            setCalendarList(updatedCalendarList)
          }
        })
        .catch((err) => {
          alert('실패하였습니다..')
        })
    }
  }

  useEffect(() => {
    // 페이지 로드 후 FullCalendar의 헤더 타이틀 색상 변경
    const toolbarTitle = document.querySelector('.fc-toolbar-title')
    if (toolbarTitle) {
      toolbarTitle.style.color = '#cbcbcb'
    }
  }, [])

  const eventDidMount = (info) => {
    const eventEl = info.el

    // 이벤트 데이터가 있을 때 색상 변경
    if (info.event) {
      eventEl.style.backgroundColor = '#cbcbcb' // 원하는 색상으로 변경
      eventEl.style.border = 'none'
      const progressBar = eventEl.querySelector('.fc-event-main')

      if (progressBar) {
        progressBar.style.color = '#272829'
      }
    }
  }
  return (
    <div style={{ width: '100%', margin: '0 auto', background: '#272829' }}>
      <div
        className="calendar-container"
        style={{
          width: '100%',
          margin: '0 auto',
          background: '#272829',
          height: '2000px',
        }}
      >
        <br />
        <Button
          variant="primary"
          onClick={handleShow}
          style={{
            background: 'black',
            border: 'none',
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
            color: 'white', // 버튼 텍스트 색상
            transition: 'background-color 0.3s ease', // 스무딩 효과
            cursor: 'pointer', // 커서 모양 변경
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'white' // 마우스를 올렸을 때의 배경색
            e.target.style.color = 'black' // 마우스를 올렸을 때의 텍스트 색상
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'black' // 마우스를 내렸을 때의 배경색
            e.target.style.color = 'white' // 마우스를 내렸을 때의 텍스트 색상
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = 'gray' // 클릭했을 때의 배경색
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = 'black' // 클릭을 해제했을 때의 배경색
          }}
        >
          Add schedule
        </Button>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={CalendarList}
          eventClick={deleteCalendarhandle}
          height="807px"
          headerToolbar={{
            end: 'today',
            center: 'title',
            start: 'prev,next',
          }}
          eventDidMount={eventDidMount}
          titleFormat={{
            year: 'numeric', // 년도를 숫자로 표시
            month: 'short', // 월을 긴 형식으로 표시
          }}
          dayHeaderContent={({ date }) => {
            const style = {
              color: '#cbcbcb',
              fontWeight: 'bold',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontSize: '12px',
            }

            const handleButtonClick = () => {
              // 버튼이 클릭되었을 때 수행할 작업 추가
              // 예: 링크처럼 동작하도록 프로그래밍
            }

            const buttonStyle = {
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              color: '#cbcbcb', // 폰트 색상을 #cbcbcb로 설정
            }

            return (
              <span style={style}>
                <button onClick={handleButtonClick} style={buttonStyle}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </button>
              </span>
            )
          }}
          dayCellContent={({ date }) => {
            const style = {
              color: '#cbcbcb',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '13px',
            }

            const handleButtonClick = () => {
              // 버튼이 클릭되었을 때 수행할 작업 추가
              // 예: 링크처럼 동작하도록 프로그래밍
            }

            const buttonStyle = {
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              color: '#cbcbcb', // 폰트 색상을 #cbcbcb로 설정
            }

            return (
              <span style={style}>
                <button onClick={handleButtonClick} style={buttonStyle}>
                  {date.getDate()}
                </button>
              </span>
            )
          }}
        />

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header
            closeButton
            style={{ background: '#272829', color: '#cbcbcb' }}
          >
            <Modal.Title>Add schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: '#272829', color: '#cbcbcb' }}>
            <Form>
              <Form.Group controlId="eventDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={EventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="eventEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={EventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="eventContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  value={EventContent}
                  onChange={(e) => setEventContent(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ background: '#272829', color: '#cbcbcb' }}>
            <Button
              variant="primary"
              onClick={(e) => {
                onSubmitModal(e)
              }}
              style={{
                background: 'black',
                border: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
                color: 'white', // 버튼 텍스트 색상
                transition: 'background-color 0.3s ease', // 스무딩 효과
                cursor: 'pointer', // 커서 모양 변경
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white' // 마우스를 올렸을 때의 배경색
                e.target.style.color = 'black' // 마우스를 올렸을 때의 텍스트 색상
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'black' // 마우스를 내렸을 때의 배경색
                e.target.style.color = 'white' // 마우스를 내렸을 때의 텍스트 색상
              }}
              onMouseDown={(e) => {
                e.target.style.backgroundColor = 'gray' // 클릭했을 때의 배경색
              }}
              onMouseUp={(e) => {
                e.target.style.backgroundColor = 'black' // 클릭을 해제했을 때의 배경색
              }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                background: 'black',
                border: 'none',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
                color: 'white', // 버튼 텍스트 색상
                transition: 'background-color 0.3s ease', // 스무딩 효과
                cursor: 'pointer', // 커서 모양 변경
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white' // 마우스를 올렸을 때의 배경색
                e.target.style.color = 'black' // 마우스를 올렸을 때의 텍스트 색상
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'black' // 마우스를 내렸을 때의 배경색
                e.target.style.color = 'white' // 마우스를 내렸을 때의 텍스트 색상
              }}
              onMouseDown={(e) => {
                e.target.style.backgroundColor = 'gray' // 클릭했을 때의 배경색
              }}
              onMouseUp={(e) => {
                e.target.style.backgroundColor = 'black' // 클릭을 해제했을 때의 배경색
              }}
            >
              Cancle
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <style>
        <style>
          {`
    @media (max-width: 768px) {
      .calendar-container {
        width: 50%;
        background: #272829 !important; /* !important를 추가하여 우선순위 높임 */
        height: 1000px !important;
      }
      /* 다른 화면 크기에 따라 필요한 스타일을 추가할 수 있습니다. */
    }
  `}
        </style>
      </style>
    </div>
  )
}

export default Calendar

import styled from '@emotion/styled'

const MyPageDiv = styled.div`
  background-color: #272829;
  min-height: 100vh; /* Change to min-height to avoid cropping on smaller screens */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align form content to the top */
  color: #cbcbcb;

  form {
    width: 300px;
    margin: 2rem auto 0; /* Add margin-top to move the form upwards */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 15px;
    
  }

  /* Add styles for the date picker input */
  .datepicker {
    cursor: pointer;
    background-color: #383c3c;
    color: #cbcbcb;
  }

  button {
    border-radius: 15px;
    padding: 5px 10px;
    background-color: black;
    color: white;
    border: 1px solid black;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
  }
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
  }

  /* Style for the phone number input */
  .phone-input {
    input[type='tel'] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      margin: 0;
      
    }
  }
`

export { MyPageDiv, InputDiv }

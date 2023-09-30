import styled from '@emotion/styled'

const BackgroundDiv = styled.div`
  background: #272829;
  width: 100vw; /* 화면 너비만큼 확장 */
  height: 100vh; /* 화면 높이만큼 확장 */
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`

const LoginDiv = styled.div`
  width: 50%;
  max-width: 360px;
  margin: 0 auto;
  margin-top: -15rem;
  form {
    border-radius: 15px;
    background: #383c3c;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
      0px 15px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      color: #cbcbcb;
    }
    input {
      border-radius: 10px;
      border: 1px solid #c6c6c6;
      padding: 5px;
      margin-bottom: 10px;
      &:active,
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 15px;
      padding: 5px 10px;
      background-color: #272829;
      color: #cbcbcb;
      border: 1px solid white;
      margin-top: 10px;
      &:hover {
        background-color: white;
        color: #272829;
        border: 1px solid #272829;
      }
    }
    @media (max-width: 756px) {
      width: 100%;
    }
  }
`

export { LoginDiv, BackgroundDiv }

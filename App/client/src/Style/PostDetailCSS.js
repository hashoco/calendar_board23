import styled from '@emotion/styled'

const PostDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`

const SpinnerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`

const Post = styled.div`
  border-radius: 15px;
  width: 100%;
  height: auto;
  background: #383c3c;
  padding: 30px 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  color: #cbcbcb;
  h1 {
    font-weight: bold;
  }
  p {
    margin-bottom: 0px;
  }
`

const BtnDiv = styled.div`  
margin-top: 1rem;

display: flex;
justify-content: flex-end;
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
  &.cancel {
    margin-right: 10px;
  
    background-color: white;
    color: black;
    border: 1px solid black;
    &:hover {
      background-color: black;
      color: white;
      border: 1px solid black;
    }
  }
}
`

export { PostDiv, SpinnerDiv, Post, BtnDiv }

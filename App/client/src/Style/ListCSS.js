import styled from '@emotion/styled'



const ListDiv = styled.div`
  
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  min-height: 535px;
  height: auto;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
    min-height: 800px;
  }
`

const ListItem = styled.div`

  width: 100%;
  height: auto;
  border-radius: 15px;
  min-height: 120px;
  background: #383c3c;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  
  a {
    color: #cbcbcb;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
`

export { ListDiv, ListItem }

import styled from '@emotion/styled'

const NotFoundDiv = styled.div`
  background-color: #1e1e1e;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: shake 1.0s ease infinite; /* 애니메이션 속성 추가 */
  }

  p {
    font-size: 1.5rem;
    animation: shake 1.0s ease infinite; /* 애니메이션 속성 추가 */
  }

  @keyframes shake { /* 흔들림 애니메이션 정의 */
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }

  @media (max-width: 756px) {
    width: 100%;
  }
`

export { NotFoundDiv }

import styled from '@emotion/styled';
import backgroundImg from '../image/black.jpg';

const MainContainer = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  text-align: center;
  color: white;
  animation: fadeInRotate 2s ease-in-out; /* 애니메이션 추가 */
  @media (max-width: 756px) {
    width: 100%;
  }

  @keyframes fadeInRotate {
    0% {
      opacity: 0;
      transform: rotate(-10deg);
    }
    100% {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  user-select: none;
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  text-align: center;
  user-select: none;
`;

export { MainContainer, ContentContainer, Title, Description };

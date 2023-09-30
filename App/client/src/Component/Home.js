import React from 'react'
import {
  MainContainer,
  ContentContainer,
  Title,
  Description,
} from '../Style/HomeCSS.js'
function Home() {
  return (
    <>
      <MainContainer>
        <ContentContainer>
          <Title>Record Your Thoughts</Title>
          <Description>
            Memoize Emotions, Ideas, and Goals, and Manage Your Schedule
          </Description>
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export default Home

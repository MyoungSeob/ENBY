// 모임게시글 상세에 들어가는 코멘트 컴포넌트입니다. MatingDetail에 속해있습니다.

import React from 'react';
import styled from 'styled-components';

const About =(props)=>{

    return (
      <Container>
        <AboutTitle>
          <Title>About</Title>
        </AboutTitle>
        <AboutContents>
          {/* Matingdetail에서 받는 코멘트값입니다. */}
          <Contents>{props.contents}</Contents>
        </AboutContents>
      </Container>
    );
}

const Container = styled.div`
  width : 717px;
  height : 570px;
  float: right;
  margin-left : 73px;
  @media (max-width: 600px) {
    width: 280px;
    height: 160px;
    margin-left: 0;
   }
`;
const AboutTitle = styled.div`
    
    margin-bottom : 34px;
    @media (max-width: 600px) {
      margin-top: 34px;
      margin-bottom: 5px;
     }
`
const Title = styled.h2`
    font-size : 28px;
    font-family : seravek;
    font-style : italic;
    margin : 0;
    @media (max-width: 600px) {
      font-size: 21px;
     }
`
const AboutContents = styled.div`
`
const Contents = styled.p`
font-size : 18px;
font-family : notosans_regular;
@media (max-width: 600px) {
  font-size: 13px;
 }
`

export default About;
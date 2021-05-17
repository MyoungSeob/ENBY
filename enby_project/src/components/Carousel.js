import "../carousel.css";
import React from 'react'
import styled from 'styled-components';
import Image from '../elements/Image'
import santa from '../shared/image/santatit.png'
import { generateMedia } from 'styled-media-query';

// function Carousel() {
  const Carousel=(props)=>{
  return (
    <>
    <Container>
      {/* <div data-src={require("../shared/image/santatit.png").default} />
      <div data-src={require("../shared/image/main_carousel1.png").default} />
      <div data-src={require("../shared/image/main_carousel3.png").default} />
      <div data-src={require("../shared/image/main_carousel4.png").default} />
       */}
       <Image shape="maintitle"src={santa}/>
    </Container>
    <Title>
      <TitleBox>
      <TitleLogo>Hello, we are SANTA</TitleLogo>
      <SubTitle>지금, 당신과 함께 할 <Span>하이킹 메이트</Span>를 찾아보세요.</SubTitle>
      </TitleBox>
    </Title>
    </>
  );
}

const Container = styled.div`
  position : absolute;
  width: 100%;
  height: 520px;
  margin : 0px auto 0px auto;
  z-index : -1;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
    @media (max-width: 600px) {
      height: 320px;
    }
`;
const Title = styled.div`
  position : relative;
  margin : 0px auto 0px auto;
  width : 1200px;
  height : 520px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 100%;
    height: 320px;
  }
  cursor : default;
`
const TitleBox = styled.div`
  width : 747px;
  height : 144px;
  margin : auto;
  padding-top : 188px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 100%;
    padding-top: 120px;
  }
`
const TitleLogo = styled.h1`
text-align : center;
  width : auto;
  margin : 0;
  font-family : seravek;
  font-size : 80px;
  color : #ffffff;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    font-size : 30px;
  }
`
const SubTitle = styled.p`
text-align : center;
font-family : notosans_regular;
font-size : 32px;
margin : 0px;
color : #ffffff;
@media (min-width: 600px) and (max-width: 1170px) {
  // width: 320px;
  // height: 235.73px;
  }

@media (max-width: 600px) {
  font-size: 13px;
}
`
const Span = styled.span`
font-family : notosans_bold;
font-size : 32px;
color : #ffffff;
@media (min-width: 600px) and (max-width: 1170px) {
  // width: 320px;
  // height: 235.73px;
  }

@media (max-width: 600px) {
  font-size: 13px;
`

export default Carousel;
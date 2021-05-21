import "../carousel.css";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import santa from "../shared/image/MaskGroup.png";
import scroll from '../shared/image/scrollbutton.png'
import { useMediaQuery } from "react-responsive";

// function Carousel() {
const Carousel = (props) => {
  const isMiddle = useMediaQuery({
    query: "(max-width: 1450px)",
  });
  const isLarge = useMediaQuery({
    query: "(max-width: 1920px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  const clickScrollButton = () => {
    if (isMiddle===true) {
      window.scrollTo({ top: 900, left: 0, behavior: "smooth" });
      if (isSmall===true) {
        window.scrollTo({ top: 770, left: 0, behavior: "smooth" });
        
      }
    }else{
      window.scrollTo({ top: 1150, left: 0, behavior: "smooth" });
    }
    
    
  };


        // <TitleGrid>
        //   <TitleBox>
        //     <TitleLogo>Hello, we are SANTA</TitleLogo>
        //     <SubTitle>
        //       지금, 당신과 함께 할 <Span>산타</Span>를 찾아보세요.
        //     </SubTitle>
        //   </TitleBox>
        // </TitleGrid>
     
  return (
    <>
      <Container>
        {/* <div data-src={require("../shared/image/santatit.png").default} />
      <div data-src={require("../shared/image/main_carousel1.png").default} />
      <div data-src={require("../shared/image/main_carousel3.png").default} />
      <div data-src={require("../shared/image/main_carousel4.png").default} />
       */}
        <Image shape="maintitle" src={santa} />
      </Container>
      <Title>
        <WhiteContainer>
          <WhiteGrid>
            <WhiteTitle>
              <SubTitText>Hello, we are SANTA.</SubTitText>
              <TitText>우리, 산타러 갈래요?</TitText>
            </WhiteTitle>
            <WhiteComment>
              <Comment>
                등산이 낮선 당신을 위한 메이팅 서비스입니다. <br />
                새로운 모임을 만들거나 신청하고, <br />
                등산 후 당신의 즐거웠던 시간을 공유해보세요!
              </Comment>
              <ScrollButton src={scroll} onClick={clickScrollButton} />
            </WhiteComment>
          </WhiteGrid>
        </WhiteContainer>
      </Title>
    </>
  );
};
const WhiteBox = styled.div`
  position: relative;
  margin: 0px auto 0px auto;
  width: 1200px;
  height: 649px;
  padding-top: 351px;
  
`;
const WhiteContainer = styled.div`
  width: 1200px;
  padding-top: 351px;
  @media (max-width: 1440px) {
    width: 1440px;
    height: 399px;
    padding-top: 262px;
  }
  @media (max-width: 1200px) {
    width: 1200px;
    max-width: 100%;
    height: 425px;
    padding-top: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 270px;
    padding-top: 60px;
  }

`;
const WhiteGrid = styled.div`
  width: 442px;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0 auto 0 0;
  @media (max-width : 1440px) {
    width: 330px;
    height : 210px;
    margin : 0 auto 0 121px;

  }
  @media (min-width: 600px) and (max-width: 1200px) {
    width: 329px;
    height: 210px;
    margin : 0 auto 0 103px;
    }
  
  @media (max-width: 600px) {
    width: 269px;
    height: 160px;
    margin : 30px auto 0 20px;
  }
  &: hover {
    background-color: rgba(255, 255, 255, 0.9);
    transition-duration: 0.15s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
  }
`
const WhiteTitle = styled.div`
  padding: 47px 0 0 45.77px;
  @media (max-width : 1440px) {
    padding: 35px 0 0 35px;
  }
  @media (max-width: 600px) {
    padding:19px 0 0 14px;
  }
`;
const SubTitText = styled.h2`
  font-family: seravek;
  font-size: 31px;
  color: #64a3cb;
  margin: 0;
  @media (max-width : 1440px) {
    font-size : 23px;
  }
  @media (max-width: 600px) {
    font-size: 19px;
  }
`;
const TitText = styled.h1`
  margin: 0;
  font-family: notosans_regular;
  font-size: 35px;
  color: #168ed9;
  @media (max-width : 1440px) {
    font-size : 26px;
  }
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;
const WhiteComment = styled.div`
  padding-left: 45.77px;
  @media (max-width : 1440px) {
    padding-left : 35px;
  }
  @media (max-width: 600px) {
    padding-left: 21px;
  }
`;
const ScrollButton = styled.img`
  width : 36px;
  height : 36px;
  margin-top : 18px;
  cursor : pointer;
  @media (max-width : 1440px) {
    width : 32px;
    height : 32px;
    margin-top : 13px;
  }
  @media (min-width: 600px) and (max-width: 1200px) {
    width: 28px;
    height: 28px;
    margin-top : 13px;
  }
  @media (max-width: 600px) {
    display : none;
  }
`
const Comment = styled.p`
  font-family: notosans_regular;
  font-size: 17px;
  color: #000000;
  @media (max-width : 1440px) {
    font-size : 13px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px auto 0px auto;
  z-index: -1;

  @media (max-width: 1440px) {
    width: 1440px;
    height: 750px;
  }
  @media (max-width: 1200px) {
    width: 1200px;
    max-width: 100%;
    height: 625px;
    background-size: 1200px 625px;
    background-position: center;
  }
  @media (max-width: 600px) {
    height: 320px;
  }
`;
const Title = styled.div`
  position: relative;
  margin: 0px auto 0px auto;
  width: 1200px;
  height: 520px;
  @media (min-width: 600px) and (max-width: 1170px) {
  }
  @media (max-width: 1440px) {
    width: 1440px;
    height: 750px;
  }
  @media (max-width: 1200px) {
    width: 1200px;
    max-width: 100%;
    height: 625px;
    background-size: 1200px 625px;
    background-position: center;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 320px;
    background-size: 100% 320px;
    background-position: center;
  }
  cursor: default;
`;
const TitleGrid = styled.div`
  width: 1200px;
  padding-top: 418px;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
`;
const TitleBox = styled.div`
  width: 747px;
  height: 144px;
  margin: auto;

  @media (min-width: 600px) and (max-width: 1170px) {
  }
  @media (max-width: 1440px) {
    padding-top: 318px;
  }
  @media (max-width: 1200px) {
    padding-top: 248px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding-top: 120px;
  }
`;
const TitleLogo = styled.h1`
  text-align: center;
  width: auto;
  margin: 0;
  font-family: seravek;
  font-size: 80px;
  color: #ffffff;
  @media (min-width: 600px) and (max-width: 1170px) {
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;
const SubTitle = styled.p`
  text-align: center;
  font-family: notosans_regular;
  font-size: 32px;
  margin: 0px;
  color: #ffffff;
  @media (min-width: 600px) and (max-width: 1170px) {
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
const Span = styled.span`
font-family : notosans_bold;
font-size : 32px;
color : #ffffff;
@media (min-width: 600px) and (max-width: 1170px) {

  }

@media (max-width: 600px) {
  font-size: 13px;
`;

export default Carousel;

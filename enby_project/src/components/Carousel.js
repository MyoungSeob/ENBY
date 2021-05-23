// 메인페이지의 배너로고 컴포넌트입니다.
import "../carousel.css";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import santa from "../shared/image/mainlogoedit.png";
import scroll from '../shared/image/scrollbutton.png'
import { useMediaQuery } from "react-responsive";

// function Carousel() {
const Carousel = (props) => {
  // 화면 사이즈에 따라 스크롤 위치를 옮겨주기 위해 react-responsive를 이용해서 크고, 작고, 중간의 사이즈를 구분했습니다.
  const isMiddle = useMediaQuery({
    query: "(max-width: 1450px)",
  });
  const isLarge = useMediaQuery({
    query: "(max-width: 1920px)",
  });
  const isSmall = useMediaQuery({
    query: "(max-width: 1200px)",
  });
// 클릭 시 게시글 목록이 있는 곳으로 스크롤위치를 옮겨주는 코드입니다. 크고 작은 화면과 그 중간 화면의 높이를 각각 설정해 주었습니다.
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

     
  return (
    <>
      <Container>
        <Image shape="maintitle" src={santa} />
      </Container>
      <Title>
        <WhiteContainer>
          <WhiteGrid>
            <WhiteTitle>
              <SubTitText>Hello, we are <Span_>SANTA</Span_>.</SubTitText>
              <TitText>우리, 산타러 갈래요?</TitText>
            </WhiteTitle>
            <WhiteComment>
              <Comment>
                등산과는 거리가 먼 당신을 위한 메이팅 서비스입니다. <br />
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
  background-color: rgba(255, 255, 255, 1);
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
const Span_ = styled.span`
  font-style : italic;
`
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
    padding-left: 15px;
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
    font-size: 10px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin : 0px auto 0px auto;
  z-index : -1;
    &:hover {
      width: 100px;
      // transform: scale(1.5);
      // transition: transform 1s;
      // filter: brightness(70%);
    }
    @media (max-width: 1440px) {
      width : 1440px;
      height: 750px;
    }
    @media (max-width : 1200px) {
      width: 1200px;
      max-width: 100%;
      height: 625px;
      background-size : 1200px 625px;
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

export default Carousel;

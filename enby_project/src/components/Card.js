// 메인 페이지와 마이페이지, 리뷰게시판의 글 작성하기(모달)에 사용되는 카드입니다.
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardDetail from "./CardDetail";
import { generateMedia } from "styled-media-query";
import { useMediaQuery } from "react-responsive";
import Image from "../elements/Image";

const Card = (props) => {
  // 이 카드의 정보들을 이용하여 카드를 눌렀을 때 게시글 상세, 후기글 작성으로 이동할 수 있도록 해주는 코드입니다.
  const move_page = () => {
    if(props.deadlineStatus === true){
      window.alert("이미 모집이 마감된 게시글입니다.")
    }
    if (props.board_name === "신청한 모임") {
      history.push(`/board/mating/${props.id}`);
      return;
    }
    if (props.board_name === "참석한 모임") {
      history.push("/review/write/" + `${props.id}`);
      return;
    }
    if (!props.board_name) {
      
      history.push(`/board/mating/${props.id}`);
    }
  };
  // 카드에 들어가는 버튼의 내용을 카드에 내려오는 정보를 이용하여 상황에 따라 다르게 나타내도록 하는 코드입니다.
  const view = (board_name) => {
    if (board_name === "신청한 모임") {
      return <ApplyButton>더보기</ApplyButton>;
    }
    if (board_name === "참석한 모임") {
      return <ApplyButton>후기 남기기</ApplyButton>;
    }
    if (!board_name) {
      return <ApplyButton>더보기</ApplyButton>;
    }
  };

  return (
    <CardGrid onClick={move_page}>
      {props.deadlineStatus === true ? (
        <>
          <Image shape="deadlinecard" src={props.board_imgUrl} />
          <DeadlineCardTitle>
            <TitleH>마감되었습니다.</TitleH>
          </DeadlineCardTitle>
        </>
      ) : (
        <CardImage src={props.board_imgUrl} />
      )}

      <CardTit>
        <CardTitH>{props.title}</CardTitH>
      </CardTit>
      <CardDetail {...props} />
      {/* <CardButton>
        <ApplyButton>
          {view(props.board_name)}
        </ApplyButton>
      </CardButton> */}
    </CardGrid>
  );
};
const CardGrid = styled.div`
  display: block;
  float: left;
  width: 282px;
  height: 408px;
  margin: 0 8px 79px 8px;
  // margin-left: 16px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    transition: box-shadow 0.15s ease-out;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 320px;
    height: 235.73px;
  }

  @media (max-width: 600px) {
    width: 165px;
    height: 210px;
    margin: 6px;
    border-radius: 10px;
    margin-bottom: 35px;
  }
`;
const CardImage = styled.img`
  // width: 282px;
  width: 100%;
  height: 282px;
  border-radius: 20px;
  objectfit: inherit;
  position: relative;
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 320px;
    height: 210px;
  }

  @media (max-width: 600px) {
    width: 165px;
    height: 105px;
    max-width: 100%;
    margin: auto;
    border-radius: 10px 10px 0 0;
  }
  &: hover {
    // box-shadow: 0px 10px 30px rgba(00,00,00, 0.5); 
    // transition: box-shadow .15s ease-out;
    // letter-spacing: 0px;
    // -webkit-font-smoothing: antialiased;
    // overflow-anchor: none;
    filter: drop-shadow(0 0.4rem 0.3rem rgba(33,33,33,.3));
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
`;
const DeadlineCardImage = styled.img`
  // width: 282px;
  width: 282px;
  height: 282px;
  border-radius: 20px;
  position: absolute;
  border-radius: 20px;
  opacity : 40%;
  filter : grayscale(100%);
  z-index : 0
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 320px;
    height: 210px;
  }

  @media (max-width: 600px) {
    width: 165px;
    height: 105px;
    max-width: 100%;
    margin: auto;
    border-radius: 10px 10px 0 0;
  }
  &: hover {
    // box-shadow: 0px 10px 30px rgba(00,00,00, 0.5); 
    // transition: box-shadow .15s ease-out;
    // letter-spacing: 0px;
    // -webkit-font-smoothing: antialiased;
    // overflow-anchor: none;
    filter: drop-shadow(0 0.4rem 0.3rem rgba(33,33,33,.3)) grayscale(100%);
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
`;
const DeadlineCardTitle = styled.div`
width: 282px;
height: 282px;
position : relative;
z-index : 1;
text-align : center;
@media (max-width: 600px) {
  width: 165px;
  height: 105px;
  max-width: 100%;
  margin: auto;
  border-radius: 10px 10px 0 0;
}
`
const TitleH = styled.p`
  margin : 0;
  padding-top : 127px;
  font-size : 18px;
  font-family : notosans_regular;
  text-align : cneter;
  @media (max-width: 600px) {
    padding-top : 40px;
    width: 165px;
    height: 105px;
    max-width: 100%;
    margin: auto;
    border-radius: 10px 10px 0 0;
  }
`

const CardTit = styled.div`
  display: block;
  width: 282px;
  height: 27px;
  margin: 14px 0 8px 1px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 320px;
    height: 210px;
  }

  @media (max-width: 600px) {
    width: 108px;
    // height: 18px;
    margin: 4px;
  }
`;
const CardTitH = styled.div`
  color: #000000;
  width: 100%;
  font-family: notosans_bold;
  font-size: 18px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ApplyButton = styled.button`
  width: 167px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  background-color: #f1b100;
  font-family: notosans_regular;
  font-size: 16px;
  cursor: pointer;
`;
export default Card;

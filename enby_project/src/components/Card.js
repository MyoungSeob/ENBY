// 메인 페이지와 마이페이지, 리뷰게시판의 글 작성하기(모달)에 사용되는 카드입니다.
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardDetail from "./CardDetail";
import { generateMedia } from "styled-media-query";
import { useMediaQuery } from "react-responsive";

const Card = (props) => {
  // 이 카드의 정보들을 이용하여 카드를 눌렀을 때 게시글 상세, 후기글 작성으로 이동할 수 있도록 해주는 코드입니다.
  const move_page = () => {
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
      <CardImage src={props.board_imgUrl} />
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
    // transition-property: box-shadow;
    // transition-duration: 0.15s;
    // transition-timing-function: ease-out;
    // transition-delay: 0s;
    // letter-spacing: 0px;
    // -webkit-font-smoothing: antialiased;
    // overflow-anchor: none;
    // box-shadow: 3px 1px 0 0 rgb(0 0 0 / 10%);

    // box-shadow: 2px 2px 4px rgb(0 0 0 / 16%);
    transition: box-shadow 0.15s ease-out;
    // height: 100%;
    // left: 0;
    // top: 0;
    // width: 100%;
    // padding-bottom: 5px;
    // box-sizing: border-box;
    // letter-spacing: 0px;
    // -webkit-font-smoothing: antialiased;
    // overflow-anchor: none;
    // transition: box-shadow .3s;

    // border: 1px solid #ccc;
    // background: #fff;
    // float: left;
    // box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
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
    filter: drop-shadow(-0.3px 0 0.2rem gray);
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
`;

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

const CardButton = styled.div`
  float: left;
  margin: 5px 0 0 27px;
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

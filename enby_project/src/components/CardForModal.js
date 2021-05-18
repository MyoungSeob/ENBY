// 후기남기기 모달 카드 -> 사이즈때문에 그냥 컴포넌트 따로 만듦

import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardDetail from "./CardDetail";

const CardForModal = (props) => {
  const move_page = () => {
    history.push(`/review/write/${props.id}`);
  };


  return (
    <Container>
      <CardGrid onClick={move_page}>
        <CardImage src={props.board_imgUrl} />
        <CardTit>
          <CardTitH>{props.title}</CardTitH>
        </CardTit>
        <CardDetail {...props} />
      </CardGrid>
    </Container>
  );
};

const Container = styled.div`
`;
const CardGrid = styled.div`
  float: left;
  width: 282px;
  height: 408px;
  margin: 0 52px 0 52px;
  border-radius : 20px;
  cursor: pointer;
  background-color: #ffffff;

`;
const CardImage = styled.img`
  width: 282px;
  height: 282px;
  border-radius : 20px;
  objectfit: inherit;
  position: relative;
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
`;

export default CardForModal;

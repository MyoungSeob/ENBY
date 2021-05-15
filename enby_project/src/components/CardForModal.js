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
  margin: 0 52px 79px 52px;
  border-radius : 20px;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    transition-property: box-shadow;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    overflow-anchor: none;
    box-shadow: 3px 1px 0 0 rgb(0 0 0 / 10%);
  }
`;
const CardImage = styled.img`
  width: 282px;
  height: 282px;
  border-radius : 20px;
  objectfit: inherit;
  position: relative;
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

const Line = styled.div`
  border-bottom: 1px solid #c4c4c4;
  width: 308px;
  height: 1px;
  display: absolute;
  margin: auto auto auto 27px;
`;

const CardBody = styled.div`
  width: 100%;
  hegith: 90%;
  text-align: left;
  margin-bottom:
  & button {
    margin: 40px;
    position: absolute;
    width: 167px;
    height: 40px;

    background: #f1b100;
    border-radius: 20px;
    border: 0;

    position: absolute;
    cursor: pointer;

    font-family: notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */
    text-align: center;

    color: #392600;
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
export default CardForModal;

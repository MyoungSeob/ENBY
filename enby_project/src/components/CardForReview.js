// 후기남기기 모달 카드 -> 사이즈때문에 그냥 컴포넌트 따로 만듦

import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardDetail from "./CardDetail";

const Card = (props) => {
  const move_page = () => {
    history.push(`/review/write/${props.id}/review`);
  };


  return (
      <Container>
        <CardGrid onClick={move_page}>
            <CardImage src={props.board_imgUrl} />
            <CardTit>
                <CardTitH>{props.title}</CardTitH>
            </CardTit>
            <Line />
            <CardDetail {...props} />
            <CardButton>
                <ApplyButton>
                    후기 남기기
                </ApplyButton>
            </CardButton>
        </CardGrid>
    </Container>
  );
};

const Container = styled.div`
    width: 200px;
    height: 560px;
    display: flex;
`;
const CardGrid = styled.div`
  display: block;
  float: left;
//   width: 380px;
//   height: 542px;
  margin: 0 15px 79px auto;
  border: 1px solid #eee;
  cursor: pointer;
  background-color: #f3f3f3;
  justify-content: space-between;
  &:hover {
    transition-property: box-shadow;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
    // box-sizing: border-box;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    overflow-anchor: none;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 16%);
  }
`;
const CardImage = styled.img`
  width: 400px;
  height: 184px;
  objectfit: cover;
  position: relative;
`;

const CardTit = styled.div`
  display: block;
  width: 108px;
  height: 40px;
  margin: 19px 0 15px 0;
`;
const CardTitH = styled.div`
  width: 100%;
  font-family: notosans_bold;
  font-size: 24px;
  margin: 0 0 0 26px;
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
  width: 107px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  background-color: #f1b100;
  font-family: notosans_regular;
  font-size: 16px;
  cursor: pointer;
`;
export default Card;

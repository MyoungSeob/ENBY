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
            <Line />
            <Body>
              <CardDetail {...props} />
            </Body>
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
    width: 320px;
    height: 440px;
    display: flex;
    margin: 30px;
    margin-bottom: 50px;
`;
const CardGrid = styled.div`
  // display: block;
  
  width: 320px;
//   height: 542px;
  // margin: 0 15px 79px auto;
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
  width: 320px;
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
  font-size: 22px;
  margin: -10px 0 0 26px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const Line = styled.div`
  border-bottom: 1px solid #c4c4c4;
  width: 320px;
  height: 1px;
  margin: -20px auto;
`;
const Body = styled.div`
  margin-left: -10px;
  // margin-top: 20px;
  margin-top: 40px;
`;
const CardButton = styled.div`
  float: left;
  margin: 0 0 0 27px;
`;
const ApplyButton = styled.button`
  width: 88px;
  height: 30px;
  border-radius: 20px;
  border: 0;
  background-color: #f1b100;
  font-family: notosans_regular;
  font-size: 13px;
  cursor: pointer;
`;
export default CardForModal;

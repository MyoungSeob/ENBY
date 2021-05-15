// 메인 페이지와 마이페이지, 리뷰게시판의 글 작성하기(모달)에 사용되는 카드입니다.
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardDetail from "./CardDetail";

const Card = (props) => {
  // 이 카드의 정보들을 이용하여 카드를 눌렀을 때 게시글 상세, 후기글 작성으로 이동할 수 있도록 해주는 코드입니다.
  const move_page = () => {
    if(props.board_name === "신청한 모임"){
      history.push(`/board/mating/${props.id}`);
      return
    }
    if(props.board_name === "참석한 모임"){
      history.push('/review/write/' + `${props.id}`);
      return
    }
    if(!props.board_name){
      history.push(`/board/mating/${props.id}`)
    }
    
  };
  // 카드에 들어가는 버튼의 내용을 카드에 내려오는 정보를 이용하여 상황에 따라 다르게 나타내도록 하는 코드입니다.
  const view=(board_name)=>{
    if(board_name === "신청한 모임"){
      return <ApplyButton>더보기</ApplyButton>
    }
    if(board_name === "참석한 모임"){
      return <ApplyButton>후기 남기기</ApplyButton>
    }
    if(!board_name){
      return <ApplyButton>더보기</ApplyButton>
    }
  }

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
  margin: 0 0 79px 0;
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
export default Card;

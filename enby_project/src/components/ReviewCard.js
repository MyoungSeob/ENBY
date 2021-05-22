// 주최자가 주최했던 모임 카드 컴포넌트입니다. MatingDetail의 자식컴포넌트입니다.
import React from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";

const ReviewCard = (props) => {
  //해당 리뷰들로 이동합니다.
  const move_page = () => {
    history.push(`/board/review/${props.review_id}`);
  };
  return (
    <React.Fragment>
      <CardGrid onClick={move_page}>
        <CardImage src={props.review_imgUrl} />
        <CardTit>
          <CardTitH>{props.title}</CardTitH>
        </CardTit>
        <UserInfo>
          <UserPic src={props.profile_Img} />
          <UserNickname>{props.nickname}</UserNickname>
        </UserInfo>
      </CardGrid>
    </React.Fragment>
  );
};
const CardGrid = styled.div`
  display: block;
  float: left;
  width: 282px;
  height: 330px;
  margin: 0 8px 79px 8px;
  border: 1px solid #eee;
  border-radius: 20px;
  cursor: pointer;
  background: #ffffff;
  justify-content: space-between;
  &:hover {
    filter: drop-shadow(0 0.4rem 0.3rem rgba(33,33,33,.2));
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 170px;
    height: 245px;
    margin-bottom: 30px;
    }
  
  @media (max-width: 600px) {
    width: 165px;
    height: 210px;
    margin: 6px;
    border-radius: 10px;
    margin-bottom: 14px;
  }
`;

const CardImage = styled.img`
  // position: absolute;
  width: 282px;
  height: 242px;
  // left: 218px;
  // top: 501px;
  border-radius: 20px 20px 0 0;
  // border-radius: 0px;
  // width: 338px;
  // height: 221.49px;
  objectfit: cover;
  border-radius: 20px 20px 0 0;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 170px;
    height: 170px;
  }
  
  @media (max-width: 600px) {
    width: 165px;
    height: 165px;
    max-width: 100%;
    margin: auto;
    border-radius: 10px 10px 0 0;

  }
`;

const CardTit = styled.div`
  display: block;
  width: 242px;
  height: 27px;
  margin: 17px 20px 2px 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 160px;
    height: 30px;
    margin: 10px 0 0px 5px;
  }
  
  @media (max-width: 600px) {
    width: 156px;
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
    margin: -3px 0 0 6px;
  }
`;
const UserInfo = styled.div`
  width: 242px;
  display: flex;
  margin-top: 2px;
  margin-left: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 100px;
  }
  
  @media (max-width: 600px) {
    width: 100px;
    font-size: 10px;
    margin: -12px 0 0 6px;
  }
`;
const UserNickname = styled.text`
  margin-left: 5.3px;
  font-family: notosans_regular;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;  
  @media (max-width: 600px) {
    font-size: 8px;
    margin: auto 0 auto 6px;
  }
`;

const UserPic = styled.img`
  border-radius: 10px;
  width: 17.6px;
  height: 17.6px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 210px;
    // margin: 13px;
  }
  
  @media (max-width: 600px) {
    width: 12px;
    height: 12px;
    font-size: 10px;
    margin: auto 0 auto 6px;
  }
`;

export default ReviewCard;

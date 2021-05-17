import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";

import styled from "styled-components";

const ReviewCard = (props) => {
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
    // transition-property: box-shadow;
    // transition-duration: 0.15s;
    // transition-timing-function: ease-out;
    // transition-delay: 0s;
    // letter-spacing: 0px;
    // -webkit-font-smoothing: antialiased;
    // overflow-anchor: none;
    // box-shadow: inset 0 0 0 1px rgb(0 0 0 / 16%);
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
    transition: box-shadow .15s ease-out;
    padding-bottom: 5px;
    box-sizing: border-box;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    overflow-anchor: none;
    // filter: drop-shadow(-0.3px 0 0.2rem gray);
    // transition-duration: 0.15s;
    // transition-timing-function: ease-out;
    // transition-delay: 0s;
  }
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 320px;
    height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 165px;
    height: 210px;
    margin: 6px;
    border-radius: 10px;
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
    width: 320px;
    height: 210px;
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
    margin: -3px 0 0 6px;
  }
`;
const UserInfo = styled.div`
  position: absolute;
  width: 242px;
  display: flex;
  margin-top: 2px;
  margin-left: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 210px;
    // margin: 13px;
  }
  
  @media (max-width: 600px) {
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
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 210px;
    // margin: 13px;
  }
  
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

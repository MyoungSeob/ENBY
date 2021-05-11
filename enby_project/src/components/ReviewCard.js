import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'

import styled from 'styled-components';

const ReviewCard=(props)=>{
    const move_page =()=>{
        history.push(`/board/review/${props.review_id}`)
    }
    return(
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardImage src={props.review_imgUrl}/>
                <CardTit>
                    <CardTitH>{props.title}</CardTitH>
                </CardTit>
                <Arrow src={require("../shared/image/arrow.png").default} />
                <UserInfo>
                    <UserPic src = {props.profile_Img} />
                    <UserNickname>
                        {props.nickname}
                    </UserNickname>
                </UserInfo>
            </CardGrid>
        </React.Fragment>
    )
}
const CardGrid = styled.div`
    // width: 460px;
    // height: 601px;

    display: block;
  float: left;
  width: 378.87px;
  height: 495px;
  margin: 0 15px 79px auto;
  border: 1px solid #eee;
  cursor: pointer;
  background: #FFFFFF;
  justify-content: space-between;
  &:hover {
    transition-property: box-shadow;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    overflow-anchor: none;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 16%);
  }
`;

const CardImage = styled.img`
    // position: absolute;
    width: 378.87px;
    height: 378.87px;
    // left: 218px;
    // top: 501px;

    // border-radius: 0px;
    // width: 338px;
    // height: 221.49px;
    objectFit: cover;
`;

const CardTit = styled.div`
display: block;
  width: 308px;
  height: 40px;
  margin: 21.13px 0 0 0;

`;
const CardTitH = styled.div`
color: #000000;
  width: 100%;
  font-family: notosans_bold;
  font-size: 24px;
  margin: 0 0 0 21px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const Arrow = styled.img`
    margin: 0 21.41px 61px 0;
    float: right;
`;

const UserInfo = styled.div`
display: flex;
margin-top: 9px;
`;
const UserNickname = styled.text`
margin-left: 26px;
font-family: notosans_regular;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 26px;
`;
const UserPic = styled.img`
margin-left: 26px;
border-radius: 30px;
width: 24px;
height: 24px;
`;

export default ReviewCard;
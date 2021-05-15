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
    display: block;
  float: left;
  width: 282px;
  height: 330px;
//   margin: 0 15px 79px auto;
  border: 1px solid #eee;
  border-radius : 20px;
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
  border-radius: 20px;
`;

const CardImage = styled.img`
    // position: absolute;
    width: 282px;
    height: 242px;
    // left: 218px;
    // top: 501px;
    border-radius : 20px 20px 0 0;
    // border-radius: 0px;
    // width: 338px;
    // height: 221.49px;
    objectFit: cover;
    border-radius: 20px 20px 0 0;
`;

const CardTit = styled.div`
display: block;
  width: 242px;
  height: 27px;
  margin: 17px 20px 2px 20px;

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

const Arrow = styled.img`
    // margin: 0 21.41px 61px 0;
    // float: right;
`;

const UserInfo = styled.div`
position: absolute;
display: flex;
margin-top: 2px;
margin-left: 20px;
`;
const UserNickname = styled.text`
margin-left: 5.3px;
font-family: notosans_regular;
font-style: normal;
font-weight: normal;
font-size: 12px;
`;

const UserPic = styled.img`
margin-left: 20px;
border-radius: 10px;
width: 17.6px;
height: 17.6px;
`;

export default ReviewCard;
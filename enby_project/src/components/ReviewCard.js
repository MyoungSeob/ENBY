import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'

import styled from 'styled-components';

const ReviewCard=(props)=>{
    const move_page =()=>{
        history.push(`/board/review/${props.review_id}`)
    }
    const review_list = useSelector((store)=> store.post.review_list)
    console.log(props);
    return(
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardImage src={props.review_imgUrl}/>
                <CardTit>
                    {props.title}
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
    // width: 460px;
    // height: 601px;

    display: block;
  float: left;
  width: 380px;
  height: 542px;
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
    // box-sizing: border-box;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased;
    overflow-anchor: none;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 16%);
  }
`;

const CardImage = styled.img`
    // position: absolute;
    width: 380px;
    height: 400px;
    // left: 218px;
    // top: 501px;

    // border-radius: 0px;
    // width: 338px;
    // height: 221.49px;
    objectFit: cover;
`;

const CardTit = styled.text`
    font-family: notosans_regular;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 41px;
    /* identical to box height */
    color: #000000;
    margin: 26px;

`;
const UserInfo = styled.div`
display: flex;
`;
const UserNickname = styled.text`
margin-top: 13px;
margin-left: 26px;
font-family: notosans_regular;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 26px;
`;
const UserPic = styled.img`
margin-top: 13px;
margin-left: 26px;
border-radius: 30px;
width: 24px;
height: 24px;
`;

export default ReviewCard;
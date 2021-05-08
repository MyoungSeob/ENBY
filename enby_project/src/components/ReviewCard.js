import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'

import styled from 'styled-components';

const ReviewCard=(props)=>{
    const move_page =()=>{
        history.push(`/board/review/${props.board_id}`)
    }
    const review_list = useSelector((store)=> store.post.review_list)
    console.log(props);
    return(
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardImage src={props.review_imgUrl}/>
                <CardTit>
                    {props.contents}
                </CardTit>
                <UserNickname>
                    {props.nickname}
                </UserNickname>
                <UserPic src = {props.profile_Img} />
            </CardGrid>
        </React.Fragment>
    )
}
const CardGrid = styled.div`
    position: absolute;
    width: 460px;
    height: 601px;
    left: 218px;
    top: 501px;
    cursor: pointer;
    background: #FFFFFF;
`;

const CardImage = styled.img`
    // position: absolute;
    width: 460px;
    height: 460px;
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
    font-size: 28px;
    line-height: 41px;
    /* identical to box height */

    color: #000000;
    margin: 26px;
`;
const UserNickname = styled.text``;
const UserPic = styled.img``;

export default ReviewCard;
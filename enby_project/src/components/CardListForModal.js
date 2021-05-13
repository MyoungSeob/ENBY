// 모달 리뷰 카드 리스트
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewCard from './ReviewCard';
import {actionsCreators as postActions} from '../redux/modules/post'
import CardForModal from './CardForModal';

import {actionsCreators as userActions} from '../redux/modules/user'
import jwt_decode from 'jwt-decode';

const ReviewCardList =(props)=>{
    console.log(props);
    // 참여했던 모임
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    const apply_list = useSelector((store) => store.user.apply_list)
    const empty_list = apply_list.length === 0? true : false;
    console.log(apply_list);
    useEffect(() => {
        dispatch(userActions.getMyProfileDB(name))
        // setPosts(review_list); // for pagination
        ;
      }, []);

    return(
        <ListBody>
            <PostList>
                {props.apply_list.map((p)=>{
                    return <CardForModal {...p} key={p.id}/>
                })}
            
            </PostList>
        </ListBody>
    );
}
const ListBody = styled.div`
padding: 5px;

`
const PostList = styled.div`
display: flex;

`;

export default ReviewCardList
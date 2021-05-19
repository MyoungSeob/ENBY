import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewCard from './ReviewCard';
import {actionsCreators as postActions} from '../redux/modules/post'

const ReviewCardList =(props)=>{
    const dispatch = useDispatch();
    const review_list = useSelector((store) => store.post.review_list)

    useEffect(() => {
        dispatch(postActions.getPostReviewDB())
    }, [dispatch])

    return(
        <ListBody>
            <PostList>
                {props.review_list.map((p)=>{
                    return <ReviewCard {...p} key={p.id}/>
                })}
            
            </PostList>
        </ListBody>
    );
}
const ListBody = styled.div`
    
`
const PostList = styled.div`
padding: 0;
margin: 0;
max-width: 1200px;
width: 100%;
@media (max-width: 600px) {
    margin-left: 5px;
    width: 400px;
  }
`;

export default ReviewCardList
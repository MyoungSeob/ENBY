import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import ReviewCard from './ReviewCard';
import {actionsCreators as postActions} from '../redux/modules/post'

const ReviewCardList =(props)=>{
    const dispatch = useDispatch();
    const review_list = useSelector((store) => store.post.review_list)
    console.log(review_list);

    useEffect(() => {
        dispatch(postActions.getPostReviewDB())
    }, [dispatch])
    
    return(
        <ListBody>
            <PostList>
                {review_list.map((p)=>{
                    return <ReviewCard {...p} key={p.id}/>
                })}
            
            </PostList>
        </ListBody>
    );
}
const ListBody = styled.div``
const PostList = styled.div``;

export default ReviewCardList
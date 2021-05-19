import React, { useEffect } from 'react';

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card';
import {actionsCreators as postActions} from '../redux/modules/post'

const CardList =(props)=>{
    const dispatch = useDispatch();

    const post_list = useSelector((store) => store.post.list)
    useEffect(()=>{
        dispatch(postActions.getPostMainDB())
    }, [dispatch])
    const showReviewCard=()=>{
        if(props.allMoim){
            return (props.all_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
        if(props.isDeadline){
            return (props.dead_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
        if(props.isNotDeadline){
            return (props.not_dead_post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            }))
        }
    }
    return (
      <ListBody>
        <PostList>
        {showReviewCard()}
        </PostList>
      </ListBody>
    );
}
const ListBody = styled.div`
    text-align : center;
    width: 100%;
    max-width: 1200px;
    margin: 100px auto 0 auto;
    @media (min-width: 600px) and (max-width: 1170px) {
        max-width: 800px; 
      }
`
const PostList = styled.div`
display : flex;
// justify-content : space-between;
flex-wrap : wrap;
padding: 0;
max-width: 1200px;
width: 100%;
@media (min-width: 600px) and (max-width: 1170px) {
    max-width: 800px; 
  }
@media (max-width: 600px) {
    margin-left: 10px;
    max-width: 400px;
    width: 100%;
  }
`

export default CardList;
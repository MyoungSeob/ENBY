import React, { useEffect } from 'react';

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import Card from './Card';
import {actionsCreators as postActions} from '../redux/modules/post'

const CardList =(props)=>{
    const dispatch = useDispatch();

    const post_list = useSelector((store) => store.post.list)
    const apply_list = useSelector((store) => store.post.apply_list)
    // const post_list = useSelector((store)=> store.post.detail_list)
    console.log(props);
    console.log(post_list);
    const id = post_list.id
    useEffect(()=>{
        dispatch(postActions.getPostMainDB())
        dispatch(postActions.getPostDetailDB(id))
    }, [dispatch])

    return (
      <ListBody>
        <PostList>
            {post_list.map((p)=>{
                return <Card {...p} key={p.id}/>
            })}
          
        </PostList>
      </ListBody>
    );
}
const ListBody = styled.div`
    text-align : center;
    width: 1200px;
    // max-width: 1200px;
    margin: 100px auto 0 auto;
    // margin: 0 auto;
`
const PostList = styled.ul`

padding: 0;
margin: 0;
width: 100%;
`

export default CardList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionsCreators as postActions} from '../redux/modules/post'

const MatingDetail = (props) => {
    const id = props.match.params.id;
    console.log(id)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(postActions.getPostDetailDB(id))
    }, [id]);
    const post_list = useSelector((store)=> store.post.detail_list)
    const data = post_list
    
    console.log(post_list)

    return(
        <React.Fragment>
            <div>{data.title}</div>
            <div><p>{data.meetTime}</p></div>
            <div><p>{data.location}</p></div>
            <div><img src={data.board_imgUrl}></img></div>
            <div><p>{data.contents}</p></div>
            <button>수정/삭제</button>

        </React.Fragment>
    )
}

export default MatingDetail;
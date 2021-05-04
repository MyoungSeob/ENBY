import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'

const Card =(props)=>{
    console.log(props);
    // const post_list = useSelector((store)=> store.post.detail_list)
    // console.log(post_list);
    const move_page =()=>{
        history.push(`/board/mating/${props.id}`)
    }
    
    return (
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardTit>
                    <h3>{props.title}</h3>
                </CardTit>
                <CardBody>
                    <img src={props.board_imgUrl} />
                    <p>{props.contents}</p>
                    <p>{props.location}</p>
                    <p>{props.boardimg}</p>
                    <p>{props.meetTime}</p>
                </CardBody>
            </CardGrid>
        </React.Fragment>
    )
}
const CardGrid = styled.div`
    float : left;
    width : 250px;
    height : 311px;
    // background-color : gray;
    margin : 20px;
    border: solid 1px #eee;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        transition-property: box-shadow;
        transition-duration: 0.15s;
        transition-timing-function: ease-out;
        transition-delay: 0s;
        box-sizing: border-box;
        letter-spacing: 0px;
        -webkit-font-smoothing: antialiased;
        overflow-anchor: none;
        box-shadow: inset 0 0 0 1px rgb(0 0 0 / 16%);
    }
`

const CardTit = styled.div`
    width : 100%;
    height : 10%;
    text-align : center;
`
const CardBody = styled.div`
    width : 100%;
    hegith : 90%;
    text-align : center;
`
export default Card;
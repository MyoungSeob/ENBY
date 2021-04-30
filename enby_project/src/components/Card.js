import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'

const Card =(props)=>{
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
    width : 150px;
    height : 200px;
    background-color : gray;
    margin : 20px;
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
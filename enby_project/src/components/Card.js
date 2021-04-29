import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as postActions} from '../redux/modules/post'

const Card =(props)=>{
    

    return (
        <React.Fragment>
            <CardGrid>
                <CardTit>
                    <h3>{props.title}</h3>
                </CardTit>
                <CardBody>
                    <p>{props.contents}</p>
                    <p>{props.location}</p>
                    <p>{props.boradimg}</p>
                    <p>{props.meetTime}</p>
                </CardBody>
            </CardGrid>
        </React.Fragment>
    )
}
const CardGrid = styled.div`
    width : 150px;
    height : 200px;
    background-color : gray;
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
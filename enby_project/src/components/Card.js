import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'
import { CardImg } from 'react-bootstrap';

const Card =(props)=>{
    console.log(props);
    const post_list = useSelector((store)=> store.post.detail_list)
    console.log(post_list);
    const move_page =()=>{
        history.push(`/board/mating/${props.id}`)
    }

    // isoString to JS date type
    // 현재 날짜 보여주는 형식 별로 안이쁨
    const date = new Date(props.meetTime);
    const meetTime = (date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' + ' ' + ' ' + date.getHours() + '시' + date.getMinutes() + '분');
    console.log(props.board_imgUrl);
    return (
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardImage>
                    <img style={{width: "338px", height: "221.49px", objectFit: "cover"}}src={props.board_imgUrl} />
                </CardImage>
                <CardTit>
                    <h3>{props.title}</h3>
                </CardTit>
                <Line />
                <CardBody>
                    <p><img style={{padding:"0px 24px"}} src={require("../shared/image/place.png").default}/>{props.location}</p>
                    <p><img style={{padding:"0px 24px", width:"40px", height:"32px"}} src={require("../shared/image/date.png").default}/>{meetTime}</p>
                    <p><img style={{padding:"0px 24px"}} src={require("../shared/image/person.png").default}/></p>
                </CardBody>
            </CardGrid>
        </React.Fragment>
    )
}

const CardImage = styled.div`
    
`;

const CardGrid = styled.div`
    float : left;
    width : 460px;
    height : 673px;
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

const Line = styled.div`
    border-bottom: 1px solid #C4C4C4;
    width: 385px;
    height: 1px;
    position: absolute;
    margin: 0px 36px;
`;

const CardBody = styled.div`
    width : 100%;
    hegith : 90%;
    text-align : left;
    
`
export default Card;
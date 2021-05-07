import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {actionsCreators as postActions} from '../redux/modules/post'
import { history } from '../redux/configStore'
import { CardImg } from 'react-bootstrap';
import Detail from '../components/Detail';

const Card =(props)=>{
    console.log(props);
    const post_list = useSelector((store)=> store.post.detail_list)
    const apply_list = useSelector((store) => store.post.apply_list);
    console.log(apply_list);
    console.log(post_list);
    const move_page =()=>{
        history.push(`/board/mating/${props.id}`)
    }
    // isoString to JS date type
    // 현재 날짜 보여주는 형식 별로 안이쁨
    const date = new Date(props.meetTime);
    const meetTime = (date.getFullYear()+'년' + (date.getMonth()+1) + '월'+date.getDate() + '일' + ','+ ' ' + ' ' + date.getHours() + '시' + date.getMinutes() + '분');
    console.log(props.board_imgUrl);
    return (
        <React.Fragment>
            <CardGrid onClick={move_page}>
                <CardImage src={props.board_imgUrl} />
                <CardTit>
                    <h3>{props.title}</h3>
                </CardTit>
                <Line />
                <CardBody>
                    <p><img style={{padding:"0px 24px"}} src={require("../shared/image/place.png").default}/>{props.location}</p>
                    <p><img style={{padding:"0px 24px", width:"40px", height:"32px"}} src={require("../shared/image/date.png").default}/>{meetTime}</p>
                    <p><img style={{padding:"0px 24px"}} src={require("../shared/image/person.png").default}/>{post_list.people_count} / {post_list.people_max}</p>
                    <button>신청하기</button>
                </CardBody>
            </CardGrid>
        </React.Fragment>
    )
}

const CardImage = styled.img`
    width: 338px;
    height: 221.49px;
    objectFit: cover;
`;

const CardGrid = styled.div`
// position: absolute;
// width: 380px;
// height: 578px;
// left: 360px;
// top: 1098px;
    float : left;
    width : 460px;
    height : 673px;
    margin : 20px;
    border: solid 1px #eee;
    border-radius: 6px;
    cursor: pointer;
    
    &:hover {
        transition-property: box-shadow;
        transition-duration: 0.15s;
        transition-timing-function: ease-out;
        transition-delay: 0s;
        // box-sizing: border-box;
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
    & h3{
        margin: 20px 40px;
        position: absolute;
        // width: 179px;
        // height: 29px;
        // left: 796px;
        // top: 1378px;

        font-family: notosans_regular;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 35px;

        color: #000000;

    }
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
    & button{
        margin: 40px;
        position: absolute;
        width: 167px;
        height: 40px;
        

        background: #F1B100;
        border-radius: 20px;
        border: 0;

        position: absolute;
        cursor: pointer;

        font-family : notosans_regular;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
        /* identical to box height, or 27px */
        text-align: center;

        color: #392600;


    }
    
`
export default Card;
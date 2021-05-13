// 마이페이지 페이지네이션을 위한 작성한글 리스트

import React, { useEffect } from 'react';

import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {actionsCreators as userActions} from '../redux/modules/user'
import Wrote from '../components/Wrote';


const ListForMyPage1 =(props)=>{
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    const write_list = useSelector((store) => store.user.write_list)

    useEffect(() => {
        dispatch(userActions.getMyProfileDB(name));
      }, []);


    return (
        <Container>
            <CardBox>
                {props.write_list.map((p)=>{
                return <Wrote key={p.id} {...p}/>})}
            </CardBox>
        </Container>
    );}

const Container = styled.div`
    width : 100%;
`
const CardBox = styled.div`
    margin-bottom: 70px;
`;

export default ListForMyPage1;
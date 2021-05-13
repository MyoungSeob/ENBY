// 마이페이지 페이지네이션을 위한 참여했던 모임 리스트

import React, { useEffect } from 'react';

import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {actionsCreators as userActions} from '../redux/modules/user'
import Card from '../components/Card';



const ListForMyPage2 =(props)=>{
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    console.log(decode)
    const attend_list = useSelector((store) => store.user.attend_list)
    console.log(props);
    useEffect(() => {
        dispatch(userActions.getMyProfileDB(name));
      }, []);


    return (
        <Container>
            <AttendBox>
                <CardBox>
                    {props.attend_list.map((p)=>{
                    return <Card key={p.id} {...p} />;
                    })}
                </CardBox>
            </AttendBox>
        </Container>
    );}

const Container = styled.div`
    width: 100%;
`;
const CardBox = styled.div`
  width: 1200px;
  height: 100%;
  float: left;
  margin: 75px auto 0 auto;
`;

const AttendBox = styled.div`
    width : 1200px;
    margin : 0 auto 0 auto;
`

export default ListForMyPage2;
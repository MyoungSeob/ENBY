// 마이페이지 페이지네이션을 위한 신청한 모임 리스트

import React, { useEffect } from 'react';

import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {actionsCreators as userActions} from '../redux/modules/user'
import Card from '../components/Card';


const ListForMyPage3 =(props)=>{
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    const apply_list = useSelector((store) => store.user.apply_list)
    useEffect(() => {
        dispatch(userActions.getMyProfileDB(name));
      }, []);


    return (
        <Container>
            <ApplyBox>
                <CardBox>
                    {props.apply_list.map((p) => {
                        return <Card key={p.id} {...p}/>
                    })}
                </CardBox>
            </ApplyBox>
        </Container>
    );}

const Container = styled.div`
    width: 100%;
    margin-top: -60px;
`;
const CardBox = styled.div`
width: 100%;
  max-width: 1200px;
  height: 100%;
  float: left;
//   margin: 75px auto 158px auto;
`;

const ApplyBox = styled.div`
    display : block;
    width: 100%;
    max-width : 1200px;
    margin : 74px auto 70px auto;
`

export default ListForMyPage3;
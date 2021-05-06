import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PermitApply from './PermitApply';
import jwt_decode from 'jwt-decode';

const PermitApplyList=(props)=>{
    const regist_list = useSelector((store) => store.post.apply_list)
    const token = localStorage.getItem("token")
    const decode = jwt_decode(token)

    const regist = [];
    const writer = [];
    for(let i = 0; i < regist_list.length; i++){
        if(regist_list[i].nickname !== decode.nickname){
            regist.push(regist_list[i])
        } 
    }
    console.log(regist)
    return (
      <Container>
        <Title>
          <ApplyTit>Application</ApplyTit>
          {regist.length > 1 ? <DeadLineBtn>신청 마감하기</DeadLineBtn> : ("")}
        </Title>
        <Notice><NoticeTit>아직 신청한 사람이 없습니다.</NoticeTit></Notice>
        {regist.map((p) => {
          return <PermitApply key={p.id} {...p} />;
        })}
      </Container>
    );
}
const Container = styled.div``
const Title = styled.div`
    display : flex;
`
const DeadLineBtn = styled.button`
width: 167px;
height: 40px;
font-size : 18px;
font-family : notosans_regular;
border : none;
border-radius : 20px;
outline : none;
background-color : #F1B100;
padding-bottom : 2px;
cursor : pointer;
margin-left : 80px;
`
const ApplyTit = styled.h2`
    margin-top : 5px;
    font-family : seravek;
    font-size : 28px;
    font-style : italic;
`
const Notice = styled.div`
    text-align : center;
    padding : 40px 0 40px 0;
`
const NoticeTit = styled.h1`
    font-size : 28px;
    font-family : notosans_bold;
    color : #B9B9B9;
    margin : 0;
`

export default PermitApplyList;
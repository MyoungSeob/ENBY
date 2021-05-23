// 멤버카드를 리덕스에 저장되어있는 신청목록을 map을 이용하여 나열하는 컴포넌트입니다.
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MemberCard from './MemberCard';

const MemberCardList=(props)=>{
    //리덕스에 저장된 해당 게시글의 신청목록입니다.
    const regist_list = useSelector((store) => store.post.apply_list)
    return(
        <Container>
            <Title><Tit>Members</Tit></Title>
            <CardBox>
            {regist_list.map((p) => {
                return <MemberCard key={p.id} {...p} />
            })}
            </CardBox>
        </Container>
    )
}
const Container = styled.div`
    max-width : 1200px;
    width: 100%;
    height: 288px;
    @media (max-width: 600px) {
        height : auto;
    }

`
const Title = styled.div`
    padding-top : 50px;
    margin-bottom : 34px;
    @media (max-width: 600px) {
        padding-top : 34px;
        margin: auto;
    }
`
const Tit = styled.h2`
    margin : 0;
    font-size : 28px;
    font-family : seravek;
    font-style : italic;
    @media (max-width: 600px) {
    font-size: 21px;
    margin-bottom: 20px;
   }
`
const CardBox = styled.div`
    display : flex;
`

export default MemberCardList;
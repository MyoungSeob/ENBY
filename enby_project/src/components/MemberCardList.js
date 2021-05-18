import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MemberCard from './MemberCard';

const MemberCardList=(props)=>{
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
        margin-left : 32px;
    }

`
const Title = styled.div`
    padding-top : 50px;
    margin-bottom : 34px;
    @media (max-width: 600px) {
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
   }
`
const CardBox = styled.div`
    display : flex;
`

export default MemberCardList;
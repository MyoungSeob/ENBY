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
    width : 1200px;
`
const Title = styled.div`
    margin-bottom : 34px;
`
const Tit = styled.h2`
    font-size : 28px;
    font-family : seravek;
    font-style : italic;
`
const CardBox = styled.div`
    display : flex;
`

export default MemberCardList;
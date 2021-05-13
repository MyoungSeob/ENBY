import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Loading from './Loading';
import ReviewCard from './ReviewCard';

const ReviewBox = (props) => {
    const loading = useSelector(store => store.post.loading)
    const review_card_list = useSelector(store => store.post.review_card)
    
    const isReviewCard =()=>{
        if(review_card_list.length === 0){
            return <Notice>아직 작성된 후기가 없습니다.</Notice>
        }else{
            return review_card_list.map((p) => {
                return <ReviewCard key={p.id} {...p} />;
              })
        }
    }

    if(loading){
        <Loading />
    }{
    return (
      <Container>
        <TitleBox>
          <TitleContents>
            <SubTitle>주최자의 다른 모임 후기가 궁금하다면?</SubTitle>
            <Title>Reviews</Title>
          </TitleContents>
          <MoreReviewBtn>
            <MoveReviewBoard>더보기</MoveReviewBoard>
          </MoreReviewBtn>
        </TitleBox>
        <CardListBox>
          {isReviewCard()}
        </CardListBox>
      </Container>
    );
}
}
const Container = styled.div`
    width : 100%;
`
const TitleBox = styled.div`
    width : 1200px;
    display : flex;
    margin : auto auto 40px auto;

`
const TitleContents = styled.div`
width : 1200px;
margin : auto;
float: left;

`;
const SubTitle = styled.p`
    margin : 0px;
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
`
const Title = styled.h2`
    margin : 5px 0px;
    font-family : seravek;
    font-size : 28px;
    font-style : italic;
`
const MoreReviewBtn = styled.div`
`
const MoveReviewBoard = styled.button`
    margin-top : 20px;
    border : 1px solid #000000;
    width : 167px;
    height : 40px;
    border-radius : 20px;
    font-family : notosans_regular;
    font-size : 18px;
    background-color : #ffffff;
`
const CardListBox = styled.div`
width : 1200px;
margin : auto;
display : block;

`
const Notice = styled.p`
    text-align : center;
    font-family : notosans_regular;
    font-size : 18px;
    color : #b9b9b9;
    margin-bottom : 150px;
`
const BottomGrid = styled.div`
    width : 100%;
    height : 900px;
    background-color : #333333;
    display : block;
    margin : auto;
    bottom : 0px;
    position : absolute;
`
export default ReviewBox
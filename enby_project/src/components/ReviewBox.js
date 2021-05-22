// MatingDetail에서 리뷰카드들이 들어있는 컴포넌트입니다.
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import Loading from './Loading';
import ReviewCard from './ReviewCard';

const ReviewBox = (props) => {
  // 리뷰카드 목록을 불러오는 동안 사용 될 로딩여부를 불러옵니다.
    const loading = useSelector(store => store.post.loading)
    // redux에 저장되어있는 리뷰카드들입니다.
    const review_card_list = useSelector(store => store.post.review_card)
    // 해당 주최자가 주최했던 모임들에 대한 리뷰가 있는지 없는지에 대한 코드입니다. 있다면 카드들을 불러오고, 없다면 후기가 없다는 내용을 나타냅니다.
    const isReviewCard =()=>{
        if(review_card_list.length === 0){
            return <Notice>아직 작성된 후기가 없습니다.</Notice>
        }else{
            return review_card_list.map((p) => {
                return <ReviewCard key={p.id} {...p} />;
              })
        }
    }
    // 리뷰게시판으로 이동하는 코드입니다.
    const moveReview=()=>{
      history.push('/board/review')
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
            <MoveReviewBoard onClick={moveReview}>더보기</MoveReviewBoard>
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
    @media (max-width: 600px) {
      margin-left: 12.5px;
      width : 375px;
         }
`
const TitleBox = styled.div`
    width: 100%;
    max-width : 1200px;
    display : flex;
    margin : auto auto 40px auto;

`
const TitleContents = styled.div`
width: 100%;
max-width : 1200px;
margin : auto;
float: left;

`;
const SubTitle = styled.p`
    margin : 0px;
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
    @media (max-width: 600px) {
      font-size: 11px;
         }
`
const Title = styled.h2`
    margin : 5px 0px;
    font-family : seravek;
    font-size : 28px;
    font-style : italic;
    @media (max-width: 600px) {
      font-size: 21px;
         }
`
const MoreReviewBtn = styled.div`
@media (min-width: 600px) and (max-width: 1170px) {
  margin-right: 8px;
}
`
const MoveReviewBoard = styled.button`
  margin-top: 20px;
  border: 1px solid #808080;
  width: 167px;
  height: 40px;
  border-radius: 20px;
  font-family: notosans_regular;
  font-size: 18px;
  background-color: #ffffff;
  cursor: pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-right: 24px;
  }
  @media (max-width: 600px) {
    width: 60px;
    height: 30px;
    font-size: 11px;
    margin-right: 24px;
  }
  &: hover {
    border: none;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
    background-color: #bbcfdc;
    color: #ffffff;
  }
`;
const CardListBox = styled.div`
width: 100%;
max-width : 1200px;
margin : auto;
display : block;
margin-bottom: 150px;
@media (max-width: 600px) {
  margin-right: 30px;
  margin-bottom : 34px;
     }
`
const Notice = styled.p`
    text-align : center;
    font-family : notosans_regular;
    font-size : 18px;
    color : #b9b9b9;
    margin-bottom : 150px;
    @media (max-width: 600px) {
      margin-right: 30px;
      margin-bottom : 54px;
         }
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
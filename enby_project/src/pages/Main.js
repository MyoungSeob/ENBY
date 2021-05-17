import React, { useEffect } from 'react'
import CardList from '../components/CardList'
import Carousel from '../components/Carousel'
import styled from 'styled-components'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as postActions} from '../redux/modules/post'
import Card from '../components/Card';
import ReviewCard from '../components/ReviewCard';
import { history } from "../redux/configStore";
import jwt_decode from "jwt-decode";
import { generateMedia } from 'styled-media-query';



const Main =(props)=>{
  const dispatch = useDispatch();
  const post_list = useSelector((store) => store.post.list)
  const review_list = useSelector((store) => store.post.review_list)
  const review_lst = review_list.slice(0,4)
  const post_lst = post_list.slice(0,4)

  useEffect(()=>{
    dispatch(postActions.getPostMainDB())
    dispatch(postActions.getPostReviewDB())
  }, [dispatch])

    return (
      <Container>
        <Box>
        <CarouselBox>
          <Carousel />
        </CarouselBox>
        </Box>
        <PostText>
          <span>
            <PostTitle>새로운 모임</PostTitle>
            <PostButton
              onClick={() => {
                history.push("/board/mating/");
              }}
            >
              더보기
            </PostButton>
          </span>
        </PostText>
        <PostList>
          {post_lst.map((p) => {
            return <Card {...p} key={p.id} />;
          })}
        </PostList>
        <ReviewText>
          
          <Span>
          <ReviewTitle>후기글</ReviewTitle>
            <ReviewButton
              onClick={() => {
                history.push("/board/review");
              }}
            >
              더보기
            </ReviewButton>
          </Span>
        </ReviewText>
        <ReviewList>
          {review_lst.map((p) => {
            return <ReviewCard {...p} key={p.id} />;
          })}
        </ReviewList>
      </Container>
    );
}
const Container = styled.div`
display : block;
`
const Box = styled.div`
  width : 100%;
  margin : auto;
`
const CarouselBox = styled.div`
  width : auto;
  height : 520px;
  margin : auto;
  @media (max-width: 600px) {
    height: 320px;
  }
`
const PostList = styled.div`
  display : flex;
  // justify-content : space-between;
  margin: 34px auto -35px auto;
  justify-content : space-around;
  // margin: 34px auto auto auto;
  width: 1200px;
  @media (max-width: 600px) {
    justify-content: left;
    margin-left: 10px;
  }
`
const PostText = styled.div`
width : 1200px;
margin : 100px auto auto auto;
& span {
  display: flex;
}
@media (max-width: 600px) {
  margin-top: -60px;
  margin-left: 12px;
  margin-bottom: -20px;
}
`;
const PostSubTitle = styled.div`
    margin: 132px 0px 0px 0px;
    font-family: notosans_regular;
    font-style: normal;
    font-size: 18px;
    line-height: 150%;
    color: #474747;
    @media (max-width: 600px) {
      font-size: 8px;
      margin-bottom: -8px;
    }
`;
const PostTitle = styled.div`
    // margin-top: 13px;
    font-family: gmarketsans_medium;
    font-style: normal;
    float : left;
    font-size: 30px;
    line-height: 150%;
    color: #168ed9;
    @media (max-width: 600px) {
      font-size: 18px;
    }
`;

const PostButton = styled.button`
  font-size : 18px;
  font-family : notosans_regular;
  margin-left: 880px;
  width: 167px;
  height: 40px;
  border: 1px solid #000000;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-left: 180px;
    margin-top: 10px;
      width: 52px;
      height: 26px;
      font-size: 10px;
  }
`;

const ReviewText = styled.div`
  width : 1200px;
  margin : 21px auto auto auto;
  & span {
    display: flex;
  }
  @media (max-width: 600px) {
    margin-top: 50px auto auto;
    margin-left: 12px;
    margin-bottom: -20px;
  }
`;
const ReviewSubTitle =styled.text`
  margin: 21px 0px 0px 0px;
  // width: 290px;
  height: 23px;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #474747;

  @media (max-width: 600px) {
    font-size: 8px;
    margin-bottom: -8px;
  }
`;
const ReviewTitle = styled.text`
  // margin-top: 12px; 
  // width: 161px;
  height: 35px;
  font-family: gmarketsans_medium;
  color: #168ed9;
  font-style: normal;
  font-size: 28px;
  line-height: 150%;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-top: 7px;
  }
`;

const ReviewButton = styled.button`
  width: 167px;
  height: 40px;
  font-size : 18px;
  font-family : notosans_regular;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #FFFFFF;
  cursor: pointer;
  float : right;
  @media (max-width: 600px) {
    margin-left: 220px;
    margin-top: 10px;
      width: 52px;
      height: 26px;
      font-size: 10px;
  }
`;
const Span = styled.span`
  display : flex;
  justify-content : space-between;
  @media (max-width: 600px) {
    justify-content: left;
  }
`

const ReviewList =styled.div`
  display : flex;
  justify-content : space-around;
  margin: 34px auto 71px auto;
  width: 1200px;
  @media (max-width: 600px) {
    justify-content: left;
    margin-left: 10px;
  }
`;

export default Main;

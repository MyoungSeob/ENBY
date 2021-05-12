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


const Main =(props)=>{
  const dispatch = useDispatch();
  const post_list = useSelector((store) => store.post.list)
  const review_list = useSelector((store) => store.post.review_list)
  const review_lst = review_list.slice(0,3)
  const post_lst = post_list.slice(0,3)
  const id = post_list.id

  useEffect(()=>{
    dispatch(postActions.getPostMainDB())
    dispatch(postActions.getPostReviewDB())
  }, [dispatch])

    return (
      <Container>
        <Carousel />
          <PostText>
            <PostSubTitle>새로운 모임을 확인하고 싶다면</PostSubTitle>
            <span><PostTitle>새로운 모임</PostTitle>
            <PostButton onClick={() => {
            history.push("/board/mating/");
          }}>
            더보기
            </PostButton></span>
          </PostText>
          <PostList>
            {post_lst.map((p)=>{
                    return <Card {...p} key={p.id}/>
                })}
          </PostList>
          <ReviewText>
            <ReviewSubTitle>메이트들의 ENBY 경험을 알고싶다면? </ReviewSubTitle>
            <span>
              <ReviewTitle>모임 후기글</ReviewTitle>
              <ReviewButton onClick={() => {
            history.push("/board/review");
          }}>
                더보기
              </ReviewButton>
            </span>
          </ReviewText>
          <ReviewList>
            {review_lst.map((p)=>{
                      return <ReviewCard {...p} key={p.id}/>
                  })}
          </ReviewList>
      </Container>
    );
}
const Container = styled.div`
  width : 1200px;
  margin : 0 auto 0 auto;
`
const PostList = styled.ul`
  margin-top: 77px;
  padding: 0;
  width: 100%;
  margin-left: 10px;
`
const PostText = styled.div`
& span {
  display: flex;
}
`;
const PostSubTitle = styled.div`
    margin: 132px 0px 0px 0px;
    font-family: notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
    color: #474747;
`;
const PostTitle = styled.div`
    margin-top: 13px;
    font-family: notosans_regular;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 150%;
    color: #000000;
`;

const PostButton = styled.button`

  margin-left: 877px;
  width: 167px;
  height: 40px;
  border: 1px solid #000000;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
`;

const ReviewText = styled.div`
  & span {
    display: flex;
  }
`;
const ReviewSubTitle =styled.text`
  margin: 225px 0px 0px 0px;
  // width: 290px;
  height: 23px;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #474747;
`;
const ReviewTitle = styled.text`
  margin-top: 12px; 
  width: 161px;
  height: 35px;
  font-family: notosans_regular;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 150%;
  /* or 42px */

  color: #000000;
`;

const ReviewButton = styled.button`
  width: 167px;
  height: 40px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 20px;
  margin-left: 850px;
  background-color: #FFFFFF;
  cursor: pointer;
`;
const ReviewList =styled.ul`
  padding: 0;
  margin-top: 83px;
  width: 100%;
`;

export default Main;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../elements/Image'

import jwt_decode from "jwt-decode";

import styled from 'styled-components';
import { actionsCreators as postActions} from '../redux/modules/post'
import { history } from "../redux/configStore";




const ReviewDetail = (props) => {
  const token = localStorage.getItem('token')
  const decode = jwt_decode(token)
  const my_name = decode.nickname

    const review_detail = useSelector((store)=> store.post.review_detail);
    const review_createdAt = useSelector((store)=>store.post.time);    
    const review_id = props.match.params.id;

    const dispatch = useDispatch();
    
    const time = useSelector((store) => store.post.created_At);
    // const data = review_list.id
    // const createdBy = post_list.createdBy
    // console.log(data);

    useEffect(()=>{
        dispatch(postActions.getReviewDetailDB(review_id))
    }, [review_id]);

    const deletePost=()=>{
        if(window.confirm("게시글을 삭제하시겠습니까?") === true){
            dispatch(postActions.deletePostDB(review_id))
        }
    }

    const dateTime = parseInt(time[0]) + "년 " + parseInt(time[1]) + "월 " + parseInt(time[2]) + "일"

    const move_edit=()=>{
      if(my_name !== review_detail.nickname){
        window.alert('게시글 수정은 작성자만 수정할 수 있습니다.')
        return;
      }else{
        history.push("/review/edit/" + review_id )
      }
    }
    const moveReviewBoard=()=>{
      history.push('/board/review')
    }

    return (
      <Container>
        <TopBox>
          <ImageBox>
            <ImageBox_>
              <Image src={review_detail.review_imgUrl} />
            </ImageBox_>
          </ImageBox>
          <TitleBox>
            <TitleContents>
              <TitleDate>{time}</TitleDate>
              <TitleText>{review_detail.title}</TitleText>
            </TitleContents>
            <TitleButton onClick={moveReviewBoard}>
              <TitleBtnName>목록으로</TitleBtnName>
            </TitleButton>
          </TitleBox>
        </TopBox>
        <BottomBox>
          <ContentImage>
            <Image shape="contents" src={review_detail.review_imgUrl} />
          </ContentImage>

          <ContentsBox>
            <ContentsTit>
              <ContentsH>About</ContentsH>
            </ContentsTit>
            <Contents>
              <ContentsP>{review_detail.contents}</ContentsP>
            </Contents>
          </ContentsBox>
        </BottomBox>
        <MoveMoimButton>
          <Moim>원본 게시글 보기</Moim>
        </MoveMoimButton>

        <button onClick={move_edit}>수정</button>
        <button onClick={deletePost}>삭제</button>
      </Container>
    );
}

const Container = styled.div`
  display : block;
`
const TopBox = styled.div`
  width : 100%;
  margin : auto auto 60px auto;
`

const ImageBox = styled.div`
width : 100%;
height : 233px;
margin : auto;
overflow : hidden;
position : absolute;
`
const ImageBox_ =styled.div`
  width : auto;
  margin : auto;
  overflow : hidden;
  position : relative;
`


const TitleBox = styled.div`
  width : 1200px;
  height : 233px;
  margin : auto;
  display : block;
  position :relative;
  z-index : 1;
`
const TitleContents = styled.div`
  padding-top : 80px;
`
const TitleText = styled.h1`
  margin : auto;
  font-family : notosans_bold;
  font-size : 32px;
  float : left;
  color : #FFFFFF;
`
const TitleDate = styled.p`
  font-family : notosans_regular;
  font-size : 18px;
  margin : 0;
  color : #B9B9B9
`

const TitleButton = styled.div`
  border : 1px solid #FFFFFF;
  padding : 2px 48px 2px 48px;
  border-radius : 20px;
  float : right;
  cursor : pointer;
`
const TitleBtnName = styled.p`
  font-size : 18px;
  color : #FFFFFF;
  margin : 0;
`
const BottomBox = styled.div`
  width : 1200px;
  display : flex;
  margin : auto auto 30px auto;
`
const ContentImage = styled.div`
  width : 718px;
  margin : 0;
  display : block;
`
const ContentsBox = styled.div`
  width : 421px;
  height : 718px;
  margin : 0 auto auto 61px;
  display : block;
`
const ContentsTit = styled.div`
  display : block;
  margin-bottom : 34px;
`
const ContentsH = styled.h2`
  margin : 0;
  font-family : seravek;
  font-style : italic;
  font-size : 28px;
`
const Contents = styled.div``
const ContentsP = styled.p`
  font-family : notosans_regular;
  font-size : 18px;
  margin : 0;
`
const MoveMoimButton = styled.div`
  display : block;
  margin : auto auto 100px auto;
  width : 1200px;
`
const Moim = styled.button`
  width : 167px;
  height : 40px;
  border : 1px solid #000000;
  border-radius : 20px;
  font-family : notosans_regular;
  font-size : 18px;
  background-color : #FFFFFF;
`
export default ReviewDetail;

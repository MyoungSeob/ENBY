import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../elements/Image";

import jwt_decode from "jwt-decode";

import styled from "styled-components";
import { actionsCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";

const ReviewDetail = (props) => {
  
  const review_detail = useSelector((store) => store.post.review_detail);
  const review_createdAt = useSelector((store) => store.post.time);
  const review_id = props.match.params.id;

  const dispatch = useDispatch();

  const time = useSelector((store) => store.post.created_At);
  // const data = review_list.id
  const createdBy = review_detail.nickname;
  console.log(review_detail);
  // console.log(data);

  useEffect(() => {
    dispatch(postActions.getReviewDetailDB(review_id));
  }, [review_id]);

  const deletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?") === true) {
      dispatch(postActions.deletePostDB(review_id));
    }
  };

  const dateTime =
    parseInt(time[0]) +
    "년 " +
    parseInt(time[1]) +
    "월 " +
    parseInt(time[2]) +
    "일";

  
  const moveReviewBoard = () => {
    history.push("/board/review");
  };

  const is_login = () => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      const my_name = decode.nickname;

      const move_edit = () => {
        if (my_name !== review_detail.nickname) {
          window.alert("게시글 수정은 작성자만 수정할 수 있습니다.");
          return;
        } else {
          history.push("/review/write/" + review_id);
        }
      };

      return createdBy === decode.nickname ? (
        <EditButton>
          <EditBtn onClick={move_edit}>수정하기</EditBtn>
          <DeleteBtn onClick={deletePost}>삭제하기</DeleteBtn>
        </EditButton>
      ) : (
        ""
      );
    } else {
      return "";
    }
  };
  const moveMatingDetailBoard = ()=>{
    history.push('/board/mating/' + review_detail.board_id)
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
        </TitleBox>
        <ButtonBox>
          <TitleButton onClick={moveReviewBoard}>
            <TitleBtnName>목록으로</TitleBtnName>
          </TitleButton>
          {is_login()}
        </ButtonBox>
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
        <Moim onClick={moveMatingDetailBoard}>원본 모집글 보기</Moim>
      </MoveMoimButton>
    </Container>
  );
};

const Container = styled.div`
  display: block;
`;
const TopBox = styled.div`
  width: 100%;
  margin: auto auto 60px auto;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 233px;
  margin: auto;
  overflow: hidden;
  position: absolute;
`;
const ImageBox_ = styled.div`
  width: auto;
  margin: auto;
  overflow: hidden;
  position: relative;
`;

const TitleBox = styled.div`
  width: 1200px;
  height: 233px;
  margin: auto;
  display: block;
  position: relative;
  z-index: 1;
`;
const TitleContents = styled.div`
  padding-top: 80px;
`;
const TitleText = styled.h1`
  margin: auto;
  font-family: notosans_bold;
  font-size: 32px;
  float: left;
  color: #ffffff;
`;
const TitleDate = styled.p`
  font-family: notosans_regular;
  font-size: 18px;
  margin: 0;
  color: #b9b9b9;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 1200px;
  margin: 40px auto 40px auto;
`;
const TitleButton = styled.div`
  // border : 1px solid #FFFFFF;
  // padding-top : 12px;
  // border-radius : 20px;
  // float : right;
  // cursor : pointer;
  cursor: pointer;
  display: block;
`;
const TitleBtnName = styled.button`
  border: 1px solid #000000;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #ffffff;
  color: #000000;
  margin: 0;
  cursor: pointer;
`;
const BottomBox = styled.div`
  width: 1200px;
  display: flex;
  margin: auto auto 40px auto;
`;
const ContentImage = styled.div`
  width: 513px;
  margin: 0 48px 0 0;
  display: block;
`;
const ContentsBox = styled.div`
  width: 639px;
  height: 407px;
  margin: 0 auto auto 0;
  display: block;
`;
const ContentsTit = styled.div`
  display: block;
  margin-bottom: 34px;
`;
const ContentsH = styled.h2`
  margin: 0;
  font-family: seravek;
  font-style: italic;
  font-size: 28px;
`;
const Contents = styled.div``;
const ContentsP = styled.p`
  font-family: notosans_regular;
  font-size: 18px;
  margin: 0;
`;
const EditButton = styled.div`
  float: right;
  margin: auto 0px auto auto;
`;
const EditBtn = styled.button`
  border: none;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #168ed9;
  color: #ffffff;
  margin-right: 12px;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  border: 1px solid #168ed9;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #ffffff;
  color: #000000;
  margin: 0;
  cursor: pointer;
`;
const MoveMoimButton = styled.div`
  display: block;
  margin: auto auto 90px auto;
  width: 1200px;
`;
const Moim = styled.button`
  width: 167px;
  height: 40px;
  border: 1px solid #000000;
  border-radius: 20px;
  font-family: notosans_regular;
  font-size: 18px;
  background-color: #ffffff;
  cursor : pointer;
`;
export default ReviewDetail;

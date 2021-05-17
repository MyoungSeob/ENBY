import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplyList from "../components/ApplyList";
import Image from "../elements/Image";
import Detail from "../components/Detail";
import About from "../components/About";
import Apply from "../components/Apply";

import jwt_decode from "jwt-decode";

import styled from "styled-components";
import { actionsCreators as postActions } from "../redux/modules/post";
import { actionsCreators as applyActions } from "../redux/modules/apply";
import { history } from "../redux/configStore";
import MemberCardList from "../components/MemberCardList";
import PermitApplyList from "../components/PermitApplyList";
import ReviewBox from "../components/ReviewBox";
import Loading from "../components/Loading";

const MatingDetail = (props) => {
  const id = props.match.params.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const dispatch = useDispatch();

  const post_list = useSelector((store) => store.post.detail_list);
  const apply_list = useSelector((store) => store.post.apply_list);
  const createdAt = useSelector((store) => store.post.created_At);

  const data = post_list;
  const createdBy = post_list.createdBy;

  useEffect(() => {
    dispatch(postActions.getPostDetailDB(id))
  }, [id]);

  const deletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?") === true) {
      dispatch(postActions.deletePostDB(id));
    }
  };
  
  const none_login_editButton=()=>{
    if(localStorage.getItem("token") !== null){
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      return (
        createdBy === decode.nickname ? (
          <EditButton>
            {!data.deadlineStatus ? (
              <EditBtn
              onClick={() => {
                history.push("/board/write/" + id);
              }}
            >
              수정하기
            </EditBtn>
            ) : ("")}
     
            <DeleteBtn onClick={deletePost}>삭제하기</DeleteBtn>
          </EditButton>
        ) : (
          ""
        )
      )
    }else{
      return "";
    }
  }

  const none_login_apply=()=>{
    if(localStorage.getItem("token")!== null){
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      return (
        decode.nickname === createdBy ? (
          <PermitBox>
            <PermitApplyList />
          </PermitBox>
        ) : (
          <ApplyBox>
          <Apply {...post_list} />
        </ApplyBox>
        )
      )
    }else{
      return (
        <ApplyBox>
          <Apply {...post_list} />
        </ApplyBox>
      );
    }
  }

  if(loading){
    return <Loading />
  }else{return (
    <Container>
      <ImageBox>
        <ImageGrid>
          <ImageGrid_>
            {data.deadlineStatus ? (
              <Image shape="moimcontentsdeadline" src={data.board_imgUrl} />
            ) : (
              <Image shape="moimcontents" src={data.board_imgUrl} />
            )}
          </ImageGrid_>
        </ImageGrid>
      </ImageBox>
      <DetailBox>
        <TitleBox>
          <TitleDate>{createdAt}</TitleDate>
          <TitleText>{data.title}</TitleText>
        </TitleBox>
        <IconBox>
          <Detail {...post_list} />
        </IconBox>
      </DetailBox>
      <ButtonBox>
        <ToListButton>
          <ToListBtn
            onClick={() => {
              history.push("/board/mating");
            }}
          >
            목록으로
          </ToListBtn>
        </ToListButton>
        {none_login_editButton()}
      </ButtonBox>
      <ContentsBox>
        {data.deadlineStatus ? (
          <Image shape="minicontentsdeadline" src={data.board_imgUrl} />
        ) : (
          <Image shape="minicontents" src={data.board_imgUrl} />
        )}
        <About {...post_list} />
      </ContentsBox>
      <ApplicationBox>
        {apply_list.length > 0 ? (
          <MemberBox>
            <MemberCardList />
          </MemberBox>
        ) : (
          ""
        )}
        {none_login_apply()}
      </ApplicationBox>
      <ReviewContainer>
        <ReviewBox {...post_list} />
      </ReviewContainer>
    </Container>
  );
};}

  

const Container = styled.div`
  display: block;
`;
const ImageBox = styled.div`
  width: 100%;
  margin: auto;
  
`;
const ImageGrid = styled.div`
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: absolute;
  margin: auto;
  
`;
const ImageGrid_ = styled.div`
  width: 1920px;
  margin: auto;
  overflow: hidden;
  position: relative;
  
`;
const DetailBox = styled.div`
  margin: auto;
  width: 1200px;
  height: 320px;
`;

const TitleBox = styled.div`
  margin: 0 auto 0 auto;
  padding-top: 80px;
  position: relative;
  display: block;
`;
const TitleText = styled.h1`
  margin: 0;
  font-family: notosans_bold;
  font-size: 32px;
  float: left;
  color: #ffffff;
`;
const TitleDate = styled.p`
  font-family: notosans_regular;
  font-size: 20px;
  margin: 0;
  color: #b9b9b9;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 1200px;
  margin: 40px auto 40px auto;
`;
const ToListButton = styled.div`
  cursor: pointer;
  display: block;
`;
const ToListBtn = styled.button`
  border: 1px solid #808080;
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
  background-color: #168ED9;
  color: #ffffff;
  margin-right: 12px;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  border: 1px solid #168ED9;
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
const IconBox = styled.div`
  width: 1200px;
  margin: 40px auto auto auto;
  display: block;
  float: left;
`;
const ContentsBox = styled.div`
  width: 1200px;
  margin: 0 auto 0 auto;
  display: flex;
`;
const MemberBox = styled.div`
  width: 1200px;
  margin: auto auto 100px auto;
`;
const ApplyBox = styled.div`
  width: 1200px;
  margin: auto;
`;
const PermitBox = styled.div`
  max-width: 1200px;
  margin: auto;
`;
const ApplicationBox = styled.div`
  padding: 120px 0 80px 0;
  background-color: #f8f8f8;
`;
const ReviewContainer = styled.div`
  margin-top : 80px;
  // margin: 34px auto 150px auto;
`

export default MatingDetail;

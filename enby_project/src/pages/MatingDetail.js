import React, { useEffect } from "react";
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

const MatingDetail = (props) => {
  const id = props.match.params.id;

  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const dispatch = useDispatch();

  const post_list = useSelector((store) => store.post.detail_list);
  const apply_list = useSelector((store) => store.post.apply_list);
  const time = useSelector((store) => store.post.time);
  const createdAt = useSelector((store) => store.post.created_At);
  console.log(post_list);
  const data = post_list;
  const createdBy = post_list.createdBy;

  useEffect(() => {
    dispatch(postActions.getPostDetailDB(id));
  }, [id]);

  const deletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?") === true) {
      dispatch(postActions.deletePostDB(id));
    }
  };

  return (
    <Container>
      <ImageBox>
        <ImageGrid>
          <ImageGrid_>
            {data.deadlineStatus ? (<Image shape="moimcontentsdeadline" src={data.board_imgUrl} />) : (<Image shape="moimcontents" src={data.board_imgUrl} />)}
            
          </ImageGrid_>
        </ImageGrid>
      </ImageBox>
      <DetailBox>
        <TitleBox>
          <TitleDate>{createdAt}</TitleDate>
          <TitleText>{data.title}</TitleText>
        </TitleBox>
        <TitleButton>
          <TitleBtnName>목록으로</TitleBtnName>
        </TitleButton>
        <IconBox>
          <Detail {...post_list} />
        </IconBox>
      </DetailBox>
      <ContentsBox>
      {data.deadlineStatus ? (<Image shape="minicontentsdeadline" src={data.board_imgUrl} />) : (<Image shape="minicontents" src={data.board_imgUrl} />)}
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
        {decode.nickname === createdBy ? (
          <PermitBox>
            <PermitApplyList />
          </PermitBox>
        ) : (
          <ApplyBox>
            <Apply {...post_list} />
          </ApplyBox>
        )}

        <button
          onClick={() => {
            history.push("/board/write/" + id);
          }}
        >
          수정
        </button>
        <button onClick={deletePost}>삭제</button>
      </ApplicationBox>
    </Container>
  );
};

const Container = styled.div`
  display : block;
`;
const ImageBox = styled.div`
width : 100%;
margin : auto;

`;
const ImageGrid = styled.div`
width : 100%;
height : 320px;
overflow : hidden;
position : absolute;
margin : auto;
`
const ImageGrid_ = styled.div`
width : auto;
margin : auto;
overflow : hidden;
position : relative;
`
const DetailBox = styled.div`
  margin: auto;
  width: 1200px;
  height : 320px;
`;


const TitleBox = styled.div`
  margin: 0 auto 0 auto;
  padding-top : 80px;
  position : relative;
  display : block;
`;
const TitleText = styled.h1`
  margin: 0;
  font-family: notosans_bold;
  font-size: 32px;
  float: left;
  color : #ffffff;
`;
const TitleDate = styled.p`
  font-family: notosans_regular;
  font-size: 20px;
  margin: 0;
  color: #b9b9b9;
`;
const TitleButton = styled.div`
border : 1px solid #FFFFFF;
padding : 2px 48px 2px 48px;
border-radius : 20px;
float : right;
margin : auto;
cursor : pointer;
position : relative;
`;
const TitleBtnName = styled.p`
  text-align : center;
  font-size: 18px;
  color: #ffffff;
  margin: 0;
`;
const IconBox = styled.div`
  width : 1200px;
  margin : 40px auto auto auto;
  display : block;
  float : left;
` 
const ContentsBox = styled.div`
  width: 1200px;
  margin: 60px auto 108px auto;
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
  margin-bottom: 170px;
  padding-top : 120px;
  background-color : #f8f8f8;
`;

export default MatingDetail;

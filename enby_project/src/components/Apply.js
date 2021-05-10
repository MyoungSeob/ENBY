import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionsCreators as applyActions } from "../redux/modules/apply";

const Apply = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((store) => store.post.detail_list);
  const apply_list = useSelector((store) => store.post.apply_list);
  const id = post_list.id;

  const regist_list = [];

  for (let i = 0; i < apply_list.length; i++) {
    if (
      apply_list[i].register_id === parseInt(localStorage.getItem("regist"))
    ) {
      regist_list.push(apply_list[i]);
    }
  }

  const fullPerson = post_list.people_current / post_list.people_max;
  const regist = regist_list[0];

  const [kakaoId, setKakaoId] = React.useState("");
  const [applyComment, setApplyComment] = React.useState("");

  const applyAttend = () => {
    // if (localStorage.getItem("regist")) {
    //   window.alert("신청한 모임이 마감되지 않았다면 신청은 1번만 가능합니다.");
    //   return;
    // }
    if (kakaoId === "" || applyComment === "") {
      window.alert(
        "연락가능한 카카오톡 아이디와 신청을 위한 한마디 모두 작성해주세요!"
      );
    } else {
      dispatch(applyActions.attendApplyDB(id, kakaoId, applyComment));
    }
  };

  const cancelAttend = () => {
    dispatch(applyActions.cancelApply(id));
  };

  const applyLimit = () => {
    if (fullPerson === 1) {
      return <ApplyButton>마감되었습니다.</ApplyButton>;
    };
    if (post_list.deadlineStatus === true) {
      ;return <ApplyButton>마감되었습니다.</ApplyButton>;
    }
    if (fullPerson < 1) {
      return <ApplyButton onClick={applyAttend}>신청하기</ApplyButton>;
    };
  };

  return (
    <ApplyBox>
      <Title>
        <ApplySubTit>이 등산에 함께하고 싶으시다면?</ApplySubTit>
        <ApplyTit>Application</ApplyTit>
      </Title>
      {regist_list.length < 1 ? (
        <>
          <Contect>
            <KakaoId>
              <Id>Kakao ID</Id>
              <IdInput
                placeholder="연락 가능한 카카오톡 ID를 작성해 주세요."
                onChange={(e) => {
                  setKakaoId(e.target.value);
                }}
              />
            </KakaoId>
            <Comment>
              <CommentTit>한마디</CommentTit>
              <Contents
                placeholder="신청을 위해 간단한 한마디를 작성해 주세요."
                onChange={(e) => {
                  setApplyComment(e.target.value);
                }}
              ></Contents>
            </Comment>
          </Contect>
          <ButtonBox>{applyLimit()}</ButtonBox>
        </>
      ) : (
        <Contect>
          <CheckBox>
            <CheckMe>
              <CheckImg src={regist.profile_img} />
              <CheckId>{regist.nickname}</CheckId>
            </CheckMe>
            <CheckContents>
              <CheckKakaoID>
                <CheckH>Kakao ID : {regist.kakao_id}</CheckH>
              </CheckKakaoID>
              <CheckComment>
                <CheckP>{regist.contents}</CheckP>
              </CheckComment>
            </CheckContents>
            <CheckButtonBox>
              <ApplyButton onClick={cancelAttend}>취소하기</ApplyButton>
            </CheckButtonBox>
          </CheckBox>
        </Contect>
      )}
    </ApplyBox>
  );
};

const ApplyBox = styled.div`
  margin-bottom: 34px;
  width: 1200px;
`;
const Title = styled.div``;
const ApplySubTit = styled.p`
  margin: 0;
  font-family: notosans_regular;
  font-size: 18px;
  color: #474747;
`;
const ApplyTit = styled.h2`
  margin-top: 5px;
  font-family: seravek;
  font-size: 28px;
  font-style: italic;
`;
const Contect = styled.div`
  display: flex;
`;
const KakaoId = styled.div`
  margin-right: 24px;
`;
const Id = styled.p`
  font-size: 18px;
  color: #000000;
  font-family: notosans_medium;
`;
const IdInput = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #b9b9b9;
  border-radius: 20px;
  font-size: 18px;
  padding-left: 20px;
  outline: none;
`;
const Comment = styled.div`
  margin-bottom: 20px;
`;
const CommentTit = styled.p`
  font-size: 18px;
  color: #000000;
  font-family: notosans_medium;
`;
const Contents = styled.input`
  width: 810px;
  height: 40px;
  border: 1px solid #b9b9b9;
  border-radius: 20px;
  font-size: 18px;
  padding-left: 20px;
  outline: none;
`;
const ButtonBox = styled.div`
  float: right;
`;
const ApplyButton = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #f1b100;
  padding-bottom: 2px;
  cursor: pointer;
`;
const CheckBox = styled.div`
  margin-top: 34px;
  display: flex;
`;
const CheckMe = styled.div`
  display: flex;
  width: 196px;
`;
const CheckImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-top: 3px;
  margin-right: 10px;
`;
const CheckId = styled.p`
  margin: 0;
  font-size: 18px;
  font-family: notosans_regular;
`;
const CheckContents = styled.div`
  margin-left: 24px;
`;
const CheckKakaoID = styled.div`
  width: 1000px;
`;
const CheckH = styled.h1`
  margin: 0px;
  font-size: 18px;
  font-family: notosans_regular;
`;
const CheckComment = styled.div``;
const CheckP = styled.p`
  font-size: 18px;
  font-family: notosans_regular;
  max-width: 1000px;
`;
const CheckButtonBox = styled.div``;
export default Apply;

// MatingDetail의 신청목록을 나타냅니다. 주최자에게 수락/거절 뷰를 나타냅니다.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionsCreators as applyActions } from "../redux/modules/apply";

const PermitApply = (props) => {
  const dispatch = useDispatch();
  //해당 게시글의 id값을 불러옵니다.
  const detail_list = useSelector((store) => store.post.detail_list);
  const id = detail_list.id;
  // 해당 신청자의 id값을 불러옵니다.
  const register_id = props.register_id;
  // 참여요청을 수락하는 코드입니다.
  const acceptApply = () => {
    dispatch(applyActions.acceptApplyDB(id, register_id));
  };
  // 참여요청을 거절하는 코드입니다.
  const rejectApply = () => {
    dispatch(applyActions.rejectApplyDB(id, register_id));
  };
  return (
    <Container>
      <CheckBox>
        <CheckMe>
          <CheckImg src={props.profile_img} />
          <CheckId>{props.nickname}</CheckId>
        </CheckMe>
        <CheckContents>
          {/* 주최자가 신청을 수락할 경우, 해당 신청자의 카카오ID를 확인할 수 있도록 합니다. */}
          {props.accepted ? (
            <CheckKakaoID>
              <CheckH>Kakao ID : {props.kakao_id}</CheckH>
            </CheckKakaoID>
          ) : (
            ""
          )}

          <CheckComment>
            <CheckP>{props.contents}</CheckP>
          </CheckComment>
        </CheckContents>
      </CheckBox>
      <CheckButtonBox>
        {/* 주최자가 신청을 수락할 경우와 아직 응답을 안한경우를 나타내는 뷰입니다. */}
        {props.accepted ? (
          <CheckAccept>수락하셨습니다</CheckAccept>
        ) : (
          <div>
            <AcceptButton onClick={acceptApply}>수락하기</AcceptButton>
            <RejectButton onClick={rejectApply}>거절하기</RejectButton>
          </div>
        )}
      </CheckButtonBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin-top: 34px;
  padding-bottom: 28px;
  border-bottom: 1px solid #c8c8c8;
  max-width: 1200px;
  width: 100%;
`;
const CheckBox = styled.div`
  width: 100%;
  display: flex;
  margin: auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 35px;
  }
  @media (max-width: 600px) {
    margin: 0;
  }
`;
const CheckMe = styled.div`
  display: flex;
  width: 196px;
  @media (max-width: 600px) {
    margin-left: 12.5px;
    width: 90px;
  }
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
  @media (max-width: 600px) {
    font-size: 11px;
    margin-top: 7px;
  }
`;
const CheckContents = styled.div`
  margin-left: 24px;
  @media (max-width: 600px) {
    width: 150px;
    margin-left: 0;
  }
`;
const CheckKakaoID = styled.div`
  width: 100%;
  margin-bottom: 22px;
  @media (max-width: 600px) {
   margin-top : 7px;
  }
`;
const CheckH = styled.h1`
  margin: 0px;
  font-size: 18px;
  font-family: notosans_regular;
  @media (max-width: 600px) {
    font-size: 11px;
  }
`;
const CheckComment = styled.div`
  width: 100%;
`;
const CheckP = styled.p`
  margin: 0;
  font-size: 18px;
  font-family: notosans_regular;
  max-width: 1000px;
  @media (max-width: 600px) {
    font-size: 11px;
    margin-top: 7px;
  }
`;
const CheckButtonBox = styled.div`
  width: 167px;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-right: 35px;
  }
  @media (max-width: 600px) {
    float: right;
  }
`;
const CheckAccept = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #168ed9;
  @media (max-width: 600px) {
    width: 110px;
    font-size: 11px;
    margin-right : 12.5px;
  }
`;
const AcceptButton = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #168ed9;
  padding-bottom: 2px;
  cursor: pointer;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 60px;
    font-size: 11px;
    margin-right: 12.5px;
    float: right;
  }
`;

const RejectButton = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  border: 1px solid #168ed9;
  border-radius: 20px;
  background-color: #f8f8f8;
  padding-bottom: 2px;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 60px;
    font-size: 11px;
    margin-right: 12.5px;
    float: right;
  }
`;

export default PermitApply;

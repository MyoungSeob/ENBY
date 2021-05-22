// 주최자가 보는 참여 신청자들의 목록 컴포넌트입니다.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PermitApply from "./PermitApply";
import jwt_decode from "jwt-decode";
import { actionsCreators as applyActions } from "../redux/modules/apply";

const PermitApplyList = (props) => {
  const dispatch = useDispatch();
  const detail_list = useSelector((store) => store.post.detail_list);
  const regist_list = useSelector((store) => store.post.apply_list);
  const id = detail_list.id;
  //마감하기 코드
  const apply_deadline = () => {
    dispatch(applyActions.ApplyDeadlineDB(id));
  };

  //마감 했을 때와 하지 않았을 경우의 뷰입니다.
  const deadline_view = () => {
    if (detail_list.deadlineStatus) {
      return <DidDeadLineBtn>이미 마감했습니다</DidDeadLineBtn>;
    } else {
      return <DeadLineBtn onClick={apply_deadline}>모집 마감하기</DeadLineBtn>;
    }
  };

  if (localStorage.getItem("token") !== null) {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    //신청 목록 중 자신의 이름을 제외한 다른 신청자들을 regist라는 배열에 push했습니다.
    const regist = [];
    for (let i = 0; i < regist_list.length; i++) {
      if (regist_list[i].nickname !== decode.nickname) {
        regist.push(regist_list[i]);
      }
    }
    return (
      <Container>
        {/* 자신 외에 신청한 인원이 1명 이상일 경우 마감을 할 수 있는 뷰, 1명도 없다면 아직 신청한 사람이 없다는 뷰를 보여줍니다. */}
        
        {regist.length >= 1 ? (
          <Title>
            <ApplyTit>Application</ApplyTit>
            {deadline_view()}
          </Title>
        ) : (
          <>
            <Title>
              <ApplyTit>Application</ApplyTit>
            </Title>
            <Notice>
              <NoticeTit>아직 신청한 사람이 없습니다.</NoticeTit>
            </Notice>
          </>
        )}
        {regist.map((p) => {
          return <PermitApply key={p.id} {...p} />;
        })}
      </Container>
    );
  } else {
    return "";
  }
};
const Container = styled.div`
  margin-bottom: 80px;
  @media (max-width: 600px) {
    width: 375px;
    font-size: 11px;
    margin-right: 16px;
    margin-bottom : 17px;
       }
`;
const Title = styled.div`
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 35px;
  }
   @media (max-width: 600px) {
       }
`;
const DeadLineBtn = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  border: 1px solid #168ED9;
  border-radius: 20px;
  outline: none;
  // background-color: #f1b100;
  padding-bottom: 2px;
  cursor: pointer;
  margin: auto 0px auto auto;
  float: right;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-right: 35px;
  }
  @media (max-width: 600px) {
    width: 110px;
    font-size: 11px;
    margin-right: 12.5px;
       }
`;
const DidDeadLineBtn = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  border: 1px solid #168ED9;
  border-radius: 20px;
  outline: none;
  background-color: #f8f8f8;
  padding-bottom: 2px;
  margin: auto 0px auto auto;
  float: right;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-right: 35px;
  }
  @media (max-width: 600px) {
    width: 110px;
    font-size: 11px;
    margin-right: 12.5px;
       }
`;
const ApplyTit = styled.h2`
  margin-top: 5px;
  font-family: seravek;
  font-size: 28px;
  font-style: italic;
  @media (max-width: 600px) {
    font-size: 21px;
    margin-left: 12.5px;
       }
`;
const Notice = styled.div`
  text-align: center;
  padding: 40px 0 40px 0;
`;
const NoticeTit = styled.h1`
  font-size: 28px;
  font-family: notosans_bold;
  color: #b9b9b9;
  margin: 0;
  @media (max-width: 600px) {
    
    font-size: 18px;
  }
  
`;

export default PermitApplyList;

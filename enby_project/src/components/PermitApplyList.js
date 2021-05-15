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

  const apply_deadline = () => {
    dispatch(applyActions.ApplyDeadlineDB(id));
  };
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

    const regist = [];
    for (let i = 0; i < regist_list.length; i++) {
      if (regist_list[i].nickname !== decode.nickname) {
        regist.push(regist_list[i]);
      }
    }
    return (
      <Container>
        <Title>
          <ApplyTit>Application</ApplyTit>
          {regist.length >= 1 ? deadline_view() : ""}
        </Title>
        {regist.length < 1 ? (
          <Notice>
            <NoticeTit>아직 신청한 사람이 없습니다.</NoticeTit>
          </Notice>
        ) : (
          ""
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
`;
const Title = styled.div`
  display: flex;
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
`;
const ApplyTit = styled.h2`
  margin-top: 5px;
  font-family: seravek;
  font-size: 28px;
  font-style: italic;
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
`;

export default PermitApplyList;

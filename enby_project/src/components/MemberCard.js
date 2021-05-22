// MatingDetail에 있는 신청한 사람들의 카드를 나타내는 컴포넌트 입니다.
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import jwt_decode from "jwt-decode";

const MemberCard = (props) => {
  // 기본적으로 로컬스토리지에 저장되어있는 JWT를 인코딩하여 사용하는 경우와 사용하지 않은 경우(로그인 & 비로그인)를 나타냅니다.
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      const name = decode.nickname;
      // 로그인 했을 때 내 카드를 누르면 마이페이지로, 다른 사람의 카드를 누를 경우 그 사람의 페이지로 넘어가는 코드입니다.
      const move_otherpage = () => {
        if (props.nickname === name) {
          history.push("/mypage");
        } else {
          history.push("/mypage/" + `${props.nickname}`);
        }
      };
      return (
        // 로그인 되었을 경우입니다.
        <Container>
          <Member onClick={move_otherpage}>
            <MemberImg src={props.profile_img} />
            <MemberNickname>{props.nickname}</MemberNickname>
          </Member>
        </Container>
      );
    } else {
      // 로그인을 하지 않았을 경우입니다.
      const move_otherpage = () => {
        history.push("/mypage/" + `${props.nickname}`);
      };
      return (
        <Container>
          <Member onClick={move_otherpage}>
            <MemberImg src={props.profile_img} />
            <MemberNickname>{props.nickname}</MemberNickname>
          </Member>
        </Container>
      );
    }
  };


const Container = styled.div`
  margin-right: 30px;
  @media (max-width: 600px) {
    margin: 0;
   }
`;

const Member = styled.div`
  width: 150px;
  height: 185px;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 80px;
    height: 120px;
   }
`;
const MemberImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
   }
`;
const MemberNickname = styled.p`
   margin-top : 8px;
  font-size: 18px;
  font-family: notosans_regular;
  text-align: center;
  @media (max-width: 600px) {
    width : 70px;
    font-size: 8px;
   }
`;

export default MemberCard;

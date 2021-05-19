import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import jwt_decode from "jwt-decode";

const MemberCard = (props) => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      const name = decode.nickname;
      const move_otherpage = () => {
        if (props.nickname === name) {
          history.push("/mypage");
        } else {
          history.push("/mypage/" + `${props.nickname}`);
        }
      };
      return (
        <Container>
          <Member onClick={move_otherpage}>
            <MemberImg src={props.profile_img} />
            <MemberNickname>{props.nickname}</MemberNickname>
          </Member>
        </Container>
      );
    } else {
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

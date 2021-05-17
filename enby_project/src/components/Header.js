import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import "../shared/App.css";
import { actionsCreators as userActions } from "../redux/modules/user";
import jwt_decode from 'jwt-decode'
import { generateMedia } from 'styled-media-query';

function Header() {
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token")
  // const decode = jwt_decode(token)
  // const name = decode.nickname;

  const move_main = () => {
    history.push("/");
  };
  const move_mypage = () => {
    history.push('/mypage/')
  }
  const logout = () => {
    dispatch(userActions.LogoutDB());
  };
  const login = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=17fb08cb376f564b3375667a799fda1f&redirect_uri=http://localhost:3000/oauth"
    };
  return (
    <Container>
      <HeaderGrid>
        <LogoBox>
          <Logo onClick={move_main}>SANTA</Logo>
        </LogoBox>
        {localStorage.getItem("token") ? (
          <CategoryBox>
            <Logout onClick={logout}>Log out</Logout>
            <Span>
              <MyPage onClick={move_mypage}>My page</MyPage>
            </Span>
          </CategoryBox>
        ) : (
          <CategoryBox>
            <LogIn onClick={login}>Log In</LogIn>
          </CategoryBox>
        )}
      </HeaderGrid>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width : 1200px;
  height: 80px;
  background-color: #ffffff;
  display: inline-block;
  font-family : seravek;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 100%;
    min-width: 320px;
    height: 80px;

  }
`;
const HeaderGrid = styled.div`
  width: 1200px;
  margin: 0 auto 0 auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 100%;
    min-width: 320px;
    height: 80px;
    margin: auto;
  }
`;
const LogoBox = styled.div`
  display: inline-block;
  float : left;
  width: 289px;
  height: 39px;
  margin-top : 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
    }
  
  @media (max-width: 600px) {
    width: 40%;
    min-width: 120px;
    margin-left: 30px;
  }

`;
const Logo = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #168ed9;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
`;

const CategoryBox = styled.div`
  text-align: right;
  float: right;
  margin: auto 0 auto auto;
  display: flex;
  padding-top: 10px;
  @media (max-width: 600px) {
    margin-top:7px;
    margin-right:30px;
  }
`;
const Logout = styled.p`
  color: gray;
  float: right;
  cursor: pointer;
  font-size: 18px;
  
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const MyPage = styled.p`
  color: #168ed9;
  cursor: pointer;
  font-size: 18px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const LogIn = styled.p`
  color: #168ed9;
  cursor: pointer;
  font-size: 18px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const Span = styled.span`
  margin-left: 28px;
`;

export default Header;
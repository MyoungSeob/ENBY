import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../redux/configStore";
import "../shared/App.css";
import { actionsCreators as userActions } from "../redux/modules/user";

function Header() {
  const dispatch = useDispatch();

  const move_main = () => {
    history.push("/");
  };

  const logout = () => {
    dispatch(userActions.LogoutDB());
  };
  const login = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=17fb08cb376f564b3375667a799fda1f&redirect_uri=http://localhost:3000/oauth";
  };
  return (
    <Container>
      <HeaderGrid>
        <LogoBox>
          <Logo onClick={move_main}>ENBY</Logo>
          <LogoSmall onClick={move_main}>exercise mate near by you</LogoSmall>
        </LogoBox>
        {localStorage.getItem("token") ? (
          <CategoryBox>
            <Logout onClick={logout}>Log out</Logout>
            <Span>
              <MyPage>My page</MyPage>
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
  width: 1920px;
  height: 100px;
  background-color: #000000;
  display: flex;
  font-family : seravek;
`;
const HeaderGrid = styled.div`
  width: 1440px;
  margin: 0 auto 0 auto;
`;
const LogoBox = styled.div`
  display: flex;
  float : left;
  width: 350px;
  height: 40px;
  vertical-align: middle;
  padding-top: 30px;
`;
const Logo = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #ffffff;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
`;
const LogoSmall = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin: 0 0 0 17px;
  padding-top: 9px;
  cursor: pointer;
`;
const CategoryBox = styled.div`
  text-align: right;
  float: right;
  margin: auto 0 auto auto;
  display: flex;
  padding-top : 20px;
`;
const Logout = styled.p`
  color: gray;
  float: right;
  cursor: pointer;
  font-size: 18px;
`;

const MyPage = styled.p`
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
`;
const LogIn = styled.p`
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
`;
const Span = styled.span`
  margin-left: 28px;
`;

export default Header;

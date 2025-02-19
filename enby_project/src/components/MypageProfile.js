// 마이페이지 컴포넌트입니다.
import React from 'react';
import styled from 'styled-components';

import jwt_decode from 'jwt-decode';

const MypageProfile =(props)=>{
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const myName = decode.nickname
    const profile = decode.profile_image;
    return (
      <Container>
        <Grid>
          <TitleBox>
            <Title>Profile</Title>
          </TitleBox>
          <ProfileBox>
            <Profile src={profile}></Profile>
            <ProfileContents>
                <Welcome>{myName}님, 환영합니다.</Welcome>
              <MoimCount>
                모임 총 참여 횟수는 {props[0].length}번입니다.
              </MoimCount>
            </ProfileContents>
          </ProfileBox>
        </Grid>
      </Container>
    );
}
const Container = styled.div`
    position : relative;
    max-width : 1200px;
    width: 100%;
    height : 417px;
    margin : 0 auto 0 auto;
    padding-top : 23px;
    @media (max-width: 600px) {
      height: 210px;
      // padding-top: 80px;
      overflow-y: hidden;
    }
`
const Grid = styled.div`
width : 424px;
height : 157px;
opacity : none;
@media (max-width: 600px) {
  width: 320px;
}
`
const TitleBox = styled.div`
  margin-top: -28px;
`
const Title = styled.h1`
    margin : 0;
    font-family : seravek;
    margin-bottom : 28px;
    font-size : 32px;
    font-style: italic;
    font-weight: bold;
    color : rgb(0, 0, 0);
    @media (max-width: 600px) {
      font-size: 21px;
      margin-left: 10px;
    }
`
const ProfileBox = styled.div`
    display : flex;
    margin: auto;
    @media (max-width: 600px) {
      margin-left: 10px;
    }
`
const Profile = styled.img`
    width : 90px;
    height : 90px;
    border-radius : 90px;
    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
      margin-top: -26px;
    }
`
const ProfileContents = styled.div`
    margin : 5px 0 0 26px;
    @media (max-width: 600px) {
      margin-top: -20px;
      margin-left: 16px;
    }
`
const Welcome = styled.h2`
    margin : 0;
    font-size : 28px;
    @media (max-width: 600px) {
      font-size: 18px;
    }
`
const MoimCount = styled.p`
    margin-top : 10px;
    font-size : 24px;
    @media (max-width: 600px) {
      font-size: 14px;
    }
`

export default MypageProfile;
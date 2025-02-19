//타인의 마이페이지 컴포넌트입니다.
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const OtherpageProfile=(props)=>{
    // 해당 유저가 참여한 목록(리뷰를 쓸 수 있는)을 불러오는 코드입니다.
    const other_attend = useSelector((store) => store.user.other_attend);

    return(
        <Container>
        <Grid>
          <TitleBox>
            <Title>Profile</Title>
          </TitleBox>
          <ProfileBox>
            <Profile src={props.profile_imgUrl}></Profile>
            <ProfileContents>
                <Welcome>안녕하세요, {props.nickname}입니다.</Welcome>
              <MoimCount>
                모임 총 참여 횟수는 {other_attend.length}번입니다.
              </MoimCount>
            </ProfileContents>
          </ProfileBox>
        </Grid>
      </Container>
    )
}
const Container = styled.div`
    position : relative;
    width : 1200px;
    height : 310px;
    margin : auto;
    padding-top : 121px;
    @media (max-width: 600px) {
      height: 210px;
      padding-top: 80px;
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
    margin-bottom : 21px;
`
const Title = styled.h1`
    margin : 0;
    font-family : notosans_bold;
    font-size : 32px;
    color : rgb(0, 0, 0);
    @media (max-width: 600px) {
      font-size: 21px;
      margin-left: 10px;
    }
`
const ProfileBox = styled.div`
    display : flex;
`
const Profile = styled.img`
    width : 90px;
    height : 90px;
    border-radius : 90px;
    @media (max-width: 600px) {
      width: 60px;
      height: 60px;
    }
`
const ProfileContents = styled.div`
    margin : 5px 0 0 26px;
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
export default OtherpageProfile;
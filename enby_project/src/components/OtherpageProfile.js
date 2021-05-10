import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const OtherpageProfile=(props)=>{
    
    const other_attend = useSelector((store) => store.user.other_attend);
    console.log(props)
    
    return(
        <Container>
        <Grid>
          <TitleBox>
            <Title>Profile</Title>
          </TitleBox>
          <ProfileBox>
            <Profile src={props.profile_Img}></Profile>
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
    padding-top : 190px;
`
const Grid = styled.div`
width : 424px;
height : 157px;
opacity : none;

`
const TitleBox = styled.div`
    margin-bottom : 21px;
`
const Title = styled.h1`
    margin : 0;
    font-family : notosans_bold;
    font-size : 32px;
    color : rgb(0, 0, 0);
`
const ProfileBox = styled.div`
    display : flex;
`
const Profile = styled.img`
    width : 90px;
    height : 90px;
    border-radius : 90px;
`
const ProfileContents = styled.div`
    margin : 5px 0 0 26px;
`
const Welcome = styled.h2`
    margin : 0;
    font-size : 28px;
`
const MoimCount = styled.p`
    margin-top : 10px;
    font-size : 24px;
`
export default OtherpageProfile;
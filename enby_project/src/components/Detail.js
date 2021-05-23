// 모집게시글 상세에 들어가는 디테일(시간, 장소, 인원)을 나타내는 컴포넌트 입니다. MatingDetail의 자식컴포넌트입니다.
import React from 'react';
import styled from 'styled-components'
import date from '../shared/image/whitecalendar.png'
import place from '../shared/image/whitemountain.png'
import person from '../shared/image/whitepeople.png'
import { useSelector } from 'react-redux';

const Detail = (props)=>{
    // props로 넘어오는 현재 신청인원과 총 인원수를 이용하여 비율을 만들었습니다.
    const gauge = 100*(props.people_current/props.people_max) + "%"
    // 만나기로 한 날짜를 redux에서 불러왔습니다.
    const time = useSelector((store) => store.post.time)
    return (
      <Container>
        <IconBox>
          <DateBox>
            <Icon />
            <IconContents>{time}</IconContents>
          </DateBox>
          <PlaceBox>
            <BigIcon src={place} />
            <IconContents_>{props.location}</IconContents_>
          </PlaceBox>
          <PersonBox>
            <BigIcon src={person} />
            <CheckPeople><Check>{props.people_current === 0 ? "0" : (props.people_current)} / {props.people_max}</Check></CheckPeople>
            <ProgressBar>
              <ProgressBar_ style={{ width : gauge }} />
            </ProgressBar>
           
          </PersonBox>
        </IconBox>
      </Container>
    );
}

const Container = styled.div`
    width: 100%;
    max-width : 1200px;
    height : 48px;
    position : relative;
    float : left;
`
const IconBox = styled.div`
  display : flex;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
   }
`
const DateBox = styled.div`
    display : flex;
    margin-bottom : 10px;
    @media (max-width: 600px) {
      margin-bottom: 0;
     }
`
const IconContents = styled.div`
    margin : 0 131px 0 10px;
    font-family : notosans_regular;
    font-size : 18px;
    padding-top : 12px;
    color : #ffffff;
    @media (min-width: 600px) and (max-width: 1170px) {
      font-size: 14px;
      margin: 0 50px 0 10px;
  }
    @media (max-width: 600px) {
      font-size: 12px; 
     }
`
const IconContents_ = styled.div`
margin : 0 131px 0 10px;
    font-family : notosans_regular;
    font-size : 18px;
    padding-top : 12px;
    color : #ffffff;
    @media (min-width: 600px) and (max-width: 1170px) {
      font-size: 14px;
      margin: 0 50px 0 10px;
  }
    @media (max-width: 600px) {
      font-size: 12px; 
     }
`
const Icon = styled.div`
    background-image : url(${date});
    background-repeat : no-repeat;
    background-position : auto;
    width : 36px;
    height : 36px;
    margin-top : 10px;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 32px;
      height: 32px; 
    }
    @media (max-width: 600px) {
      width: 28px;
      height:28px; 
     }
`
const BigIcon = styled.img`
    width : 36px;
    height : 36px;
    margin-top : 6px;
    @media (max-width: 600px) {
      width: 32px;
      height:32px; 
     }
`
const PlaceBox = styled.div`
    display : flex;
    margin-bottom : 10px;
    @media (max-width: 600px) {
      margin-bottom: 0;
     }
`
const PersonBox = styled.div`
    display : flex;
`
const ProgressBar = styled.div`
    width : 150px;
    height : 6px;
    background-color : #D9D9D9;
    margin-left : 20px;
    margin-top : 22px;
    border-radius: 9px;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 100px
    }
    @media (max-width: 600px) {
      width: 80px;
      height:6px;
     }
`
const ProgressBar_ = styled.div`
    width : 0;
    height : 100%;
    background-color : #168ED9;
    border-radius: 9px
`
const CheckPeople = styled.div`
    margin-top : 10px;
    margin-left : 16px;
`
const Check = styled.h4`
    color : #ffffff;
    margin : 0;
    font-size : 18px;
    font-family : notosans_regular;
    @media (max-width: 600px) {
      font-size: 12px;
     }
`

export default Detail;
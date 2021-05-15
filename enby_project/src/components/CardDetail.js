// 카드에 들어가는 디테일 내용들입니다. 제목, 장소, 일시 등을 나타냅니다.
import React from 'react';
import styled from 'styled-components';


const CardDetail =(props)=>{
  // 프로그레스 바에 필요한 코드입니다.
  const gauge = 100 * (props.people_current / props.people_max) + "%";
  // 내려오는 정보를 저희의 양식에 맞추어 나타나게 해주는 코드입니다. ex) 2021-05-14T12:00:00 -> 2021년 5월 14일 금요일 12시 
  const date = props.meetTime.split("T")[0];
  const time = props.meetTime.split("T")[1];
  const week = new Array(
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  );

  const today = new Date(date).getDay();
  const todayLabel = week[today];
  const minit = time.split(":")[1];

  const meetdate_ =
    date.split("-")[0] +
    "년 " +
    parseInt(date.split("-")[1]) +
    "월 " +
    parseInt(date.split("-")[2]) +
    "일 " +
    todayLabel +
    " " +
    parseInt(time.split(":")[0]) +
    "시 " +
    (parseInt(minit) === 0 ? "" : parseInt(time.split(":")[1]) + "분");

  return (
    <Container>
      <IconBox>
        <DateBox>
          <Icon>장소</Icon>
          <IconContents>{props.location}</IconContents>
        </DateBox>
        <PlaceBox>
          <Icon>시간</Icon>
          <IconContents>{meetdate_}</IconContents>
        </PlaceBox>
        <PersonBox>
          <Icon>인원</Icon>
          <CheckPeople>
            <Check>
              {props.people_current === 0 ? "0" : props.people_current} /{" "}
              {props.people_max}
            </Check>
          </CheckPeople>
          <ProgressBar>
            <ProgressBar_ style={{ width: gauge }} />
          </ProgressBar>
          
        </PersonBox>
      </IconBox>
    </Container>
  );
}
const Container = styled.div`
    width : 282px;
    height : 75px;
    margin : 8px auto auto auto;
`
const IconBox = styled.div``
const DateBox = styled.div`
    display : flex;
    margin-bottom : 6px;
`
const IconContents = styled.div`
    margin-left : 12px;
    font-family : notosans_regular;
    font-size : 14px;
`
const Icon = styled.div`
font-family : notosans_regular;
font-size : 14px;
float : left;
`

const PlaceBox = styled.div`
    display : flex;
    margin-bottom : 8px;
`
const PersonBox = styled.div`
    display : flex;
`
const ProgressBar = styled.div`
    width : 150px;
    height : 4px;
    background-color : #B9B9B9;
    margin-left : 12px;
    margin-top : 8px;
    border-radius : 20px;
`
const ProgressBar_ = styled.div`
    width : 0;
    height : 100%;
    background-color : #168ed9;
    margin : 0;
    border-radius : 20px;
`
const CheckPeople = styled.div`
    margin-left : 12px;
    margin-bottom : 5px;
`
const Check = styled.h4`
    color : #7D7D7D;
    margin : 0;
    font-size : 14px;
    font-family : notosans_regular;
`

export default CardDetail;
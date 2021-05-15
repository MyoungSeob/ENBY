import React from 'react';
import styled from 'styled-components';
import date from '../shared/image/date.png'
import place from '../shared/image/place.png'
import person from '../shared/image/person.png'
import { useSelector } from 'react-redux';

const CardDetail =(props)=>{
    const gauge = 100*(props.people_current/props.people_max) + "%"
    const date = props.meetTime.split('T')[0]
    const time = props.meetTime.split('T')[1]
    const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

    const today = new Date(date).getDay();
    const todayLabel = week[today];
    const minit = time.split(':')[1]
        const meetdate =
          date.split("-")[0] +
          "년 " +
          parseInt(date.split("-")[1]) +
          "월 " +
          parseInt(date.split("-")[2]) +
          "일 " +
          todayLabel +
          " " +
          parseInt(time.split(":")[0]) +
          "시 ";

        const meetdate_ = date.split("-")[0] +
        "년 " +
        parseInt(date.split("-")[1]) +
        "월 " +
        parseInt(date.split("-")[2]) +
        "일 " +
        todayLabel + " " +
        parseInt(time.split(':')[0]) +
        "시 " + (parseInt(minit) === 0 ? (""): (parseInt(time.split(':')[1]) + "분"))

    return(
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
            <ProgressBar>
              <ProgressBar_ style={{ width : gauge }} />
            </ProgressBar>
            <CheckPeople><Check>{props.people_current === 0 ? "0" : (props.people_current)} / {props.people_max}</Check></CheckPeople>
          </PersonBox>
        </IconBox>
      </Container>
    )
}
const Container = styled.div`
    width : 300px;
    height : 130px;
    margin : 8px 0 0 0;
`
const IconBox = styled.div``
const DateBox = styled.div`
    display : flex;
    margin-bottom : 6px;
`
const IconContents = styled.div`
    margin-left : 20px;
    font-family : notosans_regular;
    font-size : 14px;
`
const Icon = styled.div`
font-family : notosans_regular;
font-size : 14px;
`
const BigIcon = styled.div`
    width : 48px;
    height : 48px;
`
const PlaceBox = styled.div`
    display : flex;
    margin-bottom : 6px;
`
const PersonBox = styled.div`
    display : flex;
`
const ProgressBar = styled.div`
    width : 150px;
    height : 6px;
    background-color : #B9B9B9;
    margin-left : 20px;
    margin-top : 10px;
`
const ProgressBar_ = styled.div`
    width : 0;
    height : 100%;
    background-color : #F1B100;
    margin : 0
`
const CheckPeople = styled.div`
    margin-left : 12px;
    margin-bottom : 5px;
`
const Check = styled.h4`
    color : #7D7D7D;
    margin : 0;
    font-size : 16px;
    font-family : notosans_regular;
`

export default CardDetail;
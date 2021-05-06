import React from 'react';
import styled from 'styled-components'
import date from '../shared/image/date.png'
import place from '../shared/image/place.png'
import person from '../shared/image/person.png'
import { useSelector } from 'react-redux';

const Detail = (props)=>{
    const gauge = 100*(props.people_current/props.people_max) + "%"
    const time = useSelector((store) => store.post.time)

    return (
      <Container>
        <TitleBox>
          <Title>Detail</Title>
        </TitleBox>
        <IconBox>
          <DateBox>
            <Icon />
            <IconContents>{time}</IconContents>
          </DateBox>
          <PlaceBox>
            <BigIcon src={place} />
            <IconContents>{props.location}</IconContents>
          </PlaceBox>
          <PersonBox>
            <BigIcon src={person} />
            <ProgressBar>
              <ProgressBar_ style={{ width : gauge }} />
            </ProgressBar>
            <CheckPeople><Check>{props.people_current === 0 ? "0" : (props.people_current)} / {props.people_max}</Check></CheckPeople>
          </PersonBox>
        </IconBox>
      </Container>
    );
}

const Container = styled.div`
    width : 465px;
    height : 240px;
`
const TitleBox = styled.div`
    margin-bottom : 34px;
`
const Title = styled.h2`
    font-size : 28px;
    font-family : seravek;
    font-style : italic;
    margin : 0;
`
const IconBox = styled.div``
const DateBox = styled.div`
    display : flex;
    margin-bottom : 10px;
`
const IconContents = styled.div`
    margin-left : 20px;
    font-family : notosans_regular;
    font-size : 18px;
    padding-top : 12px;
`
const Icon = styled.div`
    background-image : url(${date});
    background-repeat : no-repeat;
    background-position : center;
    width : 48px;
    height : 48px;
`
const BigIcon = styled.img`
    width : 48px;
    height : 48px;
`
const PlaceBox = styled.div`
    display : flex;
    margin-bottom : 10px;
`
const PersonBox = styled.div`
    display : flex;
`
const ProgressBar = styled.div`
    width : 150px;
    height : 6px;
    background-color : #B9B9B9;
    margin-left : 20px;
    margin-top : 22px;
`
const ProgressBar_ = styled.div`
    width : 0;
    height : 100%;
    background-color : #F1B100;
`
const CheckPeople = styled.div`
    margin-top : 10px;
    margin-left : 12px;
`
const Check = styled.h4`
    color : #7D7D7D;
    margin : 0;
    font-size : 18px;
    font-family : notosans_regular;
`

export default Detail;
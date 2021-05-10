import React from "react";
import styled from "styled-components";
import { history } from '../redux/configStore'


const Wrote = (props) => {
  const date = props.meetTime.split("T")[0];
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
  const meetdate =
    date.split("-")[0] +
    "년 " +
    parseInt(date.split("-")[1]) +
    "월 " +
    parseInt(date.split("-")[2]) +
    "일 " +
    todayLabel;

  const writeDay = props.createdAt.split("T")[0];
  const a_week = new Array(
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  );

  const write_day = new Date(writeDay).getDay();
  const writeDayLabel = a_week[write_day];
  const writeDate =
    writeDay.split("-")[0] +
    "년 " +
    parseInt(writeDay.split("-")[1]) +
    "월 " +
    parseInt(writeDay.split("-")[2]) +
    "일 " +
    writeDayLabel;

    const move_wirte =()=>{
      history.push('/board/mating/' + `${props.id}`)
    }
  return (
    <Container>
      <WroteBox>
        <Number>
          <NumberContents>1.</NumberContents>
        </Number>
        <Title>
          <TitleContents>{props.title}</TitleContents>
        </Title>
        <MeetTime>
          <MeetTimeContents>날짜: {meetdate}</MeetTimeContents>
        </MeetTime>
        <CreatedAt>
          <CreatedAtContents>작성: {writeDate}</CreatedAtContents>
        </CreatedAt>
        <Button onClick={move_wirte}>작성한 글 확인</Button>
        <Button onClick={() => {history.push(`/review/write/${props.id}/review`);
          }}> 모임 후기 남기기</Button>
      </WroteBox>
      <Line />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
`;
const WroteBox = styled.div`
  width: 1200px;
  display: flex;
  height: 55.08px;
  margin: auto;
  
`;
const Number = styled.div`
    margin-right : 19px;
`;
const NumberContents = styled.p`
  font-family: notosans_regular;
  font-size: 24px;
  margin: 0;
  color: #7b7b7b;
`;
const Title = styled.div`
margin-right : 21px;
width : 290px;
height : 30px;
`;
const TitleContents = styled.p`
  font-family: notosans_regular;
  font-size: 24px;
  margin: 0;
  overflow : hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
`;
const MeetTime = styled.div`
margin-right : 21px;
width : 314px;
`;
const MeetTimeContents = styled.p`
  font-family: notosans_regular;
  font-size: 24px;
  margin: 0;
`;
const CreatedAt = styled.div`
width : 314px;
`;
const CreatedAtContents = styled.p`
  font-family: notosans_regular;
  font-size: 24px;
  margin: 0;
  color : #737373;
`;
const Button = styled.button`
  margin-left : 33px;
  font-family: notosans_regular;
  font-size: 18px;
  width: 167px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #000000;
  background-color: white;
`;
const Line = styled.hr`
    margin : 0 auto 14px auto;
    width : 1200px;
    border-bottom : 1px solid #C4C4C4;
`

export default Wrote;

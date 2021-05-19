import React from "react";
import styled from "styled-components";
import { history } from '../redux/configStore'
import { useMediaQuery } from "react-responsive";


const Wrote = (props) => {

  // 반응형 구현
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });


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
  const meetdateMobile = 
    parseInt(date.split("-")[1]) +
      "월 " +
      parseInt(date.split("-")[2]) +
      "일 "
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
  const writeDateMobile = 
    parseInt(writeDay.split("-")[1]) +
    "월 " +
    parseInt(writeDay.split("-")[2]) +
    "일 "
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
            <NumberContents>{props.list_id}.</NumberContents>
          </Number>
          <Title>
            <TitleContents>{props.title}</TitleContents>
          </Title>
          <MeetTime>
          {!isDesktop ? (
            <MeetTimeContents>날짜: {meetdateMobile}</MeetTimeContents>
          ) : (
            <MeetTimeContents>날짜: {meetdate}</MeetTimeContents>
          )}
          </MeetTime>
          <CreatedAt>
            {!isDesktop ? (
            <CreatedAtContents>작성: {writeDateMobile}</CreatedAtContents>
            ) : (
            <CreatedAtContents>작성: {writeDate}</CreatedAtContents>
            )}
            
          </CreatedAt>
          <Button onClick={move_wirte}>작성한 글 확인</Button>
        </WroteBox>
      <Line />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  @media (max-width: 600px) {
  }
`;
const WroteBox = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  height: 55.08px;
  margin: auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 700px;
  }
  @media (max-width: 600px) {
    // flex-direction: column;
    width: 340px;
    height: 30px;
    // padding-left: 12px;
    margin-left: 10px;
  }
`;
const Number = styled.div`
    margin-right : 19px;
    @media (max-width: 600px) {
      margin-right: 1;
    }
`;
const NumberContents = styled.p`
  font-family: notosans_regular;
  font-size: 21px;
  margin: 0;
  color: #7b7b7b;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const Title = styled.div`
margin-right : 21px;
width : 290px;
@media (min-width: 600px) and (max-width: 1170px) {
  width: 290px;
}
@media (max-width: 600px) {
  width: 80px;
  margin-right: 14px;
}
`;
const TitleContents = styled.p`
  font-family: notosans_regular;
  font-size: 21px;
  margin: 0;
  overflow : hidden;
    text-overflow : ellipsis;
    white-space : nowrap;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 167px;  
    font-size: 18px;
    }
  @media (max-width: 600px) {
    font-size: 12px;
    width: 82px;
  }
`;
const MeetTime = styled.div`
margin-right : 21px;
width : 314px;
@media (min-width: 600px) and (max-width: 1170px) {
  width: 280px;
}
@media (max-width: 600px) {
  width: 140px;
  margin-right: 6;
}
`;
const MeetTimeContents = styled.p`
  font-family: notosans_regular;
  font-size: 21px;
  margin: 0;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 18px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const CreatedAt = styled.div`
width : 314px;
@media (min-width: 600px) and (max-width: 1170px) {
  width: 280px;
}
@media (max-width: 600px) {
  width: 140px;
}
`;
const CreatedAtContents = styled.p`
  font-family: notosans_regular;
  font-size: 21px;
  margin: 0;
  color : #737373;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 18px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    margin-left: -10px;
  }
`;
const Button = styled.button`
  margin-left : 33px;
  font-family: notosans_regular;
  font-size: 18px;
  width: 167px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #808080;
  background-color: white;
  cursor : pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 200px;
    font-size: 14px;
  }
  @media (max-width: 600px) {
    width: 80px;
    font-size: 8px;
    z-index: 1;
    margin-left: -10px;
    margin-top: -15px;
  }
`;

const Line = styled.hr`
    margin : 0 auto 14px auto;
    max-width : 1200px;
    width: 100%;
    border-bottom : 1px solid #C4C4C4;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 700px;
    }
    @media (max-width: 600px) {
      margin: 0 auto 24px auto;
    }
`

export default Wrote;

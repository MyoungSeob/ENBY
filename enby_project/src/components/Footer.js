import React from "react";
import styled from "styled-components";
import home from "../shared/image/home.png";
import question from "../shared/image/question.png";
import mail from "../shared/image/mail.png";
import { history } from "../redux/configStore";

const Footer = (props) => {
  const googleForms = () => {
    window.location.href = "https://forms.gle/1RNjUCKvpipXhW6RA";
  };
  const moveHome =()=>{
    history.push('/')
  };

  return (
    <Container>
      <FooterTitle>
        <TitleBox onClick={moveHome}>
          <Title>ENBY</Title>
          <SubTitle>exercise mate near by you</SubTitle>
        </TitleBox>
        <IconBox>
          <Icon src={home} onClick={moveHome}/>
          <Icon src={question} />
          <Icon_ src={mail} onClick={googleForms} />
        </IconBox>
      </FooterTitle>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 298px;
  background-color: #333333;
  display: flex;
`;
const FooterTitle = styled.div`
  width: 1200px;
  display: flex;
  margin: auto;
`;
const TitleBox = styled.div`
  display: flex;
  cursor: pointer;
  width: 289px;
  height: 39px;
`;
const Title = styled.h1`
  font-family: seravek;
  font-size: 32px;
  font-style: italic;
  color: #ffffff;
  margin: 0;
`;

const SubTitle = styled.p`
  font-family: seravek;
  font-size: 18px;
  color: #ffffff;
  margin: 10px 0 0 17px;
`;
const IconBox = styled.div`
  float: right;
  text-align: right;
  margin: 0 0 0 auto;
`;
const Icon = styled.img`
  margin-right: 50px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  z-index: 1;
`;
const Icon_ = styled.img`
  cursor: pointer;
  width: 36px;
  height: 36px;
`;

export default Footer;

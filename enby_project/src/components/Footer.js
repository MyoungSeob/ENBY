import React from "react";
import styled from "styled-components";
import home from "../shared/image/bluehouse.png";
import question from "../shared/image/bluequestion.png";
import insta from "../shared/image/blueinsta.png";
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
        <TitleBox>
          <Title onClick={moveHome}>SANTA</Title>
        </TitleBox>
        <IconBox>
        <Icon_ src={insta}  />
          <Icon src={home} onClick={moveHome}/>
          <Icon src={question} onClick={googleForms}/>
         
        </IconBox>
      </FooterTitle>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f6fbff;
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
  
  @media (max-width: 600px) {
    height: 200px;
  }
`;
const FooterTitle = styled.div`
  width: 1200px;
  display: flex;
  margin: auto;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;
const TitleBox = styled.div`
  display: flex;
  width: 289px;
  height: 39px;
`;
const Title = styled.h1`
  font-family: seravek;
  font-size: 32px;
  font-style: italic;
  color: #168ed9;
  margin: 0;
  cursor : pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
  
  @media (max-width: 600px) {
    font-size: 28px;
    margin: auto 50px;
  }
`;
const IconBox = styled.div`
  float: right;
  text-align: right;
  margin: 0 0 0 auto;
  @media (max-width: 600px) {
    display: flex;
    margin: auto 50px;
  }
`;
const Icon = styled.img`
  margin-left: 50px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  z-index: 1;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
  
  @media (max-width: 600px) {
    width: 28px;
    height: 28px;
    margin-left: 4px;
    }
`;
const Icon_ = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  @media (max-width: 600px) {
    width: 24px;
    height: 24px;
    margin-top: 2px;
  }
`;

export default Footer;

import React from "react";
import styled from "styled-components";
import home from "../shared/image/bluehouse.png";
import question from "../shared/image/bluequestion.png";
import insta from "../shared/image/blueinsta.png";
import { history } from "../redux/configStore";
import logo from '../shared/image/kakaologo.png'

const Footer = (props) => {
  const googleForms = () => {
    window.open("https://forms.gle/1RNjUCKvpipXhW6RA");
  };
  const moveHome =()=>{
    window.open("https://www.notion.so/SANTA-7c68c69d05a541bb8469706ba823427f");
  };
  const moveInsta =()=>{
    window.open("https://www.instagram.com/santamountain/");
  }

  return (
    <Container>
      <FooterTitle>
        <TitleBox>
          <Title onClick={()=>{history.push('/')}} src={logo}></Title>
        </TitleBox>
        <IconBox>
        <Icon_ src={insta}  onClick={moveInsta}/>
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
  position : relative;
  z-index : 30;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
  
  @media (max-width: 600px) {
    height: 170px;
  }
`;
const FooterTitle = styled.div`
  width: 1200px;
  display: flex;
  margin: auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 720px;
  }
  @media (max-width: 600px) {
    width : 375px;
    display: flex;
    margin : auto;
  }
`;
const TitleBox = styled.div`
  display: flex;
  width: 199px;
  height: 80px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // margin-left: 100px;
    width: 200px;
  }
`;
const Title = styled.img`
width : 152px;
height : 80px;
padding-bottom : 20px;
  cursor: pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
  }

  @media (max-width: 600px) {
    font-size: 28px;
    margin: auto 12.5px;
  }
`;
const IconBox = styled.div`
  float: right;
  text-align: right;
  margin: 0 0 0 auto;
  padding-top : 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // margin-right: 160px;
  }
  @media (max-width: 600px) {
    display: flex;
    margin-right:12.5px;
    padding-top : 20px;
    
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

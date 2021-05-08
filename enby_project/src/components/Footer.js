import React from 'react';
import styled from 'styled-components';
import home from '../shared/image/home.png';
import question from '../shared/image/question.png';
import mail from '../shared/image/mail.png'

const Footer =(props)=>{
    const googleForms =()=>{
      window.location.href="https://forms.gle/1RNjUCKvpipXhW6RA"
    }

    return (
      <Container>
        <FooterTitle>
          <Title>ENBY</Title>
          <SubTitle>exercise mate near by you</SubTitle>
          <IconBox>
            <Icon src={home} />
            <Icon src={question} />
            <Icon_ src={mail} onClick={googleForms}/>
          </IconBox>
        </FooterTitle>
      </Container>
    );
}
const Container = styled.div`
    width : 100%;
    height : 298px;
    background-color : #333333;
    display : flex;
`
const FooterTitle = styled.div`
    width : 1200px;
    display : flex;
    margin : 0 auto 0 auto;
    padding : 150px 100px 0 100px;
`
const Title = styled.h1`
    font-family : seravek;
    font-size : 32px;
    font-style : italic;
    color : #FFFFFF;
    margin : 0;
`
const SubTitle = styled.p`
    font-family : seravek;
    font-size : 18px;
    color : #FFFFFF;
    margin : 10px 0 0 17px;
`
const IconBox = styled.div`
    float : right;
    text-align : right;
    margin : 0 0 0 auto;
    
`
const Icon = styled.img`
    margin-right : 50px;
    cursor : pointer;
    width : 36px;
    height : 36px;
`
const Icon_ = styled.img`
  cursor : pointer;
  width : 36px;
  height : 36px;
`

export default Footer;
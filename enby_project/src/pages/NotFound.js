import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';

const NotFound = (props) =>{
    const moveHome=()=>{
        history.replace('/');
    }
    return (
      <Container>
        <Title>⛰올바르지 않은 주소입니다⛰</Title>
        <ButtonBox><Button onClick={moveHome}>돌아가기</Button></ButtonBox>
      </Container>
    );
}
const Container = styled.div`
    width : 1200px;
    height : 600px;
    margin : auto;

`
const Title = styled.h1`
    margin : 0;
    text-align : center;
    text-size : 30px;
    padding-top : 250px;
`
const ButtonBox = styled.div`
    width : 1200px;
    margin-top : 50px;
    text-align : center;

`
const Button = styled.button`
  width: 167px;
  height: 40px;
  margin: auto;
  border-radius: 20px;
  border: none;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #168ed9;
  color: #ffffff;
  cursor: pointer;
  &: hover {
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
    background-color : #0d73b2;
  }
`;

export default NotFound;
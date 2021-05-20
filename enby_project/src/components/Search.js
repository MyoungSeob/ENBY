// 검색 기능 구현 시 사용 할 컴포넌트!

import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import serachicon from "../shared/image/searchicon.png";

const Search=(props)=> {

  const [text, setText] = useState("");
  const search = () => {
    if (text === "") {
      window.alert("검색어를 입력해주세요!");
    } else {
      if (props.where === "mating") {
        history.push(`/mating/search/${text}`);
      } 
      if(props.where === "review"){
        history.replace(`/board/review/search/${text}`);
      }
    }
  };

  return (
    <Container>
      <SearchGrid>
        <SearchBox
          placeholder="찾으시는 모임이 있으신가요?"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          onKeyPress ={
            (e) => {
              if(e.key === 'Enter'){
                search()
              }
            }
          }
        />
        <Icon onClick={search} />
      </SearchGrid>
    </Container>
  );
}

const Container = styled.div`
width : 100%;
    display: block;
    margin : auto;
    float : left;
    & text {
        margin-left: 17px;
        width: 67px;
        height: 26px;
        font-family: notosans_regular;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #7B7B7B;
        margin-bottom: 7px;
    }
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 200px;
      margin: 20px 0 0 0;
      }
    @media (max-width: 600px) {
      & text {
          font-size: 16px;
      }
      margin-left: 20px;
      margin-top: -10px;
    }
`;

const SearchBox = styled.input`
  padding: 0px 20px;
  // padding-right : 45px;
  width: 350px;
  height: 40px;
  // margin: 7px auto 0 0;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 30px;
  position: absolute;
  outline: none;
  &: hover {
    border: 1px solid #168ed9;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
  }

  @media (max-width: 600px) {
    width: 280px;
    height: 35px;
  }
`;
const Icon = styled.div`
position : relative;
width : 23px;
height : 23px;
background-image : url(${serachicon});
background-repeat : no-repeat;
float : right;
margin : 8px 16px 0 0;
cursor : pointer;
@media (max-width: 600px) {
  margin-right: 80px; 
}
`
const Subtitle = styled.div`
  margin-bottom: 10px;
`;
const SearchGrid = styled.div`
  width: 350px;
  display: block;
`;
export default Search;

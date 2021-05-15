// 검색 기능 구현 시 사용 할 컴포넌트!

import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import serachicon from '../shared/image/searchicon.png'

function Search() {
    const [text, setText] = useState("");

    const search =()=>{
        if(text === ""){
            window.alert("검색어를 입력해주세요!")
        }else{
            history.push(`/mating/search/${text}`)
        }
    }
    return (
      <Container>
        <Subtitle>
          <text>검색하기</text>
        </Subtitle>
        <SearchGrid>
          <SearchBox
            placeholder="찾으시는 모임이 있으신가요?"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <Icon onClick={search}/>
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
`;

const SearchBox = styled.input`
    padding: 0px 20px;
    // padding-right : 45px;
    width: 350px;
    height: 40px;
    // margin: 7px auto 0 0;
    background: #FFFFFF;
    border: 1px solid #B9B9B9;
    box-sizing: border-box;
    border-radius: 30px;
    position : absolute;
    outline : none;

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
`
const Subtitle = styled.div`
    margin-bottom : 10px;
`
const SearchGrid = styled.div`
width : 350px;
display : block;
`
export default Search

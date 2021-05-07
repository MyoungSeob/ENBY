// 검색 기능 구현 시 사용 할 컴포넌트!

import React from 'react';
import styled from 'styled-components';

function Search() {
    return (
        <SearchBox
        placeholder="찾으시는 모임이 있으신가요?"
        >
        </SearchBox>
    )
}

const SearchBox = styled.input`
    // // position: absolute;
    // width: 467px;
    // height: 40px;
    // left: 360px;
    // top: 932px;
    // margin: 60px 0px 0px 60px;

    // background: #FFFFFF;
    // border: 1px solid #B9B9B9;
    // box-sizing: border-box;
    // border-radius: 30px;
    
    // // 폰트 아직 적용 안됨
    padding: 0px 20px;

    position: absolute;
width: 467px;
height: 40px;
left: 360px;
top: 932px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 30px;
`;

export default Search

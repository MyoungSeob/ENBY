// 검색 기능 구현 시 사용 할 컴포넌트!

import React from 'react';
import styled from 'styled-components';

function Search() {
    return (
        <Container>
            <text>검색하기</text>
            <SearchBox
            placeholder="찾으시는 모임이 있으신가요?"
            >
            </SearchBox>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction:column;
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

    width: 467px;
    height: 40px;
    // margin: 7px auto 0 0;
    background: #FFFFFF;
    border: 1px solid #B9B9B9;
    box-sizing: border-box;
    border-radius: 30px;
`;

export default Search

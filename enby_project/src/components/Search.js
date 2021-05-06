// 검색 기능 구현 시 사용 할 컴포넌트!

import React from 'react';
import styled from 'styled-components';

function Search() {
    return (
        <SearchBox/>
    )
}

const SearchBox = styled.input`
    // position: absolute;
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

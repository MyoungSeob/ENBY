import React from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Search from '../components/Search';
import styled from 'styled-components';

function MatingBoard() {
    return (
        <div>
            <Carousel />
            <Container>
            <Search />
                <Button1>
                    <text>모든 모임</text>
                </Button1>
                <Button2>
                    <text>모집 중</text>
                </Button2>
                <Button3>
                    <text>마감</text>
                </Button3>
            </Container>
            <CardList />
        </div>
    )
}

const Container = styled.div`
    margin: 300px;
`;
const Button1 = styled.button`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 48px;

    position: absolute;
    width: 167px;
    height: 39px;
    left: 1053px;
    top: 933px;

    background: #000000;
    border-radius: 20px;
    cursor: pointer;

    & text {
        font-family : notosans_regular;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 150%;
        text-align: center;

        color: #FFFFFF;
        flex: none;
        order: 0;
        flex-grow: 0;
        // margin: 0px 10px;
    }
`;

const Button2 = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 48px;

position: absolute;
width: 150px;
height: 39px;
left: 1250px;
top: 933px;

border: 1px solid #000000;
box-sizing: border-box;
border-radius: 20px;
cursor: pointer;
& text {
    font-family : notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */
    text-align: center;

    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
    // margin: 0px 10px;

}
`;

const Button3 = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 48px;

position: absolute;
width: 130px;
height: 39px;
left: 1430px;
top: 933px;

border: 1px solid #000000;
box-sizing: border-box;
border-radius: 20px;
cursor: pointer;

& text {
    font-family : notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */
    text-align: center;

    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
    // margin: 0px 10px;
}
`;
export default MatingBoard

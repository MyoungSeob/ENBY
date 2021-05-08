import React from 'react'
import ReviewCardList from '../components/ReviewCardList'
import Search from '../components/Search';
import styled from 'styled-components';

function ReviewBoard() {
    return (
        <div>
            <Head>
                <SubTitle1>
                    Share your experience with ENBY!
                </SubTitle1>
                <Title>
                    Reviews
                </Title>
                <SubTitle2>
                    당신의 엔비를 공유해주세요!
                </SubTitle2>
            </Head>
            {/* <Search /> */}
                {/* <Button1>
                    <text>모든 모임</text>
            </Button1> */}
            <Container>
                <ReviewCardList />
            </Container>
        </div>
    )
}

const Head = styled.div`
    width: 1200px;
    height: 221px;
`;

const SubTitle1 = styled.text`
    position: absolute;
    width: 282px;
    height: 26px;
    left: 360px;
    top: 140px;

    font-family: notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height */

    color: #7D7D7D;
`;

const Title = styled.text`
    position: absolute;
    width: 132px;
    height: 37px;
    left: 360px;
    top: 168px;

    font-family: ;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;

    color: #000000;
`;

const SubTitle2 = styled.text`
    position: absolute;
    width: 291px;
    height: 28px;
    left: 360px;
    top: 234px;

    font-family: notosans_regular;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;

    color: #3A3A3A;
`;

const Container = styled.div`
    position: absolute;
    width: 1920px;
    height: auto;
    height: 2803px;
    left: 1px;
    top: 321px;

    background: #F8F8F8;
`;
export default ReviewBoard

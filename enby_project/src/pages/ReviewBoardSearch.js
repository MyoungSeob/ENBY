import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { history } from "../redux/configStore";
import axios from "axios";
import Loading from "../components/Loading";
import ReviewCard from '../components/ReviewCard'

const ReviewBoardSearch = (props) => {
    const id = props.match.params.id;
  console.log(id)

  const [api, setApi] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async (param) => {
      try {
        setLoading(true);
        const id = props.match.params.id;
        const response = await axios({
          method: "get",
          url: `http://3.36.67.251:8080/review/search?Keyword=` + `${id}`,
        });
        setApi(response.data.review);
        console.log(response)
      } catch (e) {
        setError(e);
        console.log(e)
      }
      setLoading(false);
    };
    search();
  }, [id]);
  console.log(api);
  const isSearchResult =()=>{
    if(!api || api.length === 0){
        return <NonResult>검색 결과가 없습니다</NonResult>
    }else{
       return api.map((p)=>{
            return <ReviewCard key={p.id} {...p}/>
        })
        
    }
  }

    const searchWhere ={
        where : "review"
    }
    if(loading){
        return <Loading />
    }else{
        return(
            <Container>
            <Head>
              <SubTitle1>Share your experience with ENBY!</SubTitle1>
              <Title>Reviews</Title>
              <SubTitle2>당신의 엔비를 공유해주세요!</SubTitle2>
            </Head>
            <Main>
              <Top>
                <Search {...searchWhere}/>
                <ButtonBox>
                  <Button>후기글 작성하기</Button>
                </ButtonBox>
              </Top>
              </Main>
              <ResultBox>
              <ResultContents>
                  <Contents>"{id}"에 대한 검색결과</Contents>
              </ResultContents>
              {isSearchResult()}
          </ResultBox>
          </Container>
        )
    }
}
const Container = styled.div`
    width: 1200px;
    margin: auto;
`;
const Head = styled.div`
    height: 130px;
    margin: 37px 0 54px 0;
`;
const Top = styled.div`
    display: flex;
    justify-content : space-between;
    margin-bottom : 54px;
`;
const SubTitle1 = styled.div`
    // width: 282px;
    height: 26px;
    font-family: notosans_regular;
    margin-top: 2px;
    font-size: 18px;
    line-height: 26px;
    color: #7D7D7D;
`;

const Title = styled.div`
    width: 132px;
    height: 37px;

    font-family: seravek;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;

    color: #000000;
`;

const SubTitle2 = styled.div`
    width: 291px;
    height: 28px;
    margin-top: 27px;
    font-family: notosans_regular;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;

    color: #3A3A3A;
`;

const Main = styled.div`
    width: 1200px;
    height: 100%;
    margin : auto;
    background: #ffffff;

    background-size: cover;
`;
const ButtonBox = styled.div`
    display : inline-block;
    float : right;
    padding-top: 46px;
`

const Button = styled.button`
    width: 167px;
    height: 40px;
    border: none;
    background: #168ed9;
    border-radius: 20px;
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    // margin-left: 540px;
    cursor: pointer;
`;
const ResultBox = styled.div`
  width : 1200px;
  margin : auto auto 80px auto;
`
const NonResult = styled.p`
font-family: notosans_regular;
    font-size: 18px;
    text-align : center;
`
const ResultContents = styled.div`
  margin-bottom : 80px;
`
const Contents = styled.p`
    font-family: notosans_regular;
    font-size: 18px;
`

export default ReviewBoardSearch;
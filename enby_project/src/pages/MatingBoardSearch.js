import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { history } from "../redux/configStore";
import axios from "axios";
import Loading from "../components/Loading";
import santa from '../shared/image/MatingBanner.png'
import Card from "../components/Card";
import { useMediaQuery } from "react-responsive";

const MatingBoardSearch = (props) => {
  //반응형
  const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const id = props.match.params.id;

  const [api, setApi] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async (param) => {
      try {
        setLoading(true);
        const response = await axios({
          method: "get",
          url: `http://3.36.67.251:8080/board/search?Keyword=` + `${id}`,
        });
        setApi(response.data.board);
      } catch (e) {
        setError(e);
        window.alert(error);
      }
      setLoading(false);
    };
    search();
  }, [id]);
  const isSearchResult =()=>{
    if(!api || api.length === 0){
        return <NonResult>검색 결과가 없습니다</NonResult>
    }else{
       return api.map((p)=>{
            return <Card key={p.id} {...p}/>
        })
        
    }
  }
  const searchWhere = {
    where : "mating"
  }  

  if(loading){
    return  <Loading />
  }else{
    return (
        <Container>
          <Image src={santa} />
          <TopButton>
            <Search {...searchWhere}/>
            {!isMobile? (
              <Button4
              onClick={() => {
                history.push(`/board/write`);
              }}
            >
              <button>모임 만들기</button>
            </Button4>
            ) : (<FloatingBtn onClick={() => {
              history.push(`/board/write`);
            }}>모임 만들기</FloatingBtn>)}
            
          </TopButton>
          <ResultBox>
              <ResultContents>
                  <Contents>"{id}"에 대한 검색결과</Contents>
              </ResultContents>
              {isSearchResult()}
          </ResultBox>
        </Container>
      );
    };
  }
  

const Image = styled.img`
  width: 100%;
  min-width: 1200px;
  // max-height : 720px;
  @media (max-width: 600px) {
    width: 100%;
    min-width: 220px;
    height: 200px;
    object-fit: cover;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
`;

const TopButton = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 98px auto 92px auto;
  @media (max-width: 600px) {
    margin-top: 36px;
    margin-bottom: 36px;
  }
`;
const Button4 = styled.div`
  float: right;
  margin-top: 34px;
  & button {
    background: #168ed9;
    border-radius: 20px;
    color : #ffffff;
    border: none;
    cursor: pointer;
    width: 167px;
    height: 40px;
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
  }
`;
const ResultBox = styled.div`
  width : 1200px;
  margin : auto auto 80px auto;
  @media (max-width: 600px) {
    width: 365px;
    margin: auto;
  }
`
const NonResult = styled.p`
font-family: notosans_regular;
    font-size: 18px;
    text-align : center;
`
const ResultContents = styled.div`
  margin-bottom : 80px;
  @media (max-width: 600px) {
    margin-bottom: 36px;
  }
`
const Contents = styled.p`
    font-family: notosans_regular;
    font-size: 18px;
    @media (max-width: 600px) {
      margin-left: 10px;
      font-size: 16px;
    }
`
const FloatingBtn = styled.button`
  position: fixed;
  width: 70px;
  height: 70px;
  font-family: notosans_regular;
  font-size: 11px;
  color: #000;
  background-color: #BBCFDC;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  z-index: 2;
  bottom: 50px;
  right: 30px;
`;
export default MatingBoardSearch;

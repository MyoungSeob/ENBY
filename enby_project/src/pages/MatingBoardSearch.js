import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { history } from "../redux/configStore";
import axios from "axios";
import Loading from "../components/Loading";
import santa from '../shared/image/MatingBanner.png'
import Card from "../components/Card";

const MatingBoardSearch = (props) => {
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
            <Button4
              onClick={() => {
                history.push(`/board/write`);
              }}
            >
              <button>모임 만들기</button>
            </Button4>
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
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

const TopButton = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 98px auto 92px auto;
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
export default MatingBoardSearch;

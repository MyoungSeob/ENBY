import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { history } from "../redux/configStore";
import axios from "axios";
import Loading from "../components/Loading";
import santa from '../shared/image/MatingBanner.png'
import Card from "../components/Card";
import { useMediaQuery } from "react-responsive";
import swal from 'sweetalert';
import ReactGA from 'react-ga';

const MatingBoardSearch = (props) => {
  useEffect(()=>{
    getGA();
  }, []);

  const getGA =()=>{
    const pathName = window.location.pathname;
    ReactGA.initialize('G-YCWTTJWZF4');
    ReactGA.set({page : pathName});
    ReactGA.pageview(pathName);
  }
  //반응형
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });
  // search 컴포넌트에서 넘어오는 단어가 id값이 됩니다.
  const id = props.match.params.id;

  const [api, setApi] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async와 await를 이용하여 검색을 할 때 동기적일 수 있도록 함.
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
        swal(error);
      }
      setLoading(false);
    };
    search();
  }, [id]);
  // 결과값이 있을 경우와 없을 경우를 나타냅니다.
  const isSearchResult =()=>{
    if(!api || api.length === 0){
        return <NonResult>검색 결과가 없습니다</NonResult>
    }else{
       return api.map((p)=>{
            return <Card key={p.id} {...p}/>
        })
        
    }
  }
  // search에 넣어줄 props값입니다.
  const searchWhere = {
    where : "mating"
  }  
  //검색 후 결과값을 기다리는 동안 로딩화면을 보여줍니다.
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
  @media (min-width: 600px) and (max-width: 1170px) {
  }
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
    &: hover {
      transition-duration: 0.15s;
      transition-timing-function: ease-out;
      transition-delay: 0s;
      background-color : #0d73b2;
    }
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    margin: 60px 50px 0 auto;
  }
`;
const ResultBox = styled.div`
  width : 1200px;
  margin : auto auto 80px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 760px;
    margin-left: auto;
  }
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
    @media (min-width: 600px) and (max-width: 1170px) {
      margin-left: 20px;
    }
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

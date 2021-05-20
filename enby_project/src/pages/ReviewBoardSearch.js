import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { history } from "../redux/configStore";
import axios from "axios";
import Loading from "../components/Loading";
import ReviewCard from '../components/ReviewCard'
import { useMediaQuery } from "react-responsive";
import { useSelector } from 'react-redux';
import {actionsCreators as userActions} from '../redux/modules/user'
import Modal from '../components/Modal';
import CardListForModal from '../components/CardListForModal';
import Pagination from '../components/ReviewBoardPagination';


const ReviewBoardSearch = (props) => {
    //반응형
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

    const id = props.match.params.id;

  const [api, setApi] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apply_list = useSelector((store) => store.user.apply_list)
  const empty_list = apply_list.length === 0? true : false;

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

      } catch (e) {
        setError(e);

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
            return <ReviewCard key={p.id} {...p}/>
        })
        
    }
  }

  // Modal  
  const [ modalOpen, setModalOpen ] = useState(false);
  const openModal = () => {
      if(localStorage.getItem('token') !== null){
          setModalPosts(apply_list);
          setModalOpen(true);
      }else{
          window.alert('후기글 작성은 로그인이 후 이용 가능합니다.')
      }
      
  }
  const closeModal = () => {
      setModalOpen(false);
  }

  // 모달 페이지네이션
  const [modalPosts, setModalPosts] = useState([]);
  const [currentModalPage, setCurrentModalPage] = useState(1);
  const [modalPostsPerPage, setModalPostsPerPage] = useState(2);
  const indexOfLastModal = currentModalPage * modalPostsPerPage;
  const indexOfFirstModal = indexOfLastModal - modalPostsPerPage;
  
  function currentModalPosts(tmp) {
      let currentModalPosts = 0;
      currentModalPosts = tmp.slice(indexOfFirstModal, indexOfLastModal);
      return currentModalPosts;
  }

    const searchWhere ={
        where : "review"
    }
    if(loading){
        return <Loading />
    }else{
        return(
            <Container>
              {isDesktop? 
              (
              <Head>
              <SubTitle1>Share your experience with SANTA!</SubTitle1>
              <Title>Reviews</Title>
              <SubTitle2>당신의 SANTA를 공유해주세요!</SubTitle2>
            </Head>
            ) : (
              <HeadContainer>
                <Head>
                <SubTitle1>Share your experience with SANTA!</SubTitle1>
                <Title>Reviews</Title>
                <SubTitle2>당신의 SANTA를 공유해주세요!</SubTitle2>
                </Head>
            </HeadContainer>
            )}
            <Main>
              <Top>
                <Search {...searchWhere}/>
                {!isMobile? (<ButtonBox>
                  <Button onClick={openModal}>후기글 작성하기</Button>
                </ButtonBox>) : (<FloatingBtn
              onClick={openModal}>후기글<br/>작성하기</FloatingBtn>
            )}
                
              </Top>
              </Main>
              <ResultBox>
              <ResultContents>
                  <Contents>"{id}"에 대한 검색결과</Contents>
              </ResultContents>
              {isSearchResult()}
          </ResultBox>
          {empty_list ? (
            <Modal open={modalOpen} close={closeModal} header="후기 작성하기">
              현재 후기를 남길 모임이 없어요🥲 <br />
              <button>모임 참여하러 가기!</button>
            </Modal>
          ) : (
            <Modal open={modalOpen} close={closeModal} header="후기 작성하기">
              <CardListForModal apply_list={currentModalPosts(modalPosts)} />
              <Paging>
                <Pagination
                  postsPerPage={modalPostsPerPage}
                  totalPosts={apply_list.length}
                  paginate={setCurrentModalPage}
                />
              </Paging>
            </Modal>
          )}
          </Container>
        )
    }
}
const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: auto;
    @media (max-width: 600px) {
      width: 100%;
      max-width: 375px;
      overflow: hidden;
    }
`;
const HeadContainer = styled.div`
  background-color: #BBCFDC;
  height: 160px;
  width: 100%;
  min-width: 320px;
  padding: 10px;
  @media (min-width: 600px) and (max-width: 1170px) {
    padding-bottom: 20px;
    }
`;
const Head = styled.div`
    height: 130px;
    margin: 37px 0 54px 0;
    @media (max-width: 600px) {
      margin-left: 30px;
      margin-top: 20px;
    }
`;
const Top = styled.div`
    display: flex;
    justify-content : space-between;
    margin-bottom : 54px;
      @media (max-width: 600px) {
      width: 320px;
      z-index: 1;
      margin: 40px 20px;
    }

`;
const SubTitle1 = styled.div`
    // width: 282px;
    height: 26px;
    font-family: notosans_regular;
    margin-top: 2px;
    font-size: 18px;
    line-height: 26px;
    color: #7D7D7D;
    @media (max-width: 600px) {
      font-size: 13px;
    }
`;

const Title = styled.div`
    width: 132px;
    height: 37px;

    font-family: seravek;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;

    color: #000000;
    @media (max-width: 600px) {
      font-size: 28px;
    }
`;

const SubTitle2 = styled.div`
    width: 291px;
    height: 28px;
    margin-top: 27px;
    font-family: notosans_regular;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    @media (min-width: 600px) and (max-width: 1170px) {
      font-size: 18px;
      margin-top: 18px;
      }
    color: #3A3A3A;
    @media (max-width: 600px) {
      font-size: 13px;
    }
`;

const Main = styled.div`
    width: 1200px;
    height: 100%;
    margin : auto;
    background: #ffffff;

    background-size: cover;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 100%;
    }
    
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
    &: hover {
      transition-duration: 0.15s;
      transition-timing-function: ease-out;
      transition-delay: 0s;
      background-color : #0d73b2;
    }
    @media (min-width: 600px) and (max-width: 1170px) {
      margin-right: 50px;
    }
`;
const ResultBox = styled.div`
  width : 1200px;
  margin : auto auto 80px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 760px;
    margin: auto;
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
    @media (max-width: 600px) {
      margin-left: 10px;
      font-size: 16px;
    }
`
const Paging = styled.div`
    max-width : 1064px;
    width: 100%;
    overflow : hidden;
    position: fixed;
    margin-top: 435px;
    @media (max-width: 600px) {
      width: 320px;
      margin-top: 280px;
      margin-left: -35px;
    }
`;
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

export default ReviewBoardSearch;
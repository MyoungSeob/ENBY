import React, { useState, useEffect }  from 'react'
import ReviewCardList from '../components/ReviewCardList'
import Search from '../components/Search';
import styled from 'styled-components';
import Modal from '../components/Modal';
import Card from '../components/Card';
import CardListForModal from '../components/CardListForModal';
import Pagination from '../components/ReviewBoardPagination';

import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as userActions} from '../redux/modules/user'
import {actionsCreators as postActions} from '../redux/modules/post'
import jwt_decode from 'jwt-decode';
import { useMediaQuery } from "react-responsive";
import swal from 'sweetalert';
import { history } from '../redux/configStore';
  
function ReviewBoard() {  
    // 반응형 구현
    const isDesktop = useMediaQuery({
      query: "(min-width: 1170px)"
    });
    const isMobile = useMediaQuery({
      query: "(max-width: 600px)"
    });


     // 참여했던 모임
     const dispatch = useDispatch();
     const apply_list = useSelector((store) => store.user.attend_list)
     const wroteReviewList = useSelector((store) => store.post.needWrite_list)
     const empty_list = wroteReviewList.length === 0? true : false;
    // Modal  
    const [ modalOpen, setModalOpen ] = useState(false);
    const openModal = () => {
        if(localStorage.getItem('token') !== null){
            setModalPosts(apply_list);
            setModalOpen(true);
        }else{
          swal('후기글 작성은 로그인이 후 이용 가능합니다.')
        }
        
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    
    const move_page = () => {
      history.push("/board/mating");
    }
    const emptySwal = () => {
      
      empty_list ? 
        swal ("현재 후기를 남길 모임이 없어요🥲")
        // {buttons: {
        //   check: {
        //     text: "모임 구경하러 가기",
        //     value: "yes"
        //   },
        // }})
        // .then(() => {
          // switch (value) {
          //   case "yes":
            // history.push("/board/mating");
          // }); 
         
          : openModal()
    }
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
          const token = localStorage.getItem("token");
          const decode = jwt_decode(token);
          const name = decode.nickname;
          dispatch(userActions.getMyProfileDB(name));
          dispatch(postActions.getNeedWriteRiviewAPI())
        }
        // for Modal pagination
      }, []);

    //  리뷰페이지 pagination
    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const review_list = useSelector((store) => store.post.review_list)
    const posts = review_list
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    // 모달 페이지네이션
    const [modalPosts, setModalPosts] = useState([]);
    const [currentModalPage, setCurrentModalPage] = useState(1);
    const [modalPostsPerPage, setModalPostsPerPage] = useState(isMobile ? 2 : 3);
    const indexOfLastModal = currentModalPage * modalPostsPerPage;
    const indexOfFirstModal = indexOfLastModal - modalPostsPerPage;
    
    function currentModalPosts(tmp) {
        let currentModalPosts = 0;
        currentModalPosts = tmp.slice(indexOfFirstModal, indexOfLastModal);
        return currentModalPosts;
    }

    const searchWhere={
        where : "review"
    }
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () =>{
      const position = window.pageYOffset;
      setScrollPosition(position)
    }
    useEffect(()=>{
      window.addEventListener('scroll', handleScroll, {passive : true});
        return() => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

  const floatingButton =()=>{
    if (window.pageYOffset > 400 && 1200 > window.pageYOffset && isDesktop) {
      return <FloatWriteButton onClick={openModal}>+</FloatWriteButton>;
    }
  }

    return (
      <Container>
        {!isDesktop?
        (<HeadContainer>
          <Head>
            <SubTitle1>Share your experience with SANTA!</SubTitle1>
            <Title>Reviews</Title>
            <SubTitle2>당신의 SANTA를 공유해주세요!</SubTitle2>
          </Head>
        </HeadContainer>)
          : 
        (<Head>
          <SubTitle1>Share your experience with SANTA!</SubTitle1>
          <Title>Reviews</Title>
          <SubTitle2>당신의 SANTA를 공유해주세요!</SubTitle2>
        </Head>
        )}
        
        <Main>
          <Top>
            <Search {...searchWhere}/>
            {isMobile ? (
              <FloatingBtn
              onClick={ () => {
                emptySwal()
                }
              }>후기글<br/>작성하기</FloatingBtn>
            ) : (
            <ButtonBox>
              {/* <Button onClick={openModal}>후기글 작성하기</Button> */}
              <Button onClick={ () => {
                emptySwal()
              }}>후기글 작성하기</Button>
            </ButtonBox>)}
            {floatingButton()}
          </Top>
          <ReviewCardList review_list={currentPosts(posts)} />
          <Pagination id ="move"
            postsPerPage={postsPerPage}
            totalPosts={review_list.length}
            paginate={setCurrentPage}
          />
          <Modal open={modalOpen} close={closeModal} header="후기 작성하기">
            <CardListForModal wroteReviewList={currentModalPosts(modalPosts)} />
            <Paging>
              <Pagination
                postsPerPage={modalPostsPerPage}
                totalPosts={wroteReviewList.length}
                paginate={setCurrentModalPage}
              />
            </Paging>
          </Modal>
        </Main>
      </Container>
    );
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
    height: 170px;
    }
`;
const Head = styled.div`
    height: 130px;
    margin: 37px 0 54px 0;
    @media (min-width: 600px) and (max-width: 1170px) {
      margin-left: 20px;
      }
    @media (max-width: 600px) {
      margin-left: 30px;
      margin-top: 20px;
    }
`;
const Top = styled.div`
    display: flex;
    justify-content : space-between;
    margin-bottom : 54px;
    @media (min-width: 600px) and (max-width: 1170px) {
      margin: 54px 0 54px 0;
    }
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
    width: 330px;
    height: 28px;
    margin-top: 27px;
    font-family: notosans_regular;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    color: #3A3A3A;
    @media (min-width: 600px) and (max-width: 1170px) {
      font-size: 18px;
      margin-top: 20px;
      }
    @media (max-width: 600px) {
      font-size: 13px;
    }
`;

const Main = styled.div`
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin : auto;
    background: #ffffff;

    background-size: cover;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 760px;
      margin: auto;
    }
    @media (max-width: 600px) {
      width: 100%;
      min-width: 320px;
    }
`;
const ButtonBox = styled.div`
    display : inline-block;
    float : right;
    padding-top: 6px;
    @media (min-width: 600px) and (max-width: 1170px) {
      padding-top:0;
    }
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
      margin-right: 10px;
      }
`;
const Paging = styled.div`
    max-width : 1064px;
    width: 100%;
    overflow : hidden;
    position: fixed;
    margin-top: 435px;
    @media(max-width: 1170px) {
      width: 600px;
      margin-left: 60px;
      margin-top: 360px;
    }
    @media (max-width: 820px) {
      width: 440px;
      margin-left: -20px;
      margin-top: 360px;
    }
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
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 80px;
    height: 80px;
    bottom: 150px;
    right: 80px;
    font-size: 13px;
    }
`;
const FloatWriteButton = styled.button`
  display : inline;
  width : 60px;
  height : 60px;
  border-radius 640px;
  background-color : #BBCFDC;
  position : fixed;
  right : 120px;
  bottom : 120px;
  z-index : 30;
  font-size : 40px;
  border : none;
  color : #ffffff;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  cursor : pointer;
  &: hover {
    width : 70px;
    height : 70px;
    font-size : 50px;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
`
export default ReviewBoard



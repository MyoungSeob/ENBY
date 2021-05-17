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
import jwt_decode from 'jwt-decode';

function ReviewBoard() {  
     // 참여했던 모임
     const dispatch = useDispatch();
     const apply_list = useSelector((store) => store.user.apply_list)
     const empty_list = apply_list.length === 0? true : false;
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
    

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
          const token = localStorage.getItem("token");
          const decode = jwt_decode(token);
          const name = decode.nickname;
          dispatch(userActions.getMyProfileDB(name));
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
    const [modalPostsPerPage, setModalPostsPerPage] = useState(3);
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
    return (
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
              <Button onClick={openModal}>후기글 작성하기</Button>
            </ButtonBox>
          </Top>
          <ReviewCardList review_list={currentPosts(posts)} />
          <Pagination id ="move"
            postsPerPage={postsPerPage}
            totalPosts={review_list.length}
            paginate={setCurrentPage}
          />
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
        </Main>
      </Container>
    );
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

    color: #3A3A3A;
    @media (max-width: 600px) {
      font-size: 18px;
    }
`;

const Main = styled.div`
    width: 1200px;
    height: 100%;
    margin : auto;
    background: #ffffff;

    background-size: cover;
    @media (max-width: 600px) {
      width: 100%;
      min-width: 320px;
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
`;
const Paging = styled.div`
    width : 1064px;
    overflow : hidden;
    position: fixed;
    margin-top: 435px;
`;

export default ReviewBoard

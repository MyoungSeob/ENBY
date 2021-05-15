import React, { useState, useEffect }  from 'react'
import ReviewCardList from '../components/ReviewCardList'
import Search from '../components/Search';
import styled from 'styled-components';
import Modal from '../components/Modal';
import Card from '../components/Card';
import CardListForModal from '../components/CardListForModal';
import Pagination from '../components/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as userActions} from '../redux/modules/user'
import jwt_decode from 'jwt-decode';

function ReviewBoard() {  

    // Modal  
    const [ modalOpen, setModalOpen ] = useState(false);
    const openModal = () => {
        if(localStorage.getItem('token') !== null){
            setModalOpen(true);
        }else{
            window.alert('후기글 작성은 로그인이 후 이용 가능합니다.')
        }
        
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    // 참여했던 모임
    const dispatch = useDispatch();
    const apply_list = useSelector((store) => store.user.apply_list)
    const empty_list = apply_list.length === 0? true : false;

    


    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
          const token = localStorage.getItem("token");
          const decode = jwt_decode(token);
          const name = decode.nickname;
          dispatch(userActions.getMyProfileDB(name));
          setModalPosts(apply_list);
        }
        // for Modal pagination
      }, []);

    //  리뷰페이지 pagination
    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
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

    return (
        <Container>
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
            <Main>
                <Top>
                    <Search />
                    <Button
                        onClick={ openModal }>
                    후기글 작성하기
                    </Button>
                </Top>
                <ReviewCardList review_list={currentPosts(posts)}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={review_list.length} paginate={setCurrentPage} />
                {empty_list? (
                    <Modal open={ modalOpen } close={ closeModal } header="후기 작성하기">
                        현재 후기를 남길 모임이 없어요🥲 <br/>
                        <button>모임 참여하러 가기!</button>                        
                    </Modal>
                ) : (
                    <Modal open={ modalOpen } close={ closeModal } header="후기 작성하기">
                        <CardListForModal apply_list={currentModalPosts(modalPosts)}/>
                        <Paging>
                            <Pagination postsPerPage={modalPostsPerPage} totalPosts={apply_list.length} paginate={setCurrentModalPage} />
                        </Paging>
                    </Modal>
                )}
            </Main>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
`;
const Head = styled.div`
    height: 264px;
    margin-top: 68px;
    display: flex;
    flex-direction:column;
`;
const Top = styled.div`
    display: flex;
`;
const SubTitle1 = styled.text`
    // width: 282px;
    height: 26px;
    font-family: notosans_regular;
    margin-top: 2px;
    font-size: 18px;
    line-height: 26px;
    color: #7D7D7D;
`;

const Title = styled.text`
    width: 132px;
    height: 37px;

    font-family: seravek;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;

    color: #000000;
`;

const SubTitle2 = styled.text`
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
    width: 100%;
    // max-width: 1920px;
    height: 100%;
    padding: 85px 200px;
    background: #F8F8F8;
    margin-left: -180px;
    margin-top: -80px;
    background-size: cover;
`;

const Button = styled.button`
    width: 167px;
    height: 40px;
    border: none;
    background: #F1B100;
    border-radius: 20px;
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #392600;
    margin-top: 80px;
    // margin-left: 540px;
    cursor: pointer;
    margin-right: 30px;
    float: right;
`;
const Paging = styled.div`
    position: fixed;
    margin-top: 455px;
`;

export default ReviewBoard

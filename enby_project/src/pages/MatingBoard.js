import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Search from '../components/Search';
import styled from 'styled-components';
import main_carousel2 from '../shared/image/main_carousel2.png';
import Pagination from '../components/MatingBoardPagination';
import { useDispatch, useSelector } from 'react-redux';
import { history } from "../redux/configStore";
import {actionsCreators as postActions} from '../redux/modules/post'


function MatingBoard(props) {
    const dispatch = useDispatch();
    // pagination
    // const [allposts, setAllPosts] = useState([]);
    const [deadlinePosts, setDeadlinePosts] = useState([]);
    const [isNotDeadlinePosts, setIsNotDeadlinePosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const [allMoim, setAllMoim] = useState(true);
    const [isDeadline, setIsDeadline] = useState(false);
    const [isNotDeadline, setIsNotDeadline] = useState(false);

    const selectButton={allMoim, isDeadline, isNotDeadline}

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const post_list = useSelector((store) => store.post.list)
    
    const allposts = post_list // useState대신 바로 값에 넣어주니 새로고침해도 안사라지더라구요..!
    console.log(isNotDeadlinePosts)
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
        
    useEffect(() => {
      dispatch(postActions.getPostMainDB());
      const isRecruitment = [];
      const deadRecruitment = [];
      for (let i = 0; i < post_list.length; i++) {
        if (post_list[i].deadlineStatus === false) {
          isRecruitment.push(post_list[i]);
        } else {
          deadRecruitment.push(post_list[i]);
        }
      }
      // setAllPosts(post_list);
      setDeadlinePosts(deadRecruitment);
      setIsNotDeadlinePosts(isRecruitment)
    }, []);

    const allMoimTrueFalse=()=>{
        if(!allMoim){
            return <Button1
            onClick={() => {
              setAllMoim(true);
              setIsDeadline(false);
              setIsNotDeadline(false);
            }}
          >
            <text>모든 모임</text>
          </Button1>
        }else{
            return <Button1True
            onClick={() => {
              setAllMoim(true);
              setIsDeadline(false);
              setIsNotDeadline(false);
            }}
          >
            <text>모든 모임</text>
          </Button1True>
        }
    }
    const isNotDeadlineTrueFalse=()=>{
        if(!isNotDeadline){
            return(
                <Button2
              onClick={() => {
                setAllMoim(false);
                setIsDeadline(false);
                setIsNotDeadline(true);
              }}
            >
              <text>모집 중</text>
            </Button2>
            )
        }else{
            return(
                <Button2True
              onClick={() => {
                setAllMoim(false);
                setIsDeadline(false);
                setIsNotDeadline(true);
              }}
            >
              <text>모집 중</text>
            </Button2True>
            )
        }
    }
    const isDeadlineTrueFalse=()=>{
        if(!isDeadline){
            return(
                <Button3
              onClick={() => {
                setAllMoim(false);
                setIsDeadline(true);
                setIsNotDeadline(false);
              }}
            >
              <text>마감</text>
            </Button3>
            )
        }else{
            return(
                <Button3True
              onClick={() => {
                setAllMoim(false);
                setIsDeadline(true);
                setIsNotDeadline(false);
              }}
            >
              <text>마감</text>
            </Button3True>
            )
        }
    }

    const moveWrite =()=>{
      if(localStorage.getItem('token') !== null){
        history.push(`/board/write`)
      }else{
        window.alert('모임게시글 작성은 로그인 후 가능합니다.')
        return
      }
    }
    
    return (
      <div>
        <Image shape="rectangle" src={main_carousel2} />
        <Container>
          <TopButton>
            <Search />
            <Button4
              onClick={moveWrite}
            >
              <button>모임 만들기</button>
            </Button4>
          </TopButton>
          <ButtonBox>
            {allMoimTrueFalse()}
            {isNotDeadlineTrueFalse()}
            {isDeadlineTrueFalse()}
          </ButtonBox>
          <CardBox>
            <CardList
              all_post_list={currentPosts(allposts)}
              dead_post_list={currentPosts(deadlinePosts)}
              not_dead_post_list={currentPosts(isNotDeadlinePosts)}
              {...selectButton}
            />
          </CardBox>
          <PageBox>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={post_list.length}
            deadline_Posts={deadlinePosts.length}
            isNotDeadline_Posts={isNotDeadlinePosts.length}
            paginate={setCurrentPage}
            {...selectButton}
          />
          </PageBox>
        </Container>
      </div>
    );
}
const Image = styled.img`
width : 100%;
min-width : 1200px;
// max-height : 720px;
`;

const Container = styled.div`
    width: 100%;
    margin: auto;
`;

const TopButton =styled.div`
    width : 1200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 98px auto 92px auto;
`;
const ButtonBox = styled.div`
    display : flex;
    justify-content : center;
    margin : auto;
    width : 1200px;
`
const Button1 = styled.button`
  width: 167px;
  height: 40px;

  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  cursor: pointer;
  margin-right : 30px;

  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #000000;
  }
`;
const Button1True = styled.button`
  width: 167px;
  height: 40px;

  background-color: #000000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right : 30px;

  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const Button2 = styled.button`

  width: 167px;
  height: 40px;
  margin-right : 30px;

  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  cursor: pointer;
  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
const Button2True = styled.button`

  width: 167px;
  height: 40px;
  margin-right : 30px;

  border: none;
  box-sizing: border-box;
  background-color: #000000;
  border-radius: 20px;
  cursor: pointer;
  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    flex: none;
  }
`;

const Button3 = styled.button`
  width: 167px;
  height: 40px;

  border: 1px solid #000000;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;

  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
const Button3True = styled.button`
  width: 167px;
  height: 40px;

  border: 1px solid #000000;
  box-sizing: border-box;
  background-color: #000000;
  border-radius: 20px;
  cursor: pointer;

  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
const Button4 = styled.div`
  float: right;
  margin-top: 34px;
  & button {
    background: #f1b100;
    border-radius: 20px;
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
const CardBox = styled.div`
  display : block;
  width : 1200px;
  margin : auto;
`
const PageBox = styled.div`
  display : inline;
  width : 1200px;
  margin : auto;
`

export default MatingBoard

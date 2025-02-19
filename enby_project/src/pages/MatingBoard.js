//모임게시판 컴포넌트입니다.
import React, { useState, useEffect } from "react";
import Image from "../elements/Image";
import CardList from "../components/CardList";
import ReactGA from 'react-ga';
import Search from "../components/Search";
import styled from "styled-components";
import MatingBanner from "../shared/image/MatingBanner.png";
import Pagination from "../components/MatingBoardPagination";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { actionsCreators as postActions } from "../redux/modules/post";
import { useMediaQuery } from "react-responsive";
import swal from 'sweetalert';

function MatingBoard(props) {
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
    query: "(min-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });
  // 화면의 height를 구하기 위해서, 해당 6가지의 값 중 최대값을 이용하여 높이를 구하였습니다.
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const dispatch = useDispatch();
  //모든 모임, 마감, 모집 중 이렇게 3가지의 페이지네이션을 위한 코드들 입니다.
  const [deadlinePosts, setDeadlinePosts] = useState([]);
  const [isNotDeadlinePosts, setIsNotDeadlinePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deadCurrentPage, setDeadCurrentPage] = useState(1);
  const [notDeadCurrentPage, setNotDeadCurrentPage] = useState(1);

  const [postsPerPage, setPostsPerPage] = useState(12);
  // 모든 모임, 마감, 모집중 버튼을 누를 때마다 true,false로 변환되며 기본적으로 모든 모임이 true입니다.
  const [allMoim, setAllMoim] = useState(true);
  const [isDeadline, setIsDeadline] = useState(false);
  const [isNotDeadline, setIsNotDeadline] = useState(false);
  // 3가지 버튼을 묶어주는 코드입니다.
  const selectButton = { allMoim, isDeadline, isNotDeadline };

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const deadIndexOfLast = deadCurrentPage * postsPerPage;
  const deadIndexOfFirst = deadIndexOfLast - postsPerPage;
  const notDeadIndexOfLast = notDeadCurrentPage * postsPerPage;
  const notDeadIndexOfFirst = notDeadIndexOfLast - postsPerPage;
  const post_list = useSelector((store) => store.post.list);

  const allposts = post_list; // useState대신 바로 값에 넣어주니 새로고침해도 안사라지더라구요..!

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  function deadCurrentPosts(tmp) {
    let deadCurrentPosts = 0;
    deadCurrentPosts = tmp.slice(deadIndexOfFirst, deadIndexOfLast);
    return deadCurrentPosts;
  }
  function notDeadCurrentPosts(tmp) {
    let notDeadCurrentPosts = 0;
    notDeadCurrentPosts = tmp.slice(notDeadIndexOfFirst, notDeadIndexOfLast);
    return notDeadCurrentPosts;
  }

  useEffect(() => {
    // 현재 모든 모임게시글들을 모집중과 마감으로 나누어 배열에 넣어주는 코드입니다.
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
    setIsNotDeadlinePosts(isRecruitment);
  }, [isDeadline, isNotDeadline]);
  //페이지네이션 버튼을 누를 때 첫번째줄의 게시글의 위치로 스크롤이 옮겨질 수 있도록 도와주는 코드입니다.
  const [scrollPosition, setScrollPosition] = useState(0);
  // 스크롤위치를 알 수 있는 코드입니다.
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  // useEffect를 이용해서 스크롤 이벤트를 구독 및 구독취소하는 코드입니다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 로그인이 되어있다면 작성페이지로 이동하고, 아니라면 로그인 알러트를 띄워줍니다.
  const moveWrite = () => {
    if (localStorage.getItem("token") !== null) {
      history.push(`/board/write`);
    } else {
      swal("모임게시글 작성은 로그인 후 가능합니다.");
      return;
    }
  };
  // 게시글을 작성 할 수 있는 플로팅버튼입니다.
  const floatingButton = () => {
    // 위의 스크롤 이벤트를 이용하여 기본 작성하기 버튼이 보이지 않을 때 나타나고, 푸터의 아이콘들을 가리지 않도록 푸터의 위치에서 사라지도록 하는 조건문입니다.
    if (window.pageYOffset > 790 && (scrollHeight-300) > window.pageYOffset) {
      return <FloatWriteButton onClick={moveWrite}>+</FloatWriteButton>;
    }
  };
  // 모든 모임버튼을 눌렀을 때의 useState들의 값의 변화입니다.( true->false, false->true)
  const allMoimTrueFalse = () => {
    if (!allMoim) {
      return (
        <Button1
          onClick={() => {
            setAllMoim(true);
            setIsDeadline(false);
            setIsNotDeadline(false);
          }}
        >
          <text>모든 모임</text>
        </Button1>
      );
    } else {
      return (
        <Button1True
          onClick={() => {
            setAllMoim(true);
            setIsDeadline(false);
            setIsNotDeadline(false);
          }}
        >
          <text>모든 모임</text>
        </Button1True>
      );
    }
  };
  // 모집 중 버튼입니다.
  const isNotDeadlineTrueFalse = () => {
    if (!isNotDeadline) {
      return (
        <Button2
          onClick={() => {
            setAllMoim(false);
            setIsDeadline(false);
            setIsNotDeadline(true);
          }}
        >
          <text>모집 중</text>
        </Button2>
      );
    } else {
      return (
        <Button2True
          onClick={() => {
            setAllMoim(false);
            setIsDeadline(false);
            setIsNotDeadline(true);
          }}
        >
          <text>모집 중</text>
        </Button2True>
      );
    }
  };
  //마감버튼입니다.
  const isDeadlineTrueFalse = () => {
    if (!isDeadline) {
      return (
        <Button3
          onClick={() => {
            setAllMoim(false);
            setIsDeadline(true);
            setIsNotDeadline(false);
          }}
        >
          <text>마감</text>
        </Button3>
      );
    } else {
      return (
        <Button3True
          onClick={() => {
            setAllMoim(false);
            setIsDeadline(true);
            setIsNotDeadline(false);
          }}
        >
          <text>마감</text>
        </Button3True>
      );
    }
  };

  //search 컴포넌트에 넣어줄 props 값입니다.
  const searchWhere = {
    where: "mating",
  };

  return (
    <>
      <ImageContainer>
        <ImageBox>
          <Image shape="title" src={MatingBanner} />
        </ImageBox>
      </ImageContainer>
      <Title>
        <TitleBox>
          <TitleLogo>New</TitleLogo>
          <SubTitle>당신 주변의 산타를 찾아보세요!</SubTitle>
        </TitleBox>
      </Title>
      <Container>
        {isMobile ? (
          <Button5 onClick={moveWrite}>
            모임
            <br /> 만들기
          </Button5>
        ) : (
          floatingButton()
        )}
        <TopButton>
          <Search {...searchWhere} />
          {!isMobile ? (
            <Button4 onClick={moveWrite}>
              <button>모임 만들기</button>
            </Button4>
          ) : (
            ""
          )}
        </TopButton>
        <ButtonBox>
          {allMoimTrueFalse()}
          {isNotDeadlineTrueFalse()}
          {isDeadlineTrueFalse()}
        </ButtonBox>
        <CardBox>
          <CardList
          // 해당 값에 해당하는 게시글들을 모집, 모든 모임, 마감 3가지 값으로 나누어 넣어줍니다.
            all_post_list={currentPosts(allposts)}
            dead_post_list={deadCurrentPosts(deadlinePosts)}
            not_dead_post_list={notDeadCurrentPosts(isNotDeadlinePosts)}
            {...selectButton}
          />
        </CardBox>
        <PageBox>
          <Pagination
          // 페이지네이션에 필요한 값들을 넣어줍니다.
            postsPerPage={postsPerPage}
            totalPosts={post_list.length}
            deadline_Posts={deadlinePosts.length}
            isNotDeadline_Posts={isNotDeadlinePosts.length}
            paginate={setCurrentPage}
            deadPaginate={setDeadCurrentPage}
            notDeadPaginate={setNotDeadCurrentPage}
            {...selectButton}
          />
        </PageBox>
      </Container>
    </>
  );
}
const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 520px;
  margin: auto;
  z-index: -1;
  @media (min-width: 600px) and (max-width: 1170px) {
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 320px;
  }
`;
// const Image = styled.img`
// width : 100%;
// max-width : 1920px;
// height: 520px;
// object-fit: cover;
// @media (min-width: 600px) and (max-width: 1170px) {
//   // width: 320px;
//   // height: 235.73px;
//   }

// @media (max-width: 600px) {
//   width: 100%;
//   height: 320px;
// }
// `;
const ImageBox = styled.div`
  margin: auto;
`;
const Title = styled.div`
  position: relative;
  margin: 0px auto 0px auto;
  width: 100%;
  max-width: 1200px;
  height: 520px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 320px;
  }
  cursor: default;
`;
const TitleBox = styled.div`
  width: 100%;
  max-width: 747px;
  height: 144px;
  margin: auto;
  padding-top: 188px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding-top: 100px;
  }
`;
const TitleLogo = styled.h1`
  text-align: center;
  width: auto;
  margin: 0;
  font-family: seravek;
  color: #ffffff;
  font-style: italic;
  font-weight: bold;
  font-size: 60px;
  line-height: 74px;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;
const SubTitle = styled.p`
  text-align: center;
  font-family: notosans_regular;
  font-size: 32px;
  margin: 0px;
  color: #ffffff;
  font-weight: bold;
  line-height: 150%;
  @media (min-width: 600px) and (max-width: 1170px) {
    // width: 320px;
    // height: 235.73px;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    margin: -15px 0 -15px 0;
    width : 375px;
  }
`;
const Container = styled.div`
    width: 100%;
    margin: auto;
    // width: 320;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 750px;
    }
    @media (max-width: 600px) {
      // margin-top: 180px;
      // z-index: 1;
      overflow: hidden;
    }
`;

const TopButton = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 105px auto 73px auto;
  @media (max-width: 600px) {
    margin-top: 50px;
    width: 320px;
  }
`;
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 1200px;
  margin-bottom: -30px;
  @media (max-width: 600px) {
    width: 280px;
    justify-content: center;
    margin: -60px auto;
    z-index: 1;
  }
`;
const Button1 = styled.button`
  width: 167px;
  height: 40px;

  background-color: #ffffff;
  border: 1px solid #bbcfdc;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 30px;

  & text {
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #343434;
  }
  &: hover {
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
    background-color: #bbcfdc;
    color: #ffffff;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;
const Button1True = styled.button`
  width: 167px;
  height: 40px;

  background-color: #bbcfdc;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 30px;

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
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;

const Button2 = styled.button`
  width: 167px;
  height: 40px;
  margin-right: 30px;

  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #bbcfdc;
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
  &: hover {
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
    background-color: #bbcfdc;
    color: #ffffff;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;
const Button2True = styled.button`
  width: 167px;
  height: 40px;
  margin-right: 30px;

  border: none;
  box-sizing: border-box;
  background-color: #bbcfdc;
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
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;

const Button3 = styled.button`
  width: 167px;
  height: 40px;

  border: 1px solid #bbcfdc;
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
  &: hover {
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
    background-color: #bbcfdc;
    color: #ffffff;
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
    transition-delay: 0s;
  }
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;
const Button3True = styled.button`
  width: 167px;
  height: 40px;

  // border: 1px solid #000000;
  border: none;
  box-sizing: border-box;
  background-color: #bbcfdc;
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
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;
const Button4 = styled.div`
  float: right;
  margin-top: 5px;
  & button {
    background: #168ed9;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    width: 167px;
    height: 40px;
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    &: hover {
      transition-duration: 0.15s;
      transition-timing-function: ease-out;
      transition-delay: 0s;
      background-color: #0d73b2;
    }
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 380px;
  }
  @media (max-width: 600px) {
    width: 80px;
    & text {
      font-size: 11px;
    }
  }
`;

const Button5 = styled.button`
  position: fixed;
  width: 70px;
  height: 70px;
  font-family: notosans_regular;
  font-size: 11px;
  color: #000;
  background-color: #bbcfdc;
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

const CardBox = styled.div`
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    }
  @media (max-width: 600px) {
    min-width: 320px;
  }
`;
const PageBox = styled.div`
  display : inline;
  width: 100%;
  max-width : 1200px;
  margin : auto;
  @media (max-width: 600px) {
    width: 100%
    max-width: 320px;
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
`;

export default MatingBoard;

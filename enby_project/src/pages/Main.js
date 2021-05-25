import React, { useEffect } from 'react'
import CardList from '../components/CardList'
import Carousel from '../components/Carousel'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as postActions} from '../redux/modules/post'
import Card from '../components/Card';
import ReviewCard from '../components/ReviewCard';
import { history } from "../redux/configStore";
import notification from '../shared/image/notification.png'
import information from '../shared/image/information.png'
import event from '../shared/image/event.png'
import Swal from 'sweetalert2';
import { useState } from 'react';
import ReactGA from 'react-ga';


const Main =(props)=>{
  useEffect(()=>{
    getGA();
  }, []);

  const getGA =()=>{
    const pathName = window.location.pathname;
    ReactGA.initialize('G-YCWTTJWZF4');
    ReactGA.set({page : pathName});
    ReactGA.pageview(pathName);
  }
  const dispatch = useDispatch();
  const post_list = useSelector((store) => store.post.list)
  const review_list = useSelector((store) => store.post.review_list)
  const review_lst = review_list.slice(0,4)
  const post_lst = post_list.slice(0,4)
  const moveSantaGuide =()=>{
    window.open("https://www.notion.so/SANTA-aec3960db5f4423fa2a6fd57e1394cda");
  }

  // 화면의 height를 구하기 위해서, 해당 6가지의 값 중 최대값을 이용하여 높이를 구하였습니다.
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
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

  useEffect(()=>{
    dispatch(postActions.getPostMainDB())
    dispatch(postActions.getPostReviewDB())
  }, [dispatch])
  // 게시글을 작성 할 수 있는 플로팅버튼입니다.
  const scrollDepth = ((window.scrollY + window.innerHeight)/document.body.scrollHeight)*100
  const floatingButton = () => {
    // 위의 스크롤 이벤트를 이용하여 기본 작성하기 버튼이 보이지 않을 때 나타나고, 푸터의 아이콘들을 가리지 않도록 푸터의 위치에서 사라지도록 하는 조건문입니다.
    if ((scrollDepth) < 91) {
      return<>  
      <SantaGuide src={information} onClick={moveSantaGuide}/>
      <Notification 
        src={notification}
        onClick={()=>{
          Swal.fire({
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: "나중에 할래요",
            imageUrl: 'https://santa-notification.s3.ap-northeast-2.amazonaws.com/event_santa.png',
            imageWidth: 450,
            imageHeight: 450,
            imageAlt: 'Custom image',
            confirmButtonText:'설문 제출하러 가기'
            }).then((result) => {
              if (result.value) {
                window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSc28bunSJlIlnomfZRS4TBCFKW0NOA6TTtczdE-LHi1np68Pg/viewform'
              }
          });
        }}></Notification>
        </>
    }
  };

    return (
      <Container>
        <Box>
        <CarouselBox>
          <Carousel />
        </CarouselBox>
        </Box>
        <PostText>
          <Span>
            <PostTitle>새로운 모임</PostTitle>
            <PostButton
              onClick={() => {
                history.push("/board/mating/");
              }}
            >
              더보기
            </PostButton>
          </Span>
        </PostText>
        <PostList>
          {post_lst.map((p) => {
            return <Card {...p} key={p.id} />;
          })}
        </PostList>
        <ReviewText>
          
          <Span>
          <ReviewTitle>후기글</ReviewTitle>
            <ReviewButton
              onClick={() => {
                history.push("/board/review");
              }}
            >
              더보기
            </ReviewButton>
          </Span>
        </ReviewText>
        <ReviewList>
          {review_lst.map((p) => {
            return <ReviewCard {...p} key={p.id} />;
          })}
        </ReviewList>
       {floatingButton()}
      </Container>
    );
}
const Notification = styled.img`
// background-image : url(${notification});
position: fixed;
  width: 60px;
  height: 60px;
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
  z-index: 100;
  bottom: 50px;
  right: 30px;
  &: hover {
    width : 70px;
    height : 70px;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
`;
const SantaGuide = styled.img`
position: fixed;
width: 60px;
height: 60px;
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
z-index: 100;
bottom: 125px;
right: 30px;
&: hover {
  width : 70px;
  height : 70px;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
`
const Container = styled.div`
display : block;
@media (max-width: 600px) {
  overflow: hidden;
}
`
const Box = styled.div`
  width : 100%;
  margin : auto;
`
const CarouselBox = styled.div`
  width : auto;
  height : 1000px;
  margin : auto;
  @media (max-width: 1440px) {
    height: 750px;
  }
  @media (max-width : 1200px) {
    height: 625px;

  }
  @media (max-width: 600px) {
    height: 320px;
  }
`
const PostList = styled.div`
  display : flex;
  // justify-content : space-between;
  margin: 34px auto -35px auto;
  justify-content : space-around;
  // margin: 34px auto auto auto;
  max-width: 1200px;
  width: 100%;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-bottom: 80px;
    max-width: 800px; 
    }
  }
  @media (max-width: 600px) {
    justify-content: left;
    width : 375px;
    margin-left: 5px;
    white-space : nowrap;
    overflow-x : scroll;
  }
`
const PostText = styled.div`
max-width : 1200px;
width: 100%;
margin : 79px auto auto auto;
& span {
  display: flex;
}
@media (min-width: 600px) and (max-width: 1170px) {
  max-width: 800px; 
}
@media (max-width: 600px) {
  margin-top: 30px;
  margin-left: 12px;
  margin-bottom: -20px;
}
`;
const PostSubTitle = styled.div`
    margin: 132px 0px 0px 0px;
    font-family: notosans_regular;
    font-style: normal;
    font-size: 18px;
    line-height: 150%;
    color: #474747;
    @media (max-width: 600px) {
      font-size: 8px;
      margin-bottom: -8px;
    }
`;
const PostTitle = styled.div`
    // margin-top: 13px;
    font-family: notosans_medium;
    font-style: normal;
    float : left;
    font-size: 30px;
    line-height: 150%;
    color: #168ed9;
    @media (min-width: 600px) and (max-width: 1170px) {
      margin-left: 20px;
    }
    @media (max-width: 600px) {
      font-size: 18px;
    }
`;

const PostButton = styled.button`
  font-size: 18px;
  font-family: notosans_regular;
  margin-left: 880px;
  width: 167px;
  height: 40px;
  border: 1px solid #000000;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin:0 20px 0 0;
  }
  @media (max-width: 600px) {
    margin-left: 205px;
    margin-bottom : 2px;
    width: 52px;
    height: 26px;
    font-size: 10px;
  }
  &: hover {
    border : none;
    transition-duration: 0.15s;
      transition-timing-function: ease-out;
      transition-delay: 0s;
      background-color : #BBCFDC;
      color : #ffffff;
  }
`;

const ReviewText = styled.div`
  max-width : 1200px;
  width: 100%;
  margin : 21px auto auto auto;
  & span {
    display: flex;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-top: 30px;
    max-width: 800px; 
  }
  @media (max-width: 600px) {
    // margin-top: 50px auto auto;
    margin-left: 12px;
    margin-bottom: -20px;
  }
`;
const ReviewSubTitle =styled.text`
  margin: 21px 0px 0px 0px;
  // width: 290px;
  height: 23px;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #474747;

  @media (max-width: 600px) {
    font-size: 8px;
    margin-bottom: -8px;
  }
`;
const ReviewTitle = styled.text`
  // margin-top: 12px; 
  // width: 161px;
  height: 35px;
  font-family: notosans_medium;
  color: #168ed9;
  font-style: normal;
  font-size: 28px;
  line-height: 150%;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 20px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    margin-top: 7px;
  }
`;

const ReviewButton = styled.button`
  width: 167px;
  height: 40px;
  font-size : 18px;
  font-family : notosans_regular;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #FFFFFF;
  cursor: pointer;
  float : right;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-right: 20px;
  }
  @media (max-width: 600px) {
    margin-left: 245px;
    margin-top: 5px;
      width: 52px;
      height: 26px;
      font-size: 10px;
  }
  &: hover {
    border : none;
    transition-duration: 0.15s;
      transition-timing-function: ease-out;
      transition-delay: 0s;
      background-color : #BBCFDC;
      color : #ffffff;
  }
`;
const Span = styled.span`
  display : flex;
  justify-content : space-between;
  @media (max-width: 600px) {
    justify-content: left;
    width : 375px;
  }
`

const ReviewList = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 34px auto 71px auto;
  max-width: 1200px;
  width: 100%;
  @media (min-width: 600px) and (max-width: 1170px) {
    justify-content: 0;
    margin: 34px auto 0 auto; 
      max-width: 800px; 
  }
  @media (max-width: 600px) {
    justify-content: left;
    width : 375px;
    margin-left: 5px;
    white-space: nowrap;
    overflow: auto;
  }
`;

export default Main;

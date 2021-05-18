import React, { useState, useEffect } from 'react';

import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {actionsCreators as userActions} from '../redux/modules/user'
import MypageProfile from '../components/MypageProfile';
import TitImg from '../shared/image/mypagetitle.png';
import Loading from '../components/Loading';
import ListForMyPage1 from '../components/ListForMyPage1';
import ListForMyPage2 from '../components/ListForMyPage2';
import ListForMyPage3 from '../components/ListForMyPage3';
import PagingMating from '../components/Pagination';


const Mypage =(props)=>{
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    const attend_list = useSelector((store) => store.user.attend_list)
    const apply_list = useSelector((store) => store.user.apply_list)
    const write_list = useSelector((store) => store.user.write_list)
    const loading = useSelector((store) => store.user.loading)

    const attend = [attend_list]

    useEffect(() => {
      dispatch(userActions.getMyProfileDB(name));
    }, []);

    // 작성한 글 pagination(Apply)
    // const [applyPosts, setApplyPosts] = useState([]);
    const [currentApplyPage, setCurrentApplyPage] = useState(1);
    const [postsPerApplyPage, setPostsPerApplyPage] = useState(4);
    const indexOfApplyLast = currentApplyPage * postsPerApplyPage;
    const indexOfApplyFirst = indexOfApplyLast - postsPerApplyPage;
    const applyPosts = apply_list
    function currentApplyPosts(tmp) {
        let currentApplyPosts = 0;
        currentApplyPosts = tmp.slice(indexOfApplyFirst, indexOfApplyLast);
        return currentApplyPosts;
    }

    // 참여했던 모임 pagination(Attend)
    const [currentAttendPage, setCurrentAttendPage] = useState(1);
    const [postsPerAttendPage, setPostsPerAttendPage] = useState(4);
    const indexOfAttendLast = currentAttendPage * postsPerAttendPage;
    const indexOfAttendFirst = indexOfAttendLast - postsPerAttendPage;
    const attendPosts = attend_list

    function currentAttendPosts(tmp) {
        let currentAttendPosts = 0;
        currentAttendPosts = tmp.slice(indexOfAttendFirst, indexOfAttendLast);
        return currentAttendPosts;
    }
    
    // 작성한 글 pagination(Write)
    const [currentWritePage, setCurrentWritePage] = useState(1);
    const [postsWritePerPage, setWritePostsPerPage] = useState(3);
    const indexOfWriteLast = currentWritePage * postsWritePerPage; // 1*3 = 3
    const indexOfWriteFirst = indexOfWriteLast - postsWritePerPage; // 3-3=0
    const writePosts = write_list //7
    function currentWritePosts(tmp) { 
        let currentWritePosts = 0; // 0,3
        currentWritePosts = tmp.slice(indexOfWriteFirst, indexOfWriteLast);
        return currentWritePosts;
    }
    if(loading){
        return <Loading />
    }else{
        return (
            <Container>
                <Image shape="rectangle" src={TitImg} />
              <ProfileBox>
                <MypageProfile {...attend} />
              </ProfileBox>
              <ApplyBox>
                  <ApplyMoim>
                      <ApplySubTit>내가 신청한 모임을 확인하고 싶다면?</ApplySubTit>
                      <ApplyTit>신청한 모임</ApplyTit>
                      <ListForMyPage3 apply_list={currentApplyPosts(applyPosts)}/>
                    <PagingMating postsPerPage={postsPerApplyPage} totalPosts={apply_list.length} paginate={setCurrentApplyPage} />
                  </ApplyMoim>
              </ApplyBox>
              <AttendBox>
                  <AttendSubTit>내가 참여했던 모임을 확인하고 싶다면?</AttendSubTit>
                  <AttendTit>참여했던 모임</AttendTit>
                  <ListForMyPage2 attend_list={currentAttendPosts(attendPosts)}/>
                <PagingMating postsPerPage={postsPerAttendPage} totalPosts={attend_list.length} paginate={setCurrentAttendPage} />
              </AttendBox>
              <WriteBox>
                  <WriteSub>내가 작성한 글을 확인하고 싶다면?</WriteSub>
                  <WriteTit>작성한 글</WriteTit>
              </WriteBox>
              <Linetwo />
              <ListForMyPage1 write_list={currentWritePosts(writePosts)}/>
              <PagingMating postsPerPage={postsWritePerPage} totalPosts={write_list.length} paginate={setCurrentWritePage} />
            </Container>
          );
    }
    
}
const Container = styled.div`
    width : 100%;

`
const ProfileBox = styled.div`
`
const Image = styled.div`
width : 100%;
min-width : 1200px;
max-height : 720px;
height : 500px;
background-image : url(${TitImg});
background-size : cover;
background-position : center;
background-repeat : no-repeat;
position : absolute;
opacity : 56%;
@media (max-width: 600px) {
    min-width: 320px;
    width: 100%;
    height: 520px;
  }
`
const ApplyBox = styled.div`
    width: 100%;
    display : block;
    max-width : 1200px;
    margin : 74px auto 0 auto;
    @media (max-width: 600px) {
        max-width: 414px;
      }
`
const ApplyMoim = styled.div``
const ApplySubTit = styled.p`
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
    margin : 0;
    @media (max-width: 600px) {
        font-size: 11px;
        margin-left: 20px ;
        margin-bottom: -10px;
      }
`
const ApplyTit = styled.h2`
margin : 12px 0 0 0;
font-family : notosans_bold;
font-size : 28px;
@media (max-width: 600px) {
    font-size: 21px;
    margin-left: 20px ;
  }
`
const AttendBox = styled.div`
    width: 100%;
    max-width : 1200px;
    margin : 127px auto 0 auto;
    @media (max-width: 600px) {
        margin-top: -100px;
      }
`
const AttendSubTit = styled.p`
    margin : 0;
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
    @media (max-width: 600px) {
        font-size: 11px;
        margin-left: 20px ;
        margin-bottom: -10px;
      }
`
const AttendTit = styled.h2`
    margin : 12px 0 0 0;
    font-family : notosans_bold;
    font-size : 28px;
    color : #000000;
    @media (max-width: 600px) {
        font-size: 21px;
        margin-left: 20px ;
      }
`
const WriteBox = styled.div`
    width: 100%;
    display : block;
    max-width : 1200px;
    margin : 127px auto 43px auto;
    @media (max-width: 600px) {
        margin-top: -127px;
      }
`
const WriteSub = styled.p`
  margin: 0;
  font-family: notosans_regular;
  font-size: 18px;
  color: #474747;
  @media (max-width: 600px) {
    font-size: 11px;
    margin-left: 20px ;
    margin-bottom: -10px;
  }
`;
const WriteTit = styled.h2`
  margin: 12px 0 0 0;
  font-family: notosans_bold;
  font-size: 28px;
  color: #000000;
  @media (max-width: 600px) {
    font-size: 21px;
    margin-left: 20px ;
  }
`;
const Linetwo = styled.hr`
border-bottom : 2px solid #383838;
max-width : 1200px;
width: 100%;
margin : auto auto 57px auto;
`
export default Mypage;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TitImg from "../shared/image/mypagetitle.png";
import Wrote from "../components/Wrote";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";
import OtherpageProfile from "../components/OtherpageProfile";
import WroteList from "../components/WroteList";
import PagingMating from '../components/Pagination';
import ReactGA from 'react-ga';
import ListForMyPage2 from '../components/ListForMyPage2';

const OthersMypage = (props) => {

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
  useEffect(() => {
    const otherName = props.match.params.name;
    dispatch(userActions.getOtherPageDB(otherName));
  }, []);

  const write_list = useSelector((store) => store.user.other_write);
  const attend_list = useSelector((store) => store.user.other_attend);
  const account_information = useSelector((store) => store.user.account_information)

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
  // pagination
    // const [Posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const Posts = write_list

    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

  return (
    <Container>
      <Image shape="rectangle" src={TitImg} />
      <ProfileBox>
        <OtherpageProfile {...account_information[0]} />
      </ProfileBox>
      <AttendBox>
        <AttendTit>참여했던 모임</AttendTit>
        <ListForMyPage2 attend_list={currentAttendPosts(attendPosts)} />
        <PagingMating
          postsPerPage={postsPerAttendPage}
          totalPosts={attend_list.length}
          paginate={setCurrentAttendPage}
        />
      </AttendBox>
      <WriteBox>
        <WriteTit>작성한 글</WriteTit>
      </WriteBox>
      <Linetwo />
      <WroteList write_list={currentPosts(Posts)} />
      <PageBox>
        <PagingMating
          postsPerPage={postsPerPage}
          totalPosts={write_list.length}
          paginate={setCurrentPage}
        />
      </PageBox>
      {/* {write_list.map((p) => {
        return <Wrote key={p.id} {...p} />;
      })} */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Image = styled.div`
  width: 100%;
  min-width: 1200px;
  max-height: 720px;
  height: 440px;
  background-image: url(${TitImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  opacity: 56%;
  @media (max-width: 600px) {
    min-width: 320px;
    width: 100%;
    height: 320px;
  }
`;
const ProfileBox = styled.div`
@media (min-width: 600px) and (max-width: 1170px) {
  margin-left: 20px;
}
@media (max-width: 600px) {
  margin-left: 10px ;
}
`;
const AttendBox = styled.div`
    width: 100%;
    max-width : 1200px;
    margin : 127px auto 0 auto;
    @media (min-width: 600px) and (max-width: 1170px) {
      width: 800px;
      margin: 74px auto 0 auto;
    }
    @media (max-width: 600px) {
        margin-top: -60px;
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
  display: block;
  width: 1200px;
  margin: 75px auto 43px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 700px;
  }

`;
const WriteSub = styled.p`
  margin: 0;
  font-family: notosans_regular;
  font-size: 18px;
  color: #474747;
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
  border-bottom: 2px solid #383838;
  max-width: 1200px;
  width: 100%;
  margin: auto auto 21px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 700px;
  }
`;
const PageBox = styled.div`
  // display : flex;
  max-width : 1200px;
  width: 100%;
  margin : auto;
`
export default OthersMypage;

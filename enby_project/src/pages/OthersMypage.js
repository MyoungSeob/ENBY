import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TitImg from "../shared/image/mypagetitle.png";
import Wrote from "../components/Wrote";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";
import OtherpageProfile from "../components/OtherpageProfile";
import WroteList from "../components/WroteList";
import PagingMating from '../components/Pagination';

const OthersMypage = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const otherName = props.match.params.name;
    dispatch(userActions.getOtherPageDB(otherName));
  }, []);

  const write_list = useSelector((store) => store.user.other_write);
  const other_list = useSelector((store) => store.user.other_page);
  console.log(other_list)

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
        <OtherpageProfile {...other_list[0]} />
      </ProfileBox>
      <WriteBox>
        <WriteTit>작성한 글</WriteTit>
      </WriteBox>
      <Linetwo />
      <WroteList write_list={currentPosts(Posts)}/>
      <PageBox>
        <PagingMating postsPerPage={postsPerPage} totalPosts={write_list.length} paginate={setCurrentPage} />
      </PageBox>
      {/* {write_list.map((p) => {
        return <Wrote key={p.id} {...p} />;
      })} */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
`;
const ProfileBox = styled.div`
`;
const WriteBox = styled.div`
  display: block;
  width: 1200px;
  margin: 75px auto 43px auto;

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
`;
const Linetwo = styled.hr`
  border-bottom: 2px solid #383838;
  width: 1200px;
  margin: auto auto 21px auto;
`;
const PageBox = styled.div`
  // display : flex;
  width : 1200px;
  margin : auto;
`
export default OthersMypage;

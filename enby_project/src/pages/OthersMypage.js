import React, { useEffect } from "react";
import styled from "styled-components";
import TitImg from "../shared/image/mypagetitle.png";
import Wrote from "../components/Wrote";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";
import OtherpageProfile from "../components/OtherpageProfile";

const OthersMypage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const otherName = window.location.href.split("/")[4];
    dispatch(userActions.getOtherPageDB(otherName));
  }, []);

  const write_list = useSelector((store) => store.user.other_write);
  const other_list = useSelector((store) => store.user.other_page);
  console.log(other_list)

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
      {write_list.map((p) => {
        return <Wrote key={p.id} {...p} />;
      })}
      <Pagenation>
        <Page>1</Page>
      </Pagenation>
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
  height: 500px;
  background-image: url(${TitImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  opacity: 56%;
`;
const ProfileBox = styled.div``;
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
  margin: auto auto 64px auto;
`;
const Pagenation = styled.div`
  width: 1200px;
  margin: 71px auto 216px auto;
  text-align: center;
`;
const Page = styled.p``;
export default OthersMypage;

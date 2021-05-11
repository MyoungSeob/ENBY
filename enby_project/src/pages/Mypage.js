import React, { useEffect } from 'react';

import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {actionsCreators as userActions} from '../redux/modules/user'
import MypageProfile from '../components/MypageProfile';
import TitImg from '../shared/image/mypagetitle.png';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Wrote from '../components/Wrote';
import { history } from '../redux/configStore';
import { push } from 'connected-react-router';

const Mypage =(props)=>{
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    console.log(decode)
    const attend_list = useSelector((store) => store.user.attend_list)
    const apply_list = useSelector((store) => store.user.apply_list)
    const write_list = useSelector((store) => store.user.write_list)
    const loading = useSelector((store) => store.user.loading)

    const attend = [attend_list]

    console.log(write_list)

    useEffect(() => {
      dispatch(userActions.getMyProfileDB(name));
    }, []);
    
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
                  </ApplyMoim>
                  <CardBox>
                      {apply_list.map((p) => {
                          return <Card key={p.id} {...p}/>
                      })}
                  </CardBox>
              </ApplyBox>
              <AttendBox>
                  <AttendSubTit>내가 참여했던 모임을 확인하고 싶다면?</AttendSubTit>
                  <AttendTit>참여했던 모임</AttendTit>
                  <CardBox>
                      {attend_list.map((p)=>{
                        return <Card key={p.id} {...p} />;
                      })}
                  </CardBox>
              </AttendBox>
              <WriteBox>
                  <WriteSub>내가 작성한 글을 확인하고 싶다면?</WriteSub>
                  <WriteTit>작성한 글</WriteTit>
              </WriteBox>
              <Linetwo />
              {write_list.map((p)=>{
                  return <Wrote key={p.id} {...p}/>
              })}
              
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
`
const ApplyBox = styled.div`
    display : block;
    width : 1200px;
    margin : 74px auto 81px auto;
`
const ApplyMoim = styled.div``
const ApplySubTit = styled.p`
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
    margin : 0;
`
const ApplyTit = styled.h2`
margin : 12px 0 0 0;
font-family : notosans_bold;
font-size : 28px;
`
const CardBox = styled.div`
  width: 1200px;
  height: 100%;
  float: left;
  margin: 75px auto 158px auto;
`;

const AttendBox = styled.div`
    width : 1200px;
    margin : 0 auto 0 auto;
`
const AttendSubTit = styled.p`
    margin : 0;
    font-family : notosans_regular;
    font-size : 18px;
    color : #474747;
`
const AttendTit = styled.h2`
    margin : 12px 0 0 0;
    font-family : notosans_bold;
    font-size : 28px;
    color : #000000;
`
const WriteBox = styled.div`
    display : block;
    width : 1200px;
    margin : auto auto 43px auto;
    
`
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
border-bottom : 2px solid #383838;
width : 1200px;
margin : auto auto 64px auto;
`
export default Mypage;
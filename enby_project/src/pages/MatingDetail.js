import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApplyList from '../components/ApplyList'
import Image from '../elements/Image'
import Detail from '../components/Detail';
import About from '../components/About';
import Apply from '../components/Apply';

import jwt_decode from 'jwt-decode'

import styled from 'styled-components';
import { actionsCreators as postActions} from '../redux/modules/post'
import { actionsCreators as applyActions} from '../redux/modules/apply'
import { history } from "../redux/configStore";
import MemberCardList from '../components/MemberCardList';
import PermitApplyList from '../components/PermitApplyList';



const MatingDetail = (props) => {
    const id = props.match.params.id;
    console.log(props);
    const token = localStorage.getItem("token")
    const decode = jwt_decode(token)
    console.log(decode.nickname)
    const dispatch = useDispatch();
    
    const post_list = useSelector((store)=> store.post.detail_list);
    const apply_list = useSelector((store) => store.post.apply_list);
    const time = useSelector((store) => store.post.time);
    const createdAt = useSelector((store) => store.post.created_At)
    console.log(createdAt)
    const data = post_list
    const createdBy = post_list.createdBy

    useEffect(()=>{
        dispatch(postActions.getPostDetailDB(id))
    }, [id]);
    
    const deletePost=()=>{
        if(window.confirm("게시글을 삭제하시겠습니까?") === true){
            dispatch(postActions.deletePostDB(id))
        }
    }

    const dateTime = parseInt(time[0]) + "년 " + parseInt(time[1]) + "월 " + parseInt(time[2]) + "일"



    return (
      <Container>
        
          <ImageBox>
            <Image src={data.board_imgUrl} />
          </ImageBox>
          <DetailBox>
          <TitleBox>
            <TitleText>{data.title}</TitleText>
            <TitleDate>
              {createdAt}
              <TitleSpan>
                <TitleButton>
                  <TitleBtnName>목록으로</TitleBtnName>
                </TitleButton>
              </TitleSpan>
            </TitleDate>
          </TitleBox>
        </DetailBox>
        <Hr />
        <ContentsBox>
          <Detail {...post_list} />
          <About {...post_list} />
        </ContentsBox>
        <ApplicationBox>
        {apply_list.length > 0 ? (
          <MemberBox>
            <MemberCardList />
          </MemberBox>
        ) : (
          ""
        )}
        {decode.nickname === createdBy ? (
          <PermitBox>
            <PermitApplyList />
          </PermitBox>
        ) : (
          <ApplyBox>
            <Apply {...post_list} />
          </ApplyBox>
        )}
        {/* <button
          onClick={() => {
            history.push("/board/mating/write/" + id);
          }}
        >
          수정
        </button>
        <button onClick={deletePost}>삭제</button> */}
        </ApplicationBox>
      </Container>
    );
}

const Container = styled.div`
  width : 100%;
`
const DetailBox = styled.div`
  margin : auto;
  width : 1200px;
`
const ContentsBox = styled.div`
  width : 1200px;
  margin : auto auto 70px auto;
  display : flex;
  padding-bottom : 70px;
  border-bottom : 1px solid #C8C8C8
`
const ImageBox = styled.div`
max-width : 1920px;
width : 100%
height : 100%
max-height : 720px;
margin : auto;
`
const TitleBox = styled.div`
  width : 1200px;
  height : 122px;
  margin : 0 auto 0 auto;
`
const TitleText = styled.h1`
  margin : 0;
  font-family : notosans_bold;
  font-size : 32px;
  padding-top : 38px;
  float : left
`
const TitleDate = styled.p`
  padding-top : 46px;
  font-family : notosans_regular;
  font-size : 20px;
  float : right;
  margin : 0;
  color : #B9B9B9
`
const TitleSpan = styled.span`
  margin-left : 50px;
  float : right;
  padding-bottom : 5px;
`
const TitleButton = styled.div`
  border : 1px solid #000000;
  padding : 2px 48px 2px 48px;
  border-radius : 20px;
  float : right;
`
const TitleBtnName = styled.p`
  font-size : 14px;
  color : #000000;
  margin : 0;
`
const Hr = styled.hr`
  width : 100%;
  margin : 0 0 50px 0;
  display : absolute;
`
const MemberBox = styled.div`
  width : 1200px;
  margin : auto auto 100px auto;
`
const ApplyBox = styled.div`
  width : 1200px;
  margin : auto;
`
const PermitBox = styled.div`
max-width : 1200px;
  margin : auto;
`
const ApplicationBox = styled.div`
  margin-bottom : 170px;
`

export default MatingDetail;
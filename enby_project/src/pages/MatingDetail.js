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
import PermitApply from '../components/PermitApply';



const MatingDetail = (props) => {
    const id = props.match.params.id;

    const token = localStorage.getItem("token")
    const decode = jwt_decode(token)
    
    const dispatch = useDispatch();
    
    const post_list = useSelector((store)=> store.post.detail_list);
    const apply_list = useSelector((store) => store.post.apply_list);
    const time = useSelector((store) => store.post.time);
    console.log(apply_list)
    const data = post_list

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
        <DetailBox>
          <ImageBox>
            <Image src={data.board_imgUrl} />
          </ImageBox>
          <TitleBox>
            <TitleText>{data.title}</TitleText>
            <TitleDate>
              {dateTime}
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
        {apply_list.length > 0 ? (
          <MemberBox>
            <MemberCardList />
          </MemberBox>
        ) : (
          ""
        )}
        <ApplyBox>
          <Apply {...post_list} />
        </ApplyBox>
        {/* <PermitBox>
        <PermitApply />
        </PermitBox> */}
        
        <button
          onClick={() => {
            history.push("/board/write/" + id);
          }}
        >
          수정
        </button>
        <button onClick={deletePost}>삭제</button>
        {/* {decode.nickname !== apply_list.createdBy ? (
          <div>
            <TextArea
              placeholder="신청멘트"
              rows="5"
              onChange={(e) => {
                setRegistContents(e.target.value);
              }}
            />
            <span>
              <button onClick={registApply}>신청하기</button>
              <button onClick={cancelRegistApply}>신청취소하기</button>
            </span>
          </div>
        ) : (
          <div>
            {apply_list.map((p) => {
              return <ApplyList key={p.id} {...p} />;
            })}
          </div>
        )} */}
      </Container>
    );
}

const Container = styled.div`
  width : 100%;
`
const DetailBox = styled.div`
  width : 1440px;
  margin : auto;
`
const ContentsBox = styled.div`
  width : 1440px;
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
`
const TitleBox = styled.div`
  width : 1440px;
  height : 122px;
  margin : auto;
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
  width : 1440px;
  margin : auto auto 100px auto;
`
const ApplyBox = styled.div`
  max-width : 1440px;
  margin : auto;
`
const PermitBox = styled.div`
max-width : 1440px;
  margin : auto;
`

export default MatingDetail;
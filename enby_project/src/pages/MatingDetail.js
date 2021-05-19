import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplyList from "../components/ApplyList";
import Image from "../elements/Image";
import Detail from "../components/Detail";
import About from "../components/About";
import Apply from "../components/Apply";

import jwt_decode from "jwt-decode";

import styled from "styled-components";
import { actionsCreators as postActions } from "../redux/modules/post";
import { actionsCreators as applyActions } from "../redux/modules/apply";
import { history } from "../redux/configStore";
import MemberCardList from "../components/MemberCardList";
import PermitApplyList from "../components/PermitApplyList";
import ReviewBox from "../components/ReviewBox";
import Loading from "../components/Loading";
import { useMediaQuery } from "react-responsive";

const MatingDetail = (props) => {
  //반응형
  const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const id = props.match.params.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const dispatch = useDispatch();

  const post_list = useSelector((store) => store.post.detail_list);
  const apply_list = useSelector((store) => store.post.apply_list);
  const createdAt = useSelector((store) => store.post.created_At);

  const data = post_list;
  const createdBy = post_list.createdBy;

  useEffect(() => {
    dispatch(postActions.getPostDetailDB(id))
  }, [id]);

  const deletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?") === true) {
      dispatch(postActions.deletePostDB(id));
    }
  };
  
  const none_login_editButton=()=>{
    if(localStorage.getItem("token") !== null){
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      return (
        createdBy === decode.nickname ? (
          <EditButton>
            {!data.deadlineStatus ? (
              <EditBtn
              onClick={() => {
                history.push("/board/write/" + id);
              }}
            >
              수정하기
            </EditBtn>
            ) : ("")}
     
            <DeleteBtn onClick={deletePost}>삭제하기</DeleteBtn>
          </EditButton>
        ) : (
          ""
        )
      )
    }else{
      return "";
    }
  }

  const none_login_apply=()=>{
    if(localStorage.getItem("token")!== null){
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      return (
        decode.nickname === createdBy ? (
          <PermitBox>
            <PermitApplyList />
          </PermitBox>
        ) : (
          <ApplyBox>
          <Apply {...post_list} />
        </ApplyBox>
        )
      )
    }else{
      return (
        <ApplyBox>
          <Apply {...post_list} />
        </ApplyBox>
      );
    }
  }

  if(loading){
    return <Loading />
  }else{return (
    <Container>
      <ImageBox>
        <ImageGrid>
          <ImageGrid_>
            {data.deadlineStatus ? (
              <Image shape="moimcontentsdeadline" src={data.board_imgUrl} />
            ) : (
              <Image shape="moimcontents" src={data.board_imgUrl} />
            )}
          </ImageGrid_>
        </ImageGrid>
      </ImageBox>
      <DetailBox>
        <TitleBox>
          <TitleDate>{createdAt}</TitleDate>
          <TitleText>{data.title}</TitleText>
        </TitleBox>
        <IconBox>
          <Detail {...post_list} />
        </IconBox>
      </DetailBox>
      <ButtonBox>
        {!isMobile ? (<ToListButton>
          <ToListBtn
            onClick={() => {
              history.push("/board/mating");
            }}
          >
            목록으로
          </ToListBtn>
        </ToListButton>) :
        (<FloatingBtn
          onClick={() => {
            history.push("/board/mating");
          }}>목록으로</FloatingBtn>)}
        
        {none_login_editButton()}
      </ButtonBox>
      <ContentsBox>
          <Image shape="minicontents" src={data.board_imgUrl} />
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
        {none_login_apply()}
      </ApplicationBox>
      <ReviewContainer>
        <ReviewBox {...post_list} />
      </ReviewContainer>
    </Container>
  );
};}

  

const Container = styled.div`
  display: block;
  @media (max-width: 600px) {
    overflow: hidden;
  }
`;
const ImageBox = styled.div`
  width: 100%;
  margin: auto;
  
`;
const ImageGrid = styled.div`
  width: 100%;
  height: 260px;
  overflow: hidden;
  position: absolute;
  margin: auto;
  @media (max-width: 600px) {
    height: 280px;
   }
`;
const ImageGrid_ = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: auto;
  overflow: hidden;
  position: relative;
  @media (max-width: 600px) {
   }
`;
const DetailBox = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 100%;
  height: 260px;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

const TitleBox = styled.div`
  margin: 0 auto 0 auto;
  padding-top: 80px;
  position: relative;
  display: block;
  @media (max-width: 600px) {
    padding-top: 50px;
   }
`;
const TitleText = styled.h1`
  margin: 0;
  font-family: notosans_bold;
  font-size: 32px;
  float: left;
  color: #ffffff;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 26px;
  }
  @media (max-width: 600px) {
   font-size: 18px; 
  }
`;
const TitleDate = styled.p`
  font-family: notosans_regular;
  font-size: 20px;
  margin: 0;
  color: #b9b9b9;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px; 
   }
`;
const ButtonBox = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 40px auto 40px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    margin : 17px 0 7px 0;

   }
`;
const ToListButton = styled.div`
  cursor: pointer;
  display: block;
`;
const ToListBtn = styled.button`
  border: 1px solid #808080;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #ffffff;
  color: #000000;
  margin: 0;
  cursor: pointer;
`;
const EditButton = styled.div`
  float: right;
  margin: auto 0px auto auto;
  @media (max-width: 600px) {
    margin: 0 10px 0 auto;

    margin: 7px 10px 0 auto;
    height : 40px;
   }
`;
const EditBtn = styled.button`
  border: none;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #168ED9;
  color: #ffffff;
  margin-right: 12px;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 60px;
    font-size: 9px;
    margin-top: -20px;
   }
`;
const DeleteBtn = styled.button`
  border: 1px solid #168ED9;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  background-color: #ffffff;
  color: #000000;
  margin: 0;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 60px;
    font-size: 9px;
    margin-top: -20px;
   }
`;
const IconBox = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 28px auto auto auto;
  display: block;
  float: left;
  // @media (max-width: 600px) {
  //   display:flex;
  //   flex-direction: column; 
  //  }
`;
const ContentsBox = styled.div`
  max-width: 1200px;
  width: 100%;
  height : 513px;
  margin: 0 auto 50px auto;
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
    margin-bottom: 0;
  }
  @media (max-width: 600px) {
    width : 350px;
    flex-direction: column;
    margin : auto auto 34px auto;
   }
`;
const MemberBox = styled.div`
  max-width: 1200px;
  height : 288px;
  width: 100%;
  margin: auto auto 80px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    width : 350px;
    height : auto;
    flex-direction: column;
    margin-bottom : 34px;
   }
`;
const ApplyBox = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    width: 375px;
       }
`;
const PermitBox = styled.div`
  max-width: 1200px;
  margin: auto;
  @media (max-width: 600px) {
       }
`;
const ApplicationBox = styled.div`
  padding: 0 0 50px 0;
  background-color: #f8f8f8;
  @media (max-width: 600px) {
    padding-bottom: 20px;
       }
`;
const ReviewContainer = styled.div`
  margin-top : 50px;
  // margin: 34px auto 80px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
  }
  @media (max-width: 600px) {
    margin-top : 34px;
    margin-bottom : 34px;
       }
`
const FloatingBtn = styled.button`
  position: fixed;
  width: 70px;
  height: 70px;
  font-family: notosans_regular;
  font-size: 11px;
  color: #000;
  background-color: #BBCFDC;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  z-index: 2;
  bottom: 50px;
  right: 30px;
`;

export default MatingDetail;

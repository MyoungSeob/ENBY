import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../elements/Image";

import jwt_decode from "jwt-decode";

import styled from "styled-components";
import { actionsCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configStore";
import { useMediaQuery } from "react-responsive";
import swal from 'sweetalert';

const ReviewDetail = (props) => {

   //반응형
   const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const review_detail = useSelector((store) => store.post.review_detail);
  const review_createdAt = useSelector((store) => store.post.time);
  const review_id = props.match.params.id;
  console.log(review_id);

  const dispatch = useDispatch();

  const time = useSelector((store) => store.post.created_At);
  // const data = review_list.id
  const createdBy = review_detail.nickname;

  
  useEffect(() => {
    dispatch(postActions.getReviewDetailDB(review_id));
  }, [review_id]);

  const deletePost = () => {
    swal("게시글을 삭제하시겠습니까?", {
      buttons: {
        cancel: "취소",
        check: {
          text: "확인",
          value: "yes",
        },
    }})
      .then((value) => {
        switch (value) {
          case "yes":
            dispatch(postActions.deleteReviewDB(review_id));
            swal("","삭제 되었습니다!", "success");
            break;
        }
      })
    };


  const dateTime =
    parseInt(time[0]) +
    "년 " +
    parseInt(time[1]) +
    "월 " +
    parseInt(time[2]) +
    "일";

  
  const moveReviewBoard = () => {
    history.push("/board/review");
  };

  const is_login = () => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decode = jwt_decode(token);
      const my_name = decode.nickname;

      const move_edit = () => {
        if (my_name !== review_detail.nickname) {
          swal("게시글 수정은 작성자만 수정할 수 있습니다.");
          return;
        } else {
          history.push("/review/write/" + review_id);
        }
      };

      return createdBy === decode.nickname ? (
        <EditButton>
          <EditBtn onClick={move_edit}>수정하기</EditBtn>
          <DeleteBtn onClick={deletePost}>삭제하기</DeleteBtn>
        </EditButton>
      ) : (
        ""
      );
    } else {
      return "";
    }
  };
  const moveMatingDetailBoard = ()=>{
    history.push('/board/mating/' + review_detail.board_id)
  }
  return (
    <Container>
      <TopBox>
        <ImageBox>
          <ImageBox_>
            <Image src={review_detail.review_imgUrl} />
          </ImageBox_>
        </ImageBox>
        <TitleBox>
          <TitleContents>
            <TitleDate>{time}</TitleDate>
            <TitleText>{review_detail.title}</TitleText>
          </TitleContents>
        </TitleBox>
        <ButtonBox>
          {!isMobile ? (<TitleButton onClick={moveReviewBoard}>
            <TitleBtnName>목록으로</TitleBtnName>
          </TitleButton>) : (<FloatingBtn
          onClick={moveReviewBoard}
          >목록으로</FloatingBtn>)}
          
          {is_login()}
        </ButtonBox>
      </TopBox>
      <BottomBox>
        {isMobile ? (<MoveMoimButton>
        <Moim onClick={moveMatingDetailBoard}>원본 모집글 보기</Moim>
      </MoveMoimButton>) : ("")}
        <ContentImage>
          <Image shape="contents" src={review_detail.review_imgUrl} />
        </ContentImage>

        <ContentsBox>
          <ContentsTit>
            <ContentsH>About</ContentsH>
          </ContentsTit>
          <Contents>
            <ContentsP>{review_detail.contents}</ContentsP>
          </Contents>
        </ContentsBox>
      </BottomBox>
      {!isMobile ? (<MoveMoimButton>
        <Moim onClick={moveMatingDetailBoard}>원본 모집글 보기</Moim>
      </MoveMoimButton>) : ("")}
      
    </Container>
  );
};

const Container = styled.div`
  display: block;
  @media (max-width: 600px) {
      overflow: hidden;
      margin-bottom: -200px;
    }
`;
const TopBox = styled.div`
  width: 100%;
  margin: auto auto 0 auto;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 233px;
  margin: auto;
  overflow: hidden;
  position: absolute;
  @media (max-width: 600px) {
    height: 200px;
  }
`;
const ImageBox_ = styled.div`
  margin: 100%;
  max-width: 1920px;
  margin: auto;
  overflow: hidden;
  position: relative;
`;

const TitleBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 233px;
  margin: auto;
  display: block;
  position: relative;
  z-index: 1;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
    width: 650px;
  }
  @media (max-width: 600px) {
    margin-left: 10px;
   }
`;
const TitleContents = styled.div`
  padding-top: 80px;
`;
const TitleText = styled.h1`
  margin: auto;
  font-family: notosans_bold;
  font-size: 32px;
  float: left;
  color: #ffffff;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 25px;
  }
  @media (max-width: 600px) {
    font-size: 21px; 
   }
`;
const TitleDate = styled.p`
  font-family: notosans_regular;
  font-size: 18px;
  margin: 0;
  color: #b9b9b9;
  @media (min-width: 600px) and (max-width: 1170px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 14px; 
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
  }
`;
const TitleButton = styled.div`
  // border : 1px solid #FFFFFF;
  // padding-top : 12px;
  // border-radius : 20px;
  // float : right;
  // cursor : pointer;
  cursor: pointer;
  display: block;
`;
const TitleBtnName = styled.button`
  border: 1px solid #000000;
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
const BottomBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  margin: auto auto 40px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
      width: 760px;
      margin: 0 auto 40px auto;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    width: 280px;
    margin: 0;
   }
`;
const ContentImage = styled.div`
  width: 513px;
  margin: 0 48px 0 0;
  display: block;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
    margin-right: 20px;
  }
  @media (max-width: 600px) {
    width: 280px;
   }
  
`;
const ContentsBox = styled.div`
  width: 639px;
  height: 407px;
  margin: 0 auto auto 0;
  display: block;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 300px;
    margin-top: 10px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    margin-left: 30px; 
    width: 280px;
   }
`;
const ContentsTit = styled.div`
  display: block;
  margin-bottom: 34px;
  @media (max-width: 600px) {
    margin-top: 20px;
   }
`;
const ContentsH = styled.h2`
  margin: 0;
  font-family: seravek;
  font-style: italic;
  font-size: 28px;
  @media (max-width: 600px) {
    font-size: 21px;
   }
`;
const Contents = styled.div`
width : 639px;
height : 437px;
overflow : auto;
text-overflow: ellipsis;
@media (min-width: 600px) and (max-width: 1170px) {
  width: 300px;
}
`;
const ContentsP = styled.p`
  font-family: notosans_regular;
  font-size: 18px;
  margin: 0;
  white-space : pre-wrap;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 300px;
  }
  @media (max-width: 600px) {
    font-size: 13px;
    // margin-top: -30px;
   }
`;
const EditButton = styled.div`
  float: right;
  margin: auto 0px auto auto;
  @media (max-width: 600px) {
    // max-width: 480px;
    width: 100%;
    margin: -40px 0 -200px 200px ;
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
  background-color: #168ed9;
  color: #ffffff;
  margin-right: 12px;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-left: 30px;
    width: 60px;
    margin-top: -20px;
    margin-bottom: 30px;
    font-size: 11px;
   }
`;
const DeleteBtn = styled.button`
  border: 1px solid #168ed9;
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
    font-size: 11px;
    margin-top: -20px;
    margin-bottom: 30px;
   }
`;
const MoveMoimButton = styled.div`
  display: block;
  margin: auto auto 50px auto;
  width: 1200px;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 15px;
    width: 300px;
  }
  @media (max-width: 600px) {
    margin-left: 30px;
    width: 167px;
    margin-top: -20px;
    margin-bottom: 30px;
   }
`;
const Moim = styled.button`
  width: 167px;
  height: 40px;
  border: 1px solid #000000;
  border-radius: 20px;
  font-family: notosans_regular;
  font-size: 18px;
  background-color: #ffffff;
  cursor : pointer;
  @media (max-width: 600px) {
    width: 100px;
    font-size: 10px;
   }
`;
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
  z-index: 1;
  bottom: 50px;
  right: 30px;
`;
export default ReviewDetail;

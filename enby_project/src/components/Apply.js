// MatingDetail의 신청 & 신청 취소하기 컴포넌트입니다.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionsCreators as applyActions } from "../redux/modules/apply";
import jwt_decode from "jwt-decode";
import swal from 'sweetalert';

const Apply = (props) => {
  const dispatch = useDispatch();

  // 리덕스에 저장되어 있는 게시글 상세 정보입니다.
  const post_list = useSelector((store) => store.post.detail_list);
  // 리덕스에 저장되어 있는 게시글 신청 정보입니다.
  const apply_list = useSelector((store) => store.post.apply_list);
  const id = post_list.id;
  // 게시글 신청 정보와 게시글 신청 시 얻는 토큰 값이 같은지 판별 후 regist_list에 넣어주는 코드입니다.
  const is_login = () => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decodeName = jwt_decode(token).nickname;
      const regist_list = [];
      for (let i = 0; i < apply_list.length; i++) {
        if (apply_list[i].nickname === decodeName) {
          regist_list.push(apply_list[i]);
        }
      }
      // regist_list에는 값이 하나만 들어갈 수 있기에 첫번째를 regist로 설정하였습니다.
      const regist = regist_list[0];
      if (fullPerson === 1) {
        return (
          <NoticeDeadline>
            <NoticeP>죄송합니다. 현재 모집이 마감된 모임이에요.</NoticeP>
          </NoticeDeadline>
        );
      }
      if (post_list.deadlineStatus === true) {
        return (
          <NoticeDeadline>
            <NoticeP>죄송합니다. 현재 모집이 마감된 모임이에요.</NoticeP>
          </NoticeDeadline>
        );
      }
      if (fullPerson < 1) {
        return regist_list.length < 1 ? (
          <>
            <Contect>
              <KakaoId>
                <Id>Kakao ID</Id>
                <IdInput
                  placeholder="카카오톡 ID를 작성해 주세요."
                  onChange={(e) => {
                    setKakaoId(e.target.value);
                  }}
                />
              </KakaoId>
              <Comment>
                <CommentTit>한마디</CommentTit>
                <Contents
                  placeholder="신청을 위해 간단한 한마디를 작성해 주세요."
                  onChange={(e) => {
                    setApplyComment(e.target.value);
                  }}
                ></Contents>
              </Comment>
            </Contect>
            <ButtonBox>
              <ApplyButton onClick={applyAttend}>신청하기</ApplyButton>
            </ButtonBox>
          </>
        ) : (
          <Contect>
            <CheckBox>
              <CheckMe>
                <CheckImg src={regist.profile_img} />
                <CheckId>{regist.nickname}</CheckId>
              </CheckMe>
              <CheckContents>
                <CheckKakaoID>
                  <CheckH>Kakao ID : {regist.kakao_id}</CheckH>
                </CheckKakaoID>
                <CheckComment>
                  <CheckP>{regist.contents}</CheckP>
                </CheckComment>
              </CheckContents>
              <CheckButtonBox>
                <ApplyButton onClick={cancelAttend}>취소하기</ApplyButton>
              </CheckButtonBox>
            </CheckBox>
          </Contect>
        );
      }
    } else {
      if (fullPerson === 1) {
        return (
          <NoticeDeadline>
            <NoticeP>죄송합니다. 현재 모집이 마감된 모임이에요.</NoticeP>
          </NoticeDeadline>
        );
      }
      if (post_list.deadlineStatus === true) {
        return (
          <NoticeDeadline>
            <NoticeP>죄송합니다. 현재 모집이 마감된 모임이에요.</NoticeP>
          </NoticeDeadline>
        );
      }
      if (fullPerson < 1) {
        return (
          <>
            <Contect>
              <KakaoId>
                <Id>Kakao ID</Id>
                <IdInput
                  placeholder="카카오톡 ID를 작성해 주세요."
                  onChange={(e) => {
                    setKakaoId(e.target.value);
                  }}
                />
              </KakaoId>
              <Comment>
                <CommentTit>한마디</CommentTit>
                <Contents
                  placeholder="신청을 위해 간단한 한마디를 작성해 주세요."
                  onChange={(e) => {
                    setApplyComment(e.target.value);
                  }}
                ></Contents>
              </Comment>
            </Contect>
            <ButtonBox>
              <ApplyButton onClick={applyAttend}>신청하기</ApplyButton>
            </ButtonBox>
          </>
        );
      }
    }
  };

  // 신청한 사람들과 총 모임인원을 기반으로 한 프로그레스 바를 위한 수식입니다.
  const fullPerson = post_list.people_current / post_list.people_max;

  // 신청자가 작성하는 카카오 아이디와 한마디 작성 시 필요한 useState입니다.
  const [kakaoId, setKakaoId] = React.useState("");
  const [applyComment, setApplyComment] = React.useState("");
  // 신청을 할 때, 해당 사항을 검사 후 신청을 합니다.
  const applyAttend = () => {
    if (localStorage.getItem("token") === null) {
      swal("🤖신청하기는 로그인이 필요한 기능입니다");
      return;
    }
    if (kakaoId === "" || applyComment === "") {
      swal(
        "연락가능한 카카오톡 아이디와 신청을 위한 한마디 모두 작성해주세요!"
      );
    } else {
      dispatch(applyActions.attendApplyDB(id, kakaoId, applyComment));
    }
  };

  //  신청 취소 버튼입니다.
  const cancelAttend = () => {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decodeName = jwt_decode(token).nickname;
      const regist_list = [];
      for (let i = 0; i < apply_list.length; i++) {
        if (apply_list[i].nickname === decodeName) {
          regist_list.push(apply_list[i]);
        }
      }
      // regist_list에는 값이 하나만 들어갈 수 있기에 첫번째를 regist로 설정하였습니다.
      const regist = regist_list[0];
      const register_id = regist.register_id;
    dispatch(applyActions.cancelApply(id,register_id));
  }};
  // 현재 이 모임이 마감되었을 때와 모집 중일 때의 뷰를 조건문을 이용하여 나타내었습니다. (모집 인원이 모두 모였을 때, 주최자가 마감버튼을 눌렀을 때)

  return (
    <ApplyBox>
      <Title>
        <ApplySubTit>이 등산에 함께하고 싶으시다면?</ApplySubTit>
        <ApplyTit>Application</ApplyTit>
      </Title>
      {is_login()}
    </ApplyBox>
  );
};

const ApplyBox = styled.div`
  margin-bottom: 34px;
  max-width: 1200px;
  width: 100%;
  @media (min-width: 600px) and (max-width: 1170px) {
    max-width: 100%;
  }
  @media (max-width: 600px) {
    margin-left: 12.5px;
    margin-top: 34px;
  }
`;
const Title = styled.div``;
const ApplySubTit = styled.p`
  margin: 0;
  font-family: notosans_regular;
  font-size: 18px;
  color: #474747;
  @media (max-width: 600px) {
    font-size: 8px;
  }
`;
const ApplyTit = styled.h2`
  margin-top: 5px;
  font-family: seravek;
  font-size: 28px;
  font-style: italic;
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;
const Contect = styled.div`
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    flex-direction: column;
    margin-left: 35px;
    width: 100%;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: -15px;
  }
`;
const KakaoId = styled.div`
  margin-right: 24px;
  @media (max-width: 600px) {
    margin-right: 0;
  }
`;
const Id = styled.p`
  font-size: 18px;
  color: #000000;
  font-family: notosans_medium;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const IdInput = styled.input`
  width: 320px;
  height: 40px;
  border: 1px solid #b9b9b9;
  border-radius: 20px;
  font-size: 18px;
  padding-left: 20px;
  outline: none;
  @media (max-width: 600px) {
    width: 140px;
    height: 24px;
    font-size: 11px;
  }
`;
const Comment = styled.div`
  margin-bottom: 20px;
`;
const CommentTit = styled.p`
  font-size: 18px;
  color: #000000;
  font-family: notosans_medium;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const Contents = styled.input`
  width: 810px;
  height: 40px;
  border: 1px solid #b9b9b9;
  border-radius: 20px;
  font-size: 18px;
  padding-left: 20px;
  outline: none;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 580px;
    height: 90px;
  }
  @media (max-width: 600px) {
    width: 326px;
    height: 24px;
    font-size: 12px;
  }
`;
const ButtonBox = styled.div`
  float: right;
  @media (min-width: 600px) and (max-width: 1170px) {
    float: left;
    margin-left: 40px;
  }
  @media (max-width: 600px) {
    display: block;
    width: 350px;
    float: left;
    margin-top: -10px;
  }
`;
const ApplyButton = styled.button`
  width: 167px;
  height: 40px;
  font-size: 18px;
  font-family: notosans_regular;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #168ed9;
  padding-bottom: 2px;
  cursor: pointer;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
  
  @media (max-width: 600px) {
    width: 60px;
    height: 30px;
    float: right;
    font-size: 9px;
  }
`;
const CheckBox = styled.div`
  margin-top: 34px;
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    
  }
`;
const CheckMe = styled.div`
  display: flex;
  width: 196px;
  @media (max-width: 600px) {
    width: 120px;
  }
`;
const CheckImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-top: 3px;
  margin-right: 10px;
`;
const CheckId = styled.p`
  margin: 0;
  font-size: 18px;
  font-family: notosans_regular;
`;
const CheckContents = styled.div`
  margin-left: 24px;
`;
const CheckKakaoID = styled.div`
  width: 813px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 300px;
  }
  @media (max-width: 600px) {
    width: 150px;
  }
`;
const CheckH = styled.h1`
  margin: 0px;
  font-size: 18px;
  font-family: notosans_regular;
  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: -30px;
  }
`;
const CheckComment = styled.div`
@media (min-width: 600px) and (max-width: 1170px) {
    width: 300px;
}
@media (max-width: 600px) {
  width: 150px;
  margin-left: -30px;
}
`;
const CheckP = styled.p`
  font-size: 18px;
  font-family: notosans_regular;
  max-width: 1000px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const CheckButtonBox = styled.div``;
const NoticeDeadline = styled.div`
  margin: auto auto 80px auto;
  @media (max-width: 600px) {
    margin-bottom: 54px;
  }
`;
const NoticeP = styled.p`
  margin: 34px 0 0 0;
  text-align: center;
  font-size: 18px;
  font-family: notosans_regular;
  color: #b9b9b9;
  @media (max-width: 600px) {
    width: 350px;
    padding-right: 20px;
  }
`;
export default Apply;

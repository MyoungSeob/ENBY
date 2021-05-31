// 작성게시판
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionsCreators as imgActions } from "../redux/modules/image";
import { actionsCreators as postActions } from "../redux/modules/post";
import Header from "../components/Header";
import upload from "../shared/image/upload.png";
import { useMediaQuery } from "react-responsive";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

// DatePicker
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ReactGA from 'react-ga';
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

const MatingBoardWrite = (props) => {
  useEffect(()=>{
    getGA();
  }, []);

  const getGA =()=>{
    const pathName = window.location.pathname;
    ReactGA.initialize('G-YCWTTJWZF4');
    ReactGA.set({page : pathName});
    ReactGA.pageview(pathName);
  }
  // 반응형 구현
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });
  const is_login = () => {};
  // 수정모드
  // 해당 아이디 값은 게시글 아이디입니다.
  const post_id = Number(props.match.params.id);

  const is_edit = post_id ? true : false;

  const post_list = useSelector((store) => store.post.list);
  let post_img = useSelector((store) => store.post.detail_list.board_imgUrl);
  // 수정하기가 맞다면 해당 게시글 아이디와 작성된 게시물 중 아이디 값이 같은 게시물을 찾습니다.
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  // 만약 수정하기라면, 해당 게시물들의 값들을 그대로 들고오고, 아니라면 빈칸을 가지고옵니다.(작성하기)
  const [title, setTitle] = useState(_post ? _post.title : "");
  const [contents, setContents] = useState(_post ? _post.contents : "");
  const [boardImg, setImage] = useState(_post ? post_img : null);
  const [location, setLocation] = useState(_post ? _post.location : "");
  const [people_max, setPeople_max] = useState(_post ? _post.people_max : "");

  // 이미지 추가 미리보기
  const preview = useSelector((state) => state.image.preview);
  const fileInput = useRef();
  const dispatch = useDispatch();
  // 날짜, 시간 가져오기(datepicker) => input받은 날짜,시간 형식 변경

  const [date, setDate] = useState(new Date());
  // 사용자가 수정을 할 때, 날짜를 수정하였다면 true로 변하고, 수정하지 않았다면 계속 false인 함수입니다.
  // 날짜가 수정되었는지 안되었는지를 나타내는 함수!!!!
  const [dateEdit, setDateEdit] = useState(false);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const timezoneDate = new Date(date - timezoneOffset);
  const finalDate = timezoneDate.toISOString();

  const meetTime = is_edit ? _post.meetTime : finalDate.split(".")[0];

  useEffect(() => {
    // setImage(preview);
  }, [preview, people_max]);

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    if (!file) {
      return;
    }

    reader.readAsDataURL(file);
    // 파일 읽기가 끝났을때의 이벤트 받아옴
    reader.onloadend = () => {
      // setPreviewimg(file)
      setImage(file);
      dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
    };
  };
  // 인원 수 선택에서 선택한 값을 가져오는 방법입니다.
  const selectHandler = () => {
    //해당 인풋의 아이디를 불러오고,
    const countperonSelect = document.getElementById("countPeople");
    // 해당 인풋의 옵션 중 선택된 값을 가져와서
    const getCount =
      countperonSelect.options[countperonSelect.selectedIndex].value;
    //people_max의 useState에 값을 넣어줍니다.
    setPeople_max(getCount);
  };
  // 사용자들이 수정할 때 등록했던 이미지를 가지고 오고, 새로운 사진을 선택 했을 때 새로운 사진을 미리보기 할 수 있도록 하는 코드입니다.
  const EditPreview = () => {
    // 만약 올렸던 사진과 현재 올린 사진이 같다면(사진을 변경하지 않았다면),
    if (boardImg === _post.board_imgUrl) {
      // 현재 사진을 보여주고
      return boardImg;
    } else {
      // 다르다면(사진이 변경됐다면) 해당 사진의 미리보기를 보여줌
      return preview;
    }
  };
  // 위의 함수와 비슷하나, API를 위해 사진의 정보를 보내는데 사용하는 함수입니다.
  const editImage = () => {
    // 만약 올렸던 사진과 현재 올린 사진이 같다면(사진을 변경하지 않았다면),
    if (boardImg === _post.board_imgUrl) {
      // null값을 보냅니다.(백엔드와 협의하여 사진 변경이 없다면 null로 보내기로 함.)
      return null;
    } else {
      // 다르다면(사진이 변경됐다면) 해당 사진의 정보값을 보내줍니다.
      return boardImg;
    }
  };
  // 날짜를 수정할 때, 날짜 및 시간값을 API로 보내는 함수입니다.
  const editDate = () => {
    // 만약 날짜&시간이 수정되지 않았다면
    if (dateEdit === false) {
      // 현재 날짜 값 그대로~
      return meetTime;
    } else {
      // 수정되었다면 해당 과정을 거쳐(서버에서 받을 수 있도록 정보를 가공하여)
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const timezoneDate = new Date(date - timezoneOffset);
      const finalDate = timezoneDate.toISOString();
      // 가공된 값을 서버로 보내준다.
      return finalDate.split(".")[0];
    }
  };
  // 날짜&시간을 수정할 때, 사용자의 화면에 나타나는 값을 나타내는 함수입니다.
  const editDateView = () => {
    //만약 사용자가 수정을 하지 않았다면,
    if (dateEdit === false) {
      const alrightMeetTime =
        meetTime.split("T")[0].split("-")[0] +
        "/" +
        meetTime.split("T")[0].split("-")[1] +
        "/" +
        meetTime.split("T")[0].split("-")[2] +
        " " +
        meetTime.split("T")[1].split(":")[0] +
        ":" +
        meetTime.split("T")[1].split(":")[1];
      // 해당 과정을 거쳐 우리 사이트만의 양식으로 화면에 나타내 주고,
      return alrightMeetTime;
    } else {
      // 수정이 되었다면 그 값 또한 우리 사이트만의 양식으로 화면에 나타내 줍니다.
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const timezoneDate = new Date(date - timezoneOffset);
      const finalDate = timezoneDate.toISOString();
      const alrightMonth =
        finalDate.split(".")[0].split("T")[0].split("-")[0] +
        "/" +
        finalDate.split(".")[0].split("T")[0].split("-")[1] +
        "/" +
        finalDate.split(".")[0].split("T")[0].split("-")[2] +
        " " +
        finalDate.split(".")[0].split("T")[1].split(":")[0] +
        ":" +
        finalDate.split(".")[0].split("T")[1].split(":")[1];

      return alrightMonth;
    }
  };
  console.log(people_max)
  const addPost = () => {
    if (title === "") {
      swal("제목을 입력해주세요");
      return;
    }
    if (contents === "") {
      swal("모집 내용을 입력해주세요");
      return;
    }
    if (meetTime === "") {
      swal("만나실 시간을 입력해주세요");
      return;
    }
    if (people_max === "") {
      swal("인원수를 입력해주세요");
      return;
    } else {
      dispatch(
        postActions.addPostDB(
          title,
          contents,
          boardImg,
          location,
          meetTime,
          people_max
        )
      );
    }
  };
  const editPost = () => {
    dispatch(
      postActions.editPostDB(
        post_id,
        title,
        contents,
        editImage(),
        location,
        editDate(),
        people_max
      )
    );
  };

  const is_upload = () => {
    if (boardImg === null) {
      return (
        <Label for="boardImage">
          <span>
            <LabelBox>
              <LabelImage src={upload} />
              <Label_ for="boardImage">이미지 불러오기</Label_>
            </LabelBox>
          </span>
        </Label>
      );
    } else {
      return _post ? (
        <>
          <LabelUpload for="boardImage" />
          <PreviewImage src={EditPreview()} />
        </>
      ) : (
        <>
          <LabelUpload for="boardImage" />
          <PreviewImage src={preview} />
        </>
      );
    }
  };

  return (
    <Container>
      {!isDesktop ? (
        <HeadContainer>
          <Head>
            <SubTitle1>Be Connected with SANTA!</SubTitle1>
            <Title>모임글 작성하기</Title>
          </Head>
        </HeadContainer>
      ) : (
        ""
      )}
      <Test>
        <TitleBox>
          {/* {!isMobile?
              (<InputGrid>
                <InputBox
                  label="제목"
                  value={title}
                  onChange={(e) => {

                    setTitle(e.target.value);}}
                  placeholder="제목을 입력하세요"
                />
                {_post ? (
                  <EditButton
                    onClick={editPost}
                  >
                    수정하기
                  </EditButton>
                ) : (
                  <PostButton
                    onClick={addPost}
                  >
                    작성하기
                  </PostButton>
                )} */}
          {/* </InputGrid>):(
                <InputBox
                  label="제목"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);}}
                  placeholder="제목을 입력하세요"
                />
              )} */}
          <InputGrid>
            <InputBox
              label="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목을 입력하세요"
            />
          </InputGrid>
          <DetailGrid>
            <DateContainer>
              <Icon src={require("../shared/image/calendaredit.png").default} />
              {_post ? (
                <Cal
                  label="날짜시간"
                  value={editDateView()}
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                    setDateEdit(true);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy/MM/dd h:mm aa"
                  placeholderText="모임 날짜/시간"
                />
              ) : (
                <Cal
                  label="날짜시간"
                  value={date}
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy/MM/dd h:mm aa"
                  placeholderText="모임 날짜/시간"
                />
              )}
            </DateContainer>
            <Place>
              <Icon_ src={require("../shared/image/place.png").default} />
              <Location
                label="장소"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="등산할 산 이름이나 간략한 목표 지점을 적어주세요."
              />
            </Place>
            <People>
              <Icon_ src={require("../shared/image/person.png").default} />
              <MaxPeople
                label="인원"
                name="countPeople"
                id="countPeople"
                onChange={selectHandler}
                placeholder="인원"
              >
                <option value="">총 인원 수 선택</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
              </MaxPeople>
            </People>
          </DetailGrid>
        </TitleBox>

        <ContentsBox>
          <ImageBox>
            {is_upload()}
            <Image
              onChange={selectFile}
              placeholder="사진을 추가해주세요"
              id="boardImage"
              ref={fileInput}
              type="file"
              src={_post ? EditPreview : preview}
            />
          </ImageBox>
          <TextBox>
            <TextBox2>
              <ContentsH>About</ContentsH>
            </TextBox2>
            <Contents
              label="내용"
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
              placeholder="모임을 모집하기 위한 내용을 작성해주세요.&#13;&#13;&#10;등산 목표, 일정, 준비물 ,선호 사항 등의 정보를 알려주시면, 신청하시는 메이트에게 더 큰 도움이 될거에요!
                "
            />
          </TextBox>
        </ContentsBox>
        {/* {isMobile? */}
        {/* ( */}
        <EditBox>
          {_post ? (
            <EditButton onClick={editPost}>수정하기</EditButton>
          ) : (
            <PostButton onClick={addPost}>작성하기</PostButton>
          )}
          {/* )) : ("") } */}
        </EditBox>
      </Test>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  width: 100%;
  @media (max-width: 600px) {
    margin-top: 20px;
    background-color: #f8f8f8;
    height: 1300px;
    overflow: hidden;
  }
`;
const HeadContainer = styled.div`
  background-color: #bbcfdc;
  height: 160px;
  width: 100%;
  // min-width: 320px;
  padding-top: 10px;
`;
const Head = styled.div`
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-top: 40px;
    margin-left: 20px;
  }
  @media (max-width: 600px) {
    margin-left: 30px;
    margin-top: 20px;
  }
`;
const SubTitle1 = styled.div`
  height: 26px;
  font-family: notosans_regular;
  margin-top: 2px;
  font-size: 18px;
  line-height: 26px;
  color: #7d7d7d;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const Title = styled.div`
  height: 37px;

  font-family: seravek;
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;

  color: #000000;
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;
const Test = styled.div`
  width: 100%;
`;
const TitleBox = styled.div`
  width: 100%;
  height: 200px;
  margin: auto;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  margin-bottom: -100px;
`;
const InputGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 46px;
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;
const InputBox = styled.input`
  display: flex;
  padding: 6px 20px;
  width: 1200px;
  height: 39px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 700px;
    margin: auto;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 30px;
    margin: 50px auto 30px auto;
    // margin-bottom: 30px;
  }
`;
const LabelUpload = styled.label`
  position: absolute;
  width: 513px;
  height: 513px;
`;
const PreviewImage = styled.img`
  width: 513px;
  height: 513px;
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;
const DetailGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 46px;
  display: flex;
  @media (min-width: 600px) and (max-width: 1170px) {
    max-width: 700px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0 0 0 40px;
  }
`;
const DateContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Cal = styled(DatePicker)`
  padding: 6px 20px;
  width: 328px;
  height: 39px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  // color: #B9B9B9;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 180px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 30px;
  }
`;

const Place = styled.div`
  display: flex;
  margin-left: 250px;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: 30px;
    margin-left: 100px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 30px;
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

const Location = styled.input`
  padding: 6px 20px;

  width: 328px;
  height: 39px;

  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  margin-right: 30px;
  &:focus {
    outline: none;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 180px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 30px;
  }
`;
const People = styled.div`
  display: flex;
`;
const MaxPeople = styled.select`
  // padding: 10px 20px 0 20px;

  width: 333px;
  height: 39px;
  padding: 6px 20px 6px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  outline: none;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 180px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 30px;
  }
`;

const ImageBox = styled.div`
  width: 718px;
  margin: auto 61px 170px auto;
  display: block;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
    margin: auto;
  }
  @media (max-width: 600px) {
    width: 300px;
    margin: 0;
  }
`;

const Image = styled.input`
  display: none;
`;

const TextBox = styled.div`
  width: 718px;
  height: 421px;
  float: right;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    margin: auto;
    margin-top: 30px;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
    margin-top: 30px;
  }
`;
const ContentsBox = styled.div`
  display: flex;
  width: 1200px;
  height: 511px;
  margin: 180px auto 30px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 600px;
    height: 800px;
    // margin-left: 120px;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    width: 300px;
    flex-direction: column;
  }
`;

const TextBox2 = styled.div`
  width: 100%;
  color: #000000;
  margin: auto;
  @media (max-width: 600px) {
    // width:300px;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 513px;
  height: 513px;
  background: #f8f8f8;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;
const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: -37px;
  margin: 210px 173px;
  @media (max-width: 600px) {
    margin: 100px auto;
  }
`;
const LabelImage = styled.img`
  width: 24px;
  height: 34px;
  margin: auto;
`;
const Label_ = styled.label`
  background-color: #168ed9;
  width: 167px;
  height: 30px;
  color: #ffffff;
  text-align: center;
  border-radius: 20px;
  margin-top: 20px;
  padding-top: 10px;
  cursor: pointer;
  // margin : 210px 173px;
  @media (min-width: 600px) and (max-width: 1170px) {
    margin-left: -30px;
  }
  @media (max-width: 600px) {
    margin: auto;
    margin-top: 20px;
    font-size: 11px;
    width: 100px;
    height: 20px;
  }
`;

const ContentsH = styled.h2`
  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  margin: auto;
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

const Contents = styled.textarea`
  display: block;
  padding: 20px 20px;

  width: 615px;
  height: 437px;
  margin: 33px 0 33px 0;

  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 320px;
    margin-top: 12px;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  margin-top: 3px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 38px;
    height: 38px;
    margin-right: 3px;
  }
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
const Icon_ = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  margin-top: 2px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 38px;
    height: 38px;
    margin-right: 3px;
  }
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
const EditBox = styled.div`
  display: block;
  width: 1200px;
  margin: auto;
  @media (min-width: 600px) and (max-width: 860px) {
    width: 450px;
    margin-top: 70px;
  }
  @media (min-width: 860px) and (max-width: 1170px) {
    width: 450px;
    margin-top: 70px;
  }
  @media (max-width: 600px) {
    width: 300px;
    font-size: 11px;
    margin-top: 200px;
  }
`;
const PostButton = styled.button`
  background: #168ed9;
  border-radius: 20px;
  margin-left: 24px;
  margin-bottom: 40px;
  width: 167px;
  height: 40px;
  cursor: pointer;
  border: 0;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #ffffff;
  float: right;
  // margin-bottom: 40px;
  @media (min-width: 600px) and (max-width: 860px) {
    margin: 30px 160px 40px 0;
  }
  @media (min-width: 860px) and (max-width: 1170px) {
    float: right;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 30px;
    font-size: 11px;
    margin: 0;
  }
`;
const EditButton = styled.button`
  background: #168ed9;
  border-radius: 20px;
  margin-left: 24px;
  margin-bottom: 40px;
  width: 167px;
  height: 40px;
  cursor: pointer;
  float: right;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #ffffff;
  border: none;
  margin-bottom: 40px;
  @media (min-width: 600px) and (max-width: 860px) {
    margin: 30px 160px 40px 0;
    float: right;
  }
  @media (min-width: 860px) and (max-width: 1170px) {
    margin: 30px 290px 40px 0;
    float: right;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 30px;
    font-size: 11px;
    margin: 0;
  }
`;

export default MatingBoardWrite;

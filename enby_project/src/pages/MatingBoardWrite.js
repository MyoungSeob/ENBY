import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {actionsCreators as imgActions} from "../redux/modules/image"
import {actionsCreators as postActions} from "../redux/modules/post"
import Header from '../components/Header'
import upload from '../shared/image/upload.png'
import { useMediaQuery } from "react-responsive";

// DatePicker
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)


const MatingBoardWrite = (props) => {
  // 반응형 구현
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

    // 수정모드
    const post_id = Number(props.match.params.id);

    const is_edit = post_id? true : false;

    const post_list = useSelector(store => store.post.list);
    let post_img = useSelector((store)=> store.post.detail_list.board_imgUrl)
    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;


    const [title, setTitle] = useState(_post? _post.title : "");
    const [contents, setContents] = useState(_post? _post.contents : "");
    // const [boardImg, setImage] = useState();
    const [boardImg, setImage] = useState(_post? post_img : null);

    const [location, setLocation] = useState(_post? _post.location : "");
    // const [meetTime, setMeetTime] = useState(_post? _post.meetTime : null);
    const [people_max, setPeople_max] = useState(_post? _post.people_max : "");
    
    // 이미지 추가 미리보기`
    const preview = useSelector((state) => state.image.preview);
    const fileInput = useRef();
    const dispatch = useDispatch();
    // 날짜, 시간 가져오기(datepicker) => input받은 날짜,시간 형식 변경
    
    const [date, setDate] = useState(new Date());
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const timezoneDate = new Date(date - timezoneOffset);
    const finalDate = timezoneDate.toISOString();
    const meetTime = finalDate.split(".")[0];
    const deadline_status = "false";
    // {setMeetTime(finalMeetTime)};



    function onchange(value, dateString) {
    }

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
            setImage(file)
            dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
        };
    };
    const selectHandler=()=>{
      const countperonSelect = document.getElementById("countPeople");
      const getCount = countperonSelect.options[countperonSelect.selectedIndex].value;

      setPeople_max(getCount)
    }


    const EditPreview=()=>{
      if(boardImg === _post.board_imgUrl){
        return boardImg
      }else{
        return preview
      }
    }
    const editImage=()=>{
      if(boardImg === _post.board_imgUrl){
        return null
      }else{
        return boardImg
      }
    }
    // const editDate=()=>{
    //   if(_post.meetTime === )
    // }
    const addPost = () => {
      dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime, people_max));
    };
    const editPost= () => {
      dispatch(postActions.editPostDB(post_id, title, contents, editImage(), location, meetTime, people_max));
    };

    
    const is_upload =()=>{
      if( boardImg === null){
        return (
            <Label for="boardImage">
              <span>
                <LabelBox>
                  <LabelImage src={upload} />
                  <Label_ for="boardImage">이미지 불러오기</Label_>
                </LabelBox>
              </span>
            </Label>
        )
      }else{
        return (
          _post ? (<>
            <LabelUpload for="boardImage" />
            <PreviewImage src={EditPreview()}/>
          </>) : (
            <>
            <LabelUpload for="boardImage" />
            <PreviewImage src={preview}/>
          </>
          )
          
        );
      }
    }
    
    return (
      <Container>
        {!isDesktop? 
        (<HeadContainer>
          <Head>
            <SubTitle1>Be Connected with SANTA!</SubTitle1>
            <Title>모임글 작성하기</Title>
          </Head>
        </HeadContainer>)
          : ("")}
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
                    setTitle(e.target.value);}}
                  placeholder="제목을 입력하세요"
                />
              </InputGrid>
              <DetailGrid>
                <DateContainer>
                    <Icon src={require("../shared/image/calendaredit.png").default}/>
                    {_post ? (
                      <Cal
                      label="날짜시간"
                      value={_post.meetTime}
                      selected={date}
                      onChange={(date) => {setDate(date)}}
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
                      onChange={(date) => {setDate(date);}}
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
                  <Icon_ src={require("../shared/image/place.png").default}/>
                  <Location
                    label="장소"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);}}
                    placeholder="장소"
                  />
                </Place>
                <People>
                <Icon_ src={require("../shared/image/person.png").default}/>
                  <MaxPeople
                    label="인원"
                    name = "countPeople"
                    id = "countPeople"
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
              id='boardImage'
              ref={fileInput}
              type='file'
              src={_post? EditPreview : preview}
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
                  setContents(e.target.value);}}
                placeholder="모임을 모집하기 위한 내용을 작성해주세요.&#13;&#13;&#10;등산 목표, 일정, 준비물 ,선호 사항 등의 정보를 알려주시면, 신청하시는 메이트에게 더 큰 도움이 될거에요!
                "
              />
              </TextBox>
            </ContentsBox>
          {/* {isMobile? */}
           {/* ( */}
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
            </PostButton>)}
           {/* )) : ("") } */}
        </Test>
      </Container>       
    );
}

const Container = styled.div`
  display: block;
  width: 100%;
  @media (max-width: 600px) {
    margin-top: 20px;
    background-color : #F8F8F8;
    height: 1300px;
    overflow: hidden;
  }
`;
const HeadContainer = styled.div`
  background-color: #BBCFDC;
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
    color: #7D7D7D;
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
  width : 100%;
`;
const TitleBox = styled.div`
  width: 100%;
  height : 200px;
  margin: auto;
  background-color : #F8F8F8;
  display : flex;
  flex-direction: column;
  margin-bottom: -100px;
`;
const InputGrid = styled.div`
  width : 100%;
  max-width: 1200px;
  margin : auto;
  display: flex;
  flex-direction: row;
  margin-top: 46px;
  @media (max-width: 600px) {
    font-size: 28px;
  }
`
const InputBox = styled.input`
  display: flex;
  padding: 6px 20px;
  width: 1200px;
  height: 39px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
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
position : absolute;
width: 513px;
height: 513px;
`
const PreviewImage = styled.img`
  width  : 513px;
  height : 513px;
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
  }
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`
const DetailGrid = styled.div`
  width: 100%;
  max-width : 1200px;
  margin : auto;
  margin-top: 30px;
  margin-bottom: 46px;
  display : flex;
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
  background: #FFFFFF;
  border: 1px solid #B9B9B9;
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
background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
margin-right: 30px;
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
background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
outline : none;
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
  margin : auto 61px 170px auto;
  display : block;
  @media (min-width: 600px) and (max-width: 1170px) {
  width: 450px;
  height: 450px;
  margin: auto;
  }
  @media (max-width: 600px) {
    width:300px;
    margin: 0;
  }
`;

const Image = styled.input`
 
  display: none;
`;

const TextBox = styled.div`
  width : 718px;
  height : 421px;
  float : right;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    margin: auto;
    margin-top: 30px;
  }
  @media (max-width: 600px) {
    width:300px;
    height: 300px;
    margin-top: 30px;
  }
`
const ContentsBox = styled.div`
  display: flex;
  width: 1200px;
  height: 511px;
  margin : 180px auto 30px auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 600px;
    height: 800px;
    // margin-left: 120px;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    width:300px;
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
  display : inline-block;
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
    width:300px;
    height:300px;
  }
  `
  const LabelBox = styled.div`
  display : flex;
  flex-direction : column;
  // margin-top: -37px;
  margin: 210px 173px;
  @media (max-width: 600px) {
    margin: 100px auto;
  }
`
const LabelImage = styled.img`
  width : 24px;
  height : 34px;
  margin : auto; 
`
const Label_ = styled.label`
  background-color : #168ed9;
  width : 167px;
  height : 30px;
  color : #ffffff;
  text-align : center;
  border-radius : 20px;
  margin-top : 20px;
  padding-top : 10px;
  cursor : pointer;
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
`

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
  resize : none;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 320px;
    margin-top: 12px;
  }
  @media (max-width: 600px) {
    width:300px;
    height:300px;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  margin-top : 3px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 38px;
    height: 38px;
    margin-right: 3px;
  }
  @media (max-width: 600px) {
    width:30px;
    height:30px;
  }
`;
const Icon_ = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 16px;
  margin-top : 2px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 38px;
    height: 38px;
    margin-right: 3px;
  }
  @media (max-width: 600px) {
    width:30px;
    height:30px;
  }
`;

const PostButton = styled.button`
  background: #168ED9;
  border-radius: 20px;
  margin-left : 24px;
  margin-bottom : 40px;
  width: 167px;
  height: 40px;
  cursor: pointer;
  border: 0;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #FFFFFF;
  float: right;
  // margin-bottom: 40px;
  margin-right: 120px;
  @media (min-width: 600px) and (max-width: 860px) {
    margin: 30px 160px 40px 0;
  }
  @media (min-width: 860px) and (max-width: 1170px) {
    margin: 30px 290px 40px 0;
    float: right;
  }
  @media (max-width: 600px) {
    width:80px;
    height:30px;
    font-size: 11px;
    margin: 180px 140px;
  }
  `;
const EditButton = styled.button`
  background: #168ED9;
  border-radius: 20px;
  margin-left : 24px;
  margin-bottom : 40px;
  width: 167px;
  height: 40px;
  cursor: pointer;
  font-family: notosans_regular;
  font-size: 18px;
  line-height: 150%;
  color: #FFFFFF;
  border: none;
  margin-bottom: 40px;
  @media (min-width: 600px) and (max-width: 860px) {
    margin: 30px 160px 40px 0;
    float:right;
  }
  @media (min-width: 860px) and (max-width: 1170px) {
    margin: 30px 290px 40px 0;
    float: right;
  }
  @media (max-width: 600px) {
    width:80px;
    height:30px;
    font-size: 11px;
    margin: 180px 140px;
  }
`;


export default MatingBoardWrite;
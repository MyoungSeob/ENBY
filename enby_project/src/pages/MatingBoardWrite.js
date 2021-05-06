// 작성게시판
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {actionsCreators as imgActions} from "../redux/modules/image"
import {actionsCreators as postActions} from "../redux/modules/post"
import Header from '../components/Header'

// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

// import DateTime from "../components/DateTime";


const MatingBoardWrite = (props) => {
    // 수정모드
    const post_id = Number(props.match.params.id);
    console.log(post_id);
    const is_edit = post_id? true : false;
    console.log(is_edit);
    const post_list = useSelector(store => store.post.list);
    let post_img = useSelector((store)=> store.post.detail_list.board_imgUrl)
    console.log(post_list);
    console.log(post_img);
    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;
    console.log(_post);

    const [title, setTitle] = useState(_post? _post.title : "");
    const [contents, setContents] = useState(_post? _post.contents : "");
    // const [boardImg, setImage] = useState();
    const [boardImg, setImage] = useState(_post? post_img : "");
    console.log(boardImg);
    const [location, setLocation] = useState(_post? _post.location : "");
    // const [meetTime, setMeetTime] = useState(_post? _post.meetTime : null);
    const [people_max, setPeople_max] = useState(_post? _post.people_max : "");

    // 이미지 추가 미리보기`
    const preview = useSelector((state) => state.image.preview);
    const fileInput = useRef();
    const dispatch = useDispatch();
    // 날짜, 시간 가져오기(datepicker) => input받은 날짜,시간 형식 변경
    const [date, setDate] = useState(new Date());
    console.log(date);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const timezoneDate = new Date(date - timezoneOffset);
    const finalDate = timezoneDate.toISOString();
    const meetTime = finalDate.split(".")[0];
    console.log(meetTime);
    // {setMeetTime(finalMeetTime)};
    console.log('그냥 ISOString = '+new Date().toISOString());
    console.log('timezone 반영 ISOString = '+timezoneDate.toISOString());


    function onchange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
      // setExpireDate(dateString);
      console.log();
    }

    useEffect(() => {
        // setImage(preview);
        }, [preview, people_max]);
    // 로그인 되어있을때만 포스트작성 가능하게 해준다
    // const is_login = useSelector((state) => state.user.is_login);
    // // 로그인이 안되어있을때 로그인 페이지로 이동
    // if(!is_login){
    //     return (
    //         <text>로그인이 필요해요! (페이지 또는 모달 생성예정)</text>
    //     )
    // }
      
    // useEffect(() => {
    //   dispatch(postActions.addPostDB(boardImg));
    // })
    // 이미지 추가 미리보기
    const selectFile = (e) => {
        const reader = new FileReader();
        // const file = _post? boardImg : fileInput.current.files[0];
        const file = fileInput.current.files[0];
        // console.log(file);
        if (!file) {
            return;
        } 

        reader.readAsDataURL(file);
        // 파일 읽기가 끝났을때의 이벤트 받아옴
        reader.onloadend = () => {
            // setPreviewimg(file)
            setImage(file)
            console.log(boardImg);
            console.log(reader.result);
            dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
        };
    };
    const selectHandler=()=>{
      const countperonSelect = document.getElementById("countPeople");
      const getCount = countperonSelect.options[countperonSelect.selectedIndex].value;

      setPeople_max(getCount)
    }

    return (
      <React.Fragment>
       <Header />
       <Image
            onChange={selectFile}
            placeholder="사진을 추가해주세요"
            name='image' 
            ref={fileInput}
            type='file'
            src={_post? post_img : preview}
            />
        <Test>
          <Container>
            <InputBox
                label="제목"
                value={title}
                onChange={(e) => {
                  console.log("제목추가");
                  console.log(title);
                  setTitle(e.target.value);}}
                placeholder="제목을 입력하세요"
              />
              <Line />
              <TextBox1>
                Detail
              </TextBox1>
              <TextBox2>          
                  About
              </TextBox2>  
              <DatePicker
                style={{ width: "30px" }}
                label="날짜시간"
                value={date}
                selected={date}
                onChange={(date) => {setDate(date); console.log(date); }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy/MM/dd h:mm aa"
              />
            <Place>
              <Icon1 src={require("../shared/image/place.png").default}/>
              <Location
                label="장소"
                value={location}
                onChange={(e) => {
                  console.log("장소추가");
                  console.log(location);
                  setLocation(e.target.value);}}
                placeholder="장소"
              />
            </Place>
              <Icon2 src={require("../shared/image/person.png").default}/>
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
            <Contents
              label="내용"
              value={contents}
              onChange={(e) => {
                console.log("내용추가");
                setContents(e.target.value);}}
              placeholder="내용을 입력하세요"
            />
          </Container>
          
        </Test>
        {/* {() => setMeetTime(finalMeetTime)} */}
        {_post ? (
          <EditButton
            onClick={() => {
              // setMeetTime(finalMeetTime)
              console.log(meetTime)
              dispatch(postActions.editPostDB(post_id, title, contents, boardImg, location, meetTime, people_max));
            }}
          >
            수정하기
          </EditButton>
        ) : (
          <PostButton
            onClick={() => {
              // setMeetTime(finalMeetTime)
              console.log(meetTime)
              dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime, people_max))
            }}
          >
            작성하기
          </PostButton>
         )}
      </React.Fragment>
      
    );
}


const Test = styled.div`
  display: flex;
`;

const Line = styled.div`
  position: absolute;
  width: 1920px;
  height: 0px;
  left: 0px;
  top: 942px;

  border: 1px solid #000000;
  box-sizing: border-box;
`;

const TextBox1 = styled.div`
  position: absolute;
  width: 464px;
  height: 42px;
  left: 240px;
  top: 992px;

  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  line-height: 150%;
  color: #000000;
`;

const TextBox2 = styled.div`
  position: absolute;
  width: 952px;
  height: 42px;
  left: 728px;
  top: 992px;

  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  line-height: 150%;
  color: #000000;
`;
const Icon1 = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 240px;
  top: 1127px;
`;

const Icon2 = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  left: 240px;
  top: 1186px;
`;
const Container = styled.div`
  margin: 300px 0px;
`;
const Place = styled.div`
  display: flex;
`;
const InputBox = styled.input`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 20px;

position: absolute;
width: 1220px;
height: 39px;
left: 240px;
top: 862px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
`;
const Location = styled.input`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 20px;

position: absolute;
width: 298px;
height: 39px;
left: 308px;
top: 1132px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
    
`;
const MaxPeople = styled.select`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 10px 20px 0 20px;

position: absolute;
width: 298px;
height: 39px;
left: 308px;
top: 1191px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
outline : none;
`;

const Contents = styled.input`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 11px 20px;
    
    position: absolute;
    width: 952px;
    height: 319px;
    left: 728px;
    top: 1067px;
    
    background: #FFFFFF;
    border: 1px solid #B9B9B9;
    box-sizing: border-box;
    border-radius: 20px;
`;

const Image = styled.input`
position: absolute;
width: 1920px;
height: 720px;
left: 0px;
top: 100px;

background: #D9D9D9;
border-radius: 0px;
    background-image: url(${(props) => props.src});
    // background-image: url(${(props) => props._post? props.post_img : props.src});
    background-size: cover;
    background-repeat: no-repeat;
`;

const PostButton = styled.button`
  background: #F1B100;
  border-radius: 20px;
  position: absolute;
  width: 167px;
  height: 40px;
  left: 1513px;
  top: 861px;
  cursor: pointer;

  // & text {
  //   position: absolute;
  //   width: 67px;
  //   height: 27px;
  //   left: 1563px;
  //   top: 867px;

  //   font-family: Noto Sans KR;
  //   font-style: normal;
  //   font-weight: normal;
  //   font-size: 18px;
  //   line-height: 150%;
  //   text-align: center;

  //   color: #000000;
  // }
`;

const EditButton = styled.button`
  background: #F1B100;
  border-radius: 20px;
  position: absolute;
  width: 167px;
  height: 40px;
  left: 1513px;
  top: 861px;
  cursor: pointer;
`;


export default MatingBoardWrite;

// 작성게시판
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {actionsCreators as imgActions} from "../redux/modules/image"
import {actionsCreators as postActions} from "../redux/modules/post"
import Header from '../components/Header'

// DatePicker
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "../datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)


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
    const [boardImg, setImage] = useState(_post? post_img : null);
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
    const deadline_status = "false";
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
            console.log(boardImg);
            console.log(reader.result);
            dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
        };
    };
    const selectHandler=()=>{
      const countperonSelect = document.getElementById("countPeople");
      const getCount = countperonSelect.options[countperonSelect.selectedIndex].value;

      setPeople_max(getCount)
      console.log(people_max)
    }

    return (
      <Container>
          <Test>
            <TitleBox>
              <InputGrid>
                <InputBox
                  label="제목"
                  value={title}
                  onChange={(e) => {
                    console.log("제목추가");
                    console.log(title);
                    setTitle(e.target.value);}}
                  placeholder="제목을 입력하세요"
                />
                {_post ? (
                  <EditButton
                    onClick={() => {
                      dispatch(postActions.editPostDB(post_id, title, contents, boardImg, location, meetTime, people_max));
                    }}
                  >
                    수정하기
                  </EditButton>
                ) : (
                  <PostButton
                    onClick={() => {
                      dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime, people_max));
                    }}
                  >
                    작성하기
                  </PostButton>
                )}
              </InputGrid>
              <DetailGrid>
                  <Icon src={require("../shared/image/date.png").default}/>
                  <Cal
                    label="날짜시간"
                    value={date}
                    selected={date}
                    onChange={(date) => {setDate(date); console.log(date); }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy/MM/dd h:mm aa"
                    placeholderText="모임 날짜/시간"
                  />
                <Place>
                  <Icon src={require("../shared/image/place.png").default}/>
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
                <Icon src={require("../shared/image/person.png").default}/>
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
              </DetailGrid>
            </TitleBox>                
              
            <ContentsBox>
              <ImageBox>
                <Image
              onChange={selectFile}
              placeholder="사진을 추가해주세요"
              name='image' 
              ref={fileInput}
              type='file'
              src={_post? post_img : preview}
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
                  console.log("내용추가");
                  setContents(e.target.value);}}
                placeholder="내용을 입력하세요"
              />
              </TextBox>
            </ContentsBox>
          
        </Test>
      </Container>       
    );
}

const Container = styled.div`
  display: block;
  width: 100%;
`;

const Test = styled.div`
  width : 100%;
`;
const TitleBox = styled.div`
  width: 100%;
  height : 320px;
  margin: auto;
  background-color : #F8F8F8;
  display : flex;
  flex-direction: column;

`;
const InputGrid = styled.div`
  width : 1200px;
  margin : auto;
  display: flex;
  flex-direction: row;
  margin-top: 95px;
`
const InputBox = styled.input`
  display: flex;
  padding: 6px 20px;
  width: 995px;
  height: 39px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
`;
const DetailGrid = styled.div`
  width : 1200px;
  margin : auto;
  margin-top: 43px;
  margin-bottom: 94px;
  display : flex;
`;

const Cal = styled(DatePicker)`
  padding: 6px 20px;
  width: 322px;
  height: 39px;
  background: #FFFFFF;
  border: 1px solid #B9B9B9;
  box-sizing: border-box;
  border-radius: 20px;
  // color: #B9B9B9;
`;

const Place = styled.div`
  display: flex;
  margin-left: 240px;
`;

const Location = styled.input`
padding: 6px 20px;

width: 322px;
height: 39px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
margin-right: 30px;
`;
const MaxPeople = styled.select`
padding: 10px 20px 0 20px;

width: 322px;
height: 39px;

background: #FFFFFF;
border: 1px solid #B9B9B9;
box-sizing: border-box;
border-radius: 20px;
outline : none;
`;

const TextBox1 = styled.div`
  width: 464px;
  height: 42px;

  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  line-height: 150%;
  color: #000000;
`;

const ImageBox = styled.div`
  width: 718px;
  margin : auto 61px 170px auto;
`;

const Image = styled.input`
  display: block;
  width: 513px;
  height: 513px;
  background: #d9d9d9;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextBox = styled.div`
  width : 718px;
  height : 421px;
  float : right;
`
const ContentsBox = styled.div`
  display: flex;
  width: 1200px;
  margin : 60px auto auto auto;
`;

const TextBox2 = styled.div`
  width: 100%;
  color: #000000;
  margin: auto;
`;



const ContentsH = styled.h2`
  font-family: Seravek;
  font-style: italic;
  font-weight: bold;
  font-size: 28px;
  margin: auto;
`;

const Contents = styled.textarea`
  display: block;
  padding: 11px 20px;

  width: 615px;
  height: 437px;
  margin: 33px 0 33px 0;

  background: #ffffff;
  border: 1px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 20px;
  resize : none;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

const PostButton = styled.button`
  background: #f1b100;
  border-radius: 20px;
  margin-left : 38px;

  width: 167px;
  height: 40px;

  cursor: pointer;
  border: 0;
`;
const EditButton = styled.button`
  background: #F1B100;
  border-radius: 20px;
  width: 167px;
  height: 40px;
  cursor: pointer;
`;


export default MatingBoardWrite;


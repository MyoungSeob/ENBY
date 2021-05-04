// 작성게시판
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {actionsCreators as imgActions} from "../redux/modules/image"
import {actionsCreators as postActions} from "../redux/modules/post"

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
    const [meetTime, setMeetTime] = useState(_post? _post.meetTime : null);

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
    const finalMeetTime = finalDate.split(".")[0];
    console.log(finalMeetTime);
    console.log('그냥 ISOString = '+new Date().toISOString());
    console.log('timezone 반영 ISOString = '+timezoneDate.toISOString());


    useEffect(() => {
        // setImage(preview);
        }, [preview]);
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
    return (
      <React.Fragment>
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
              <DatePicker
                label="날짜시간"
                value={meetTime}
                selected={date}
                onChange={date => setDate(date)} // 수정버전일때와 다르게 해줘야하는지?
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy/MM/dd h:mm aa"
              />
            <Location
              label="장소"
              value={location}
              onChange={(e) => {
                console.log("장소추가");
                console.log(location);
                setLocation(e.target.value);}}
              placeholder="장소를 입력하세요"
            />
            <Contents
              label="내용"
              value={contents}
              onChange={(e) => {
                console.log("내용추가");
                setContents(e.target.value);}}
              placeholder="내용을 입력하세요"
            />
          </Container>
          <Image
            onChange={selectFile}
            placeholder="사진을 추가해주세요"
            name='image' 
            ref={fileInput}
            type='file'
            src={preview}
            />
        </Test>
        {_post ? (
          <button
            onClick={() => {
              setMeetTime(finalMeetTime)
              console.log(meetTime)
              dispatch(postActions.editPostDB(post_id, title, contents, boardImg, location, meetTime));
            }}
          >
            수정하기
          </button>
        ) : (
          <button
            onClick={() => {
              setMeetTime(finalMeetTime)
              console.log(meetTime)
              dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime))
            }}
          >
            글쓰기
          </button>
         )}
      </React.Fragment>
      
    );
}
const Test = styled.div`
  display: flex;
`;
const Container = styled.div`
  margin-left: 500px;
`;
const InputBox = styled.input`
    display: block;
    margin: 20px auto;
    width: 500px;
    max-width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
`;
const Location = styled.input`
    display: block;
    margin: 20px auto;
    width: 500px;
    max-width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
`;
const Contents = styled.input`
    display: block;
    margin: 20px auto;
    width: 500px;
    max-width: 100%;
    height: 150px;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
`;

const Image = styled.input`
    display: block;
    margin: 20px 50px;
    overflow: hidden;
    width: 400px;
    max-width: 100%;
    height: 300px;
    position: absolute;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    background-image: url(${(props) => props.src});
    // background-image: url(${(props) => props._post? props.post_img : props.src});
    background-size: contain;
    background-repeat: no-repeat;
`;


export default MatingBoardWrite;
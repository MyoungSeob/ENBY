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
    // const post_list = useSelector(state => state.post.list);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [boardImg, setImage] = useState();
    const [location, setLocation] = useState('');
    const [meetTime, setMeetTime] = useState();
    // 이미지 추가 미리보기
    const preview = useSelector((state) => state.image.preview);
    const fileInput = useRef();
    const dispatch = useDispatch();
    // 날짜, 시간 가져오기(datepicker) => input받은 날짜,시간 형식 변경
    const [date, setDate] = useState(new Date());
    console.log(date);
    var sysdate = new Date(date);
    function date_to_str(format){
        var year = format.getFullYear();
        var month = format.getMonth() + 1;
        if(month<10) month = '0' + month;
        var date = format.getDate();
        if(date<10) date = '0' + date;
        var hour = format.getHours();
        if(hour<10) hour = '0' + hour;
        var min = format.getMinutes();
        if(min<10) min = '0' + min;
        var sec = format.getSeconds();
        if(sec<10) sec = '0' + sec;
        return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    }

    sysdate = date_to_str(sysdate);
    console.log(sysdate); 
    // setMeetTime{() => (sysdate);
    console.log(meetTime); // 글쓰기 눌리면 들어감

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

    // 인풋에 적히는 내용 캐치 -> 이벤트가 발생하면 이벤트의 name과 value를 가지고 옴
    // const getValue = e => {
    //     const { name, value } = e.target;
    //     setTitle(e.target.value);
    //     setContents(e.target.value);
    //     console.log(name,value);
    //     console.log(title);
    // }
    // 이미지 추가 미리보기
    const selectFile = (e) => {
        const reader = new FileReader();
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
            dispatch(imgActions.setPreview(reader.result)); // result: 파일의 내용물
        };
    };
    return (
      <React.Fragment>
        <Test>
          <Container>
            <InputBox
              // onChange={getValue}
              // name='title'
              label="제목"
              value={title}
              onChange={(e) => {
                console.log("제목추가");
                setTitle(e.target.value);}}
              placeholder="제목을 입력하세요"
              // name='title'
            />
            {/* <DateTime
              label="날짜시간"
              value={meetTime}
              onChange={(e) => {
                setMeetTime(e.target.value);}}
              /> */}
              <DatePicker
                label="날짜시간"
                value={meetTime}
                selected={date}
                onChange={date => setDate(date)}
                // onChange={meetTime => setMeetTime(date)}
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
        
        

            {/* <ImgPreview src={imgSrc}/> */}
            {/* <ImgInput name="image" type='file' onChange={onChangeHandle} /> */}
          {/* onChange={onChangeHandle}
          placeholder="사진을 추가해주세요"
          name='image'
          type="file" */}
        {/* {_post ? (
          <button
            onClick={() => {
              dispatch(postActions.editPostDB(title, post_id, content));
            }}
          >
            수정하기
          </button>
        ) : ( */}
          <button
            onClick={() => {
              dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime))
              setMeetTime(sysdate)
              console.log(date);
            //   dispatch(imgActions.setPreview(image));
            }}
          >
            글쓰기
          </button>
        {/* )} */}
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
    background-size: contain;
    background-repeat: no-repeat;
`;


export default MatingBoardWrite;
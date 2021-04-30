// 작성게시판
import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {actionsCreators as imgActions} from "../redux/modules/image"
import {actionsCreators as postActions} from "../redux/modules/post"


const MatingBoardWrite = (props) => {
    // const post_list = useSelector(state => state.post.list);
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();
    const [boardImg, setImage] = useState();
    const [location, setLocation] = useState();
    const [meetTime, setMeetTime] = useState();
    // 이미지 추가 미리보기
    const preview = useSelector((state) => state.image.preview);
    const fileInput = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        // setImage(preview);
        // console.log(preview);
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
    const getValue = e => {
        const { name, value } = e.target;
    }
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
        <InputBox
          onChange={getValue}
          placeholder="제목을 입력하세요"
          name='title'
        />
        <Contents
          onChange={getValue}
          placeholder="내용을 입력하세요"
          name='contents'
        />
        
        <Image
          onChange={selectFile}
          placeholder="사진을 추가해주세요"
          name='image' 
          ref={fileInput}
          type='file'
          />
        <Preview
          src={preview}
        />

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
              dispatch(postActions.addPostDB(title, contents, boardImg, location, meetTime));
            //   dispatch(imgActions.setPreview(image));
            }}
          >
            글쓰기
          </button>
        {/* )} */}
      </React.Fragment>
      
    );
}
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
    margin: 20px auto;
    width: 500px;
    max-width: 100%;
    height: 30px;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
`;

const Preview = styled.div`
    background-image: url(${(props) => props.src});
    display: block;
    margin: 20px auto;
    width: 500px;
    max-width: 100%;
    height: 150px;
    // border: 1px solid #ced4da;
    // border-radius: .25rem;
`;


export default MatingBoardWrite;
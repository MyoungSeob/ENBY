import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const GET_POST_MAIN = "GET_POST_MAIN"
const GET_POST_DETAIL = "GET_POST_DETAIL"
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";// 수정


const getPostMain = createAction(GET_POST_MAIN, (post_list) => post_list);
const getPostDetail = createAction(GET_POST_DETAIL, (post_list) => post_list);
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id}))

const initialState = {
    list : [],
    detail_list : [],
};

const getPostMainDB =()=>{
    return function (dispatch, getState, {history}) {
        const token = localStorage.getItem("token")
        axios
        .get(`http://3.36.67.251:8080/main/board`, {
            headers :{
                authorization : `Bearer ${token}`
            }
        })
        .then((response) => {
            const post_list = [...response.data]
            dispatch(getPostMain(post_list))
        }
        )
        .catch((err) => console.log(err))
    }
}

const getPostDetailDB = (id) =>{
    return function (dispatch, getState, {history}){
        const token = localStorage.getItem("token")
        axios
        .get(`http://3.36.67.251:8080/board/mating/` + `${id}`, {
            headers :{
                authorization : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res)
            const post_list = [...res.data.boards]
            dispatch(getPostDetail(post_list[0]))
            console.log(post_list)
        })
        .catch((err) => console.log(err))
    }
}

// 모임게시글 추가하기
const addPostDB = (title, contents, boardImg, location, meetTime) => {
    return function (dispatch, getState, {history}) {
        const token = localStorage.getItem("token")
        let formData = new FormData();

        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("boardImg", boardImg);
        formData.append("location", location);
        formData.append("meetTime", meetTime);
        

        const DB = {
            method: "post",
            url: `http://3.36.67.251:8080/board/mating?`,
            data: formData,
            headers : {
                authorization : `Bearer ${token}`
            }
        };

        axios(DB)
            .then(() => {
                window.alert("등록완료 되었습니다 :)");
                history.push("/");
            })
            .catch((err) => {
                window.alert("에러가 발생했습니다. 다시 시도해주세요!");
                console.log(err);
            });
    };
};
// 게시글 삭제하기
const deletePostDB = (id) => {
    return function(dispatch, getState, {history}){
        const token = localStorage.getItem("token")
        axios
        .delete(`http://3.36.67.251:8080/board/mating/` +`${id}`, {
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(()=>{
            window.alert('게시글이 삭제되었습니다.')
            history.push('/')
        })
        .catch(err => console.log(err))
    }
}

// 모임게시글 수정하기
const editPostDB = (post_id, title, contents, boardImg, location, meetTime) => {
    console.log('수정')
    return function (dispatch, getState, {history}) {
      const token = localStorage.getItem("token")

      let formData = new FormData();
      formData.append("title", title);
      formData.append("contents", contents);
      formData.append("boardImg", boardImg);
      formData.append("location", location);
      formData.append("meetTime", meetTime);
      axios({
        method: "put",
        url: `http://3.36.67.251:8080/board/mating/${post_id}`,
        data: formData,
        // {
        //     title:title,
        //     contents:contents,
        //     boardImg:boardImg,
        //     location:location,
        //     meetTime:meetTime

        // },
        headers : {
            authorization : `Bearer ${token}`
        }
      })
        .then((res) => {
            window.alert('게시글이 수정되었습니다.')
            history.push('/')
          // let post_id = [...res.data];
          // dispatch(editPost(post_id));
        })
        .catch((e) => console.log(e));
    };
  };

export default handleActions(
    {
    [GET_POST_MAIN] : (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),
    [GET_POST_DETAIL] : (state, action) => 
        produce(state, (draft) => {
            draft.detail_list = action.payload
        }),
}, initialState
)

const actionsCreators = {
    addPost,
    editPost,
    getPostMainDB,
    getPostDetailDB,
    addPostDB,
    deletePostDB,
    editPostDB
};

export {actionsCreators};
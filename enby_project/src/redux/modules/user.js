import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const {Kakao} = window;

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_MY_ATTEND = "GET_MY_ATTEND";
const GET_MY_APPLY = "GET_MY_APPLY";
const GET_MY_WRITE = "GET_MY_WRITE"
const LOADING = "LOADING";
const GET_OTHER_PAGE = "GET_OTHER_PAGE";
const GET_OTHER_WRITE = "GET_OTHER_WRITE";
const GET_OTHER_ATTEND = "GET_OTHER_ATTEND";

const login = createAction(LOG_IN, (user) => ({ user }));
const logout = createAction(LOG_OUT, (user) => ({ user }));
const loading = createAction(LOADING, (loading) => (loading));
const getMyAttend = createAction(GET_MY_ATTEND, (attend_list) => (attend_list));
const getMyApply = createAction(GET_MY_APPLY, (apply_list) => apply_list);
const getMyWrite = createAction(GET_MY_WRITE, (write_list) => write_list);
const getOtherPage = createAction(GET_OTHER_PAGE, (other_page) => other_page);
const getOtherWrite = createAction(GET_OTHER_WRITE, (other_write) => other_write);
const getOtherAttend = createAction(GET_OTHER_ATTEND, (other_attend) => other_attend);

const initialState = {
    user : null,
    is_login : false,
    attend_list : [],
    apply_list : [],
    write_list : [],
    other_page : [],
    other_write : [],
    other_attend : [],
    loading : false,
}

const KakaoLogin = (KakaoCode) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "get",
      url: "http://3.36.67.251:8080/callback/kakao?code=" + `${KakaoCode}`,
    })
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data)
        dispatch(login())
        history.push('/')
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };
};

const LogoutDB =()=>{
  return function (dispatch, getState, {history}) {
    dispatch(logout());
    localStorage.removeItem("token");
    window.alert("로그아웃 되었습니다.")
    history.push('/')
    window.location.reload()
  };
};

const getMyProfileDB =(name)=>{
  return function (dispatch, getState, {history}) {
    dispatch(loading(true));
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token)
    const nickname = decode.nickname;
    axios({
      method: "get",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url : `http://3.36.67.251:8080/mypage/${name}`
    })
    .then(res => {
      const mypage_list = [...res.data];
      const apply_list = [];
      const attend_list = [];
      const write_list = [];
      for (let i = 0; i < mypage_list.length; i++) {
        if (
          mypage_list[i].board_name === "신청한 모임" &&
          mypage_list[i].nickname !== nickname
        ) {
          apply_list.push(mypage_list[i]);
        }
        if (mypage_list[i].board_name === "참석한 모임") {
          attend_list.push(mypage_list[i]);
        }
        if (mypage_list[i].board_name === "작성한 글") {
          write_list.push(mypage_list[i]);
        }
      }
      for (let i = 0; i < write_list.length; i++) {
        write_list[i].list_id = i + 1;
      }
      // for(let i = 0; i < mypage_list.length ; i ++){
      //   if(mypage_list[i].board_name === "참석한 모임"){
      //     attend_list.push(mypage_list[i])
      //   }
      //   if(mypage_list[i].board_name === "작성한 글"){
      //     write_list.push(mypage_list[i])
      //   }
      // }
      
      // for(let i = 0; i < mypage_list.length ; i ++){
      //   if(mypage_list[i].board_name === "작성한 글"){
      //     write_list.push(mypage_list[i])
      //   }
      // }
      
      dispatch(getMyApply(apply_list))
      dispatch(getMyAttend(attend_list))
      dispatch(getMyWrite(write_list))
      dispatch(loading(false))
    })
    .catch(err => console.log(err))
  }
}

const getOtherPageDB =(otherName)=>{
  return function (dispatch, getState, {history}) {
    dispatch(loading(true))
    const token = localStorage.getItem('token')
    axios({
      method : 'get',
      url : `http://3.36.67.251:8080/mypage/${otherName}`,
      headers : {
        authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log(res)
      const other_list = [...res.data];
      const other_write = [];
      const other_page = [];
      const other_attend = [];
      for(let i = 0; i < other_list.length ; i ++){
        if(other_list[i].board_name === "작성한 글"){
          other_write.push(other_list[i])
        }
        if(other_list[i].board_name === "신청한 모임"){
          other_page.push(other_list[i])
        }
        if(other_list[i].board_name === "참석한 모임"){
          other_attend.push(other_list[i])
        }
      };
      // for(let i = 0; i < other_list.length ; i ++){
      //   if(other_list[i].board_name === "신청한 모임"){
      //     other_page.push(other_list[i])
      //   }
      // };
      // for(let i = 0; i < other_list.length ; i ++){
      //   if(other_list[i].board_name === "참석한 모임"){
      //     other_attend.push(other_list[i])
      //   }
      // };
      for(let i = 0; i < other_write.length; i ++){
        other_write[i].list_id = i+1
      }
      dispatch(getOtherWrite(other_write));
      dispatch(getOtherPage(other_page));
      dispatch(getOtherAttend(other_attend))
      dispatch(loading(false));
    })
    .catch(err => console.log(err))
  }
}

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = false;
      }),
    [GET_MY_ATTEND]: (state, action) =>
      produce(state, (draft) => {
        draft.attend_list = action.payload;
      }),
    [GET_MY_APPLY]: (state, action) =>
      produce(state, (draft) => {
        draft.apply_list = action.payload;
      }),
    [GET_MY_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.write_list = action.payload;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
    [GET_OTHER_PAGE] : (state, action) =>
      produce(state, (draft) => {
        draft.other_page = action.payload
      }),
    [GET_OTHER_WRITE] : (state, action) =>
      produce(state, (draft) => {
        draft.other_write = action.payload
      }),
    [GET_OTHER_ATTEND] : (state, action) =>
      produce(state, (draft) => {
        draft.other_attend = action.payload
      })
  },
  initialState
);

const actionsCreators = {
    KakaoLogin,
    LogoutDB,
    getMyProfileDB,
    getOtherPageDB
}

export {actionsCreators};
import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';


const {Kakao} = window;

const LOG_IN = "LOG_IN"
const LOG_OUT = "LOG_OUT"

const login = createAction(LOG_IN, (user) => ({ user }));
const logout = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
    user : null,
    is_login : false,
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
  }
}

export default handleActions(
    {
        [LOG_IN] : (state, action) => 
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
        [LOG_OUT] : (state, action) =>
            produce(state, (draft) => {
              draft.user = action.payload.user;
              draft.is_login = false;
            })
    }, initialState
);

const actionsCreators = {
    KakaoLogin,
    LogoutDB
}

export {actionsCreators};
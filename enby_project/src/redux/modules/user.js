import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';


const {Kakao} = window;

const LOG_IN = "LOG_IN"

const login = createAction(LOG_IN, (user) => ({ user }));

const initialState = {
    user : null,
    is_login : false,
}

const KakaoLogin = (KakaoCode)=> {
    return function (dispatch, getState, {history}){
        axios('http://3.36.67.251:8080/callback/kakao/' + `${KakaoCode}`, {
            method : 'POST',
        })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("login_token", res.data)
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export default handleActions(
    {
        [LOG_IN] : (state, action) => 
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
    }, initialState
);

const actionsCreators = {
    KakaoLogin,
}

export {actionsCreators};
import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const ATTEND_APPLY = "ATTEND_APPLY"
const CHECK_ATTEND = "CHECK_ATTEND"

const attendApply = createAction(ATTEND_APPLY, (apply_list) => ( apply_list ))
const checkAttend = createAction(CHECK_ATTEND, (check_list) => (check_list))

const initialState = {
    list : [],
}
// 참가신청하기
const attendApplyDB =(id, registContents)=>{
    return function(dispatch, getState, {history}) {
        const token = localStorage.getItem("token")
        axios({
          method: "post",
          url: `http://3.36.67.251:8080/board/mating/${id}/register`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
              board_id : id,
              contents : registContents,
              accepted : false,
          },
        })
          .then((res) => {
            console.log(res)
            localStorage.setItem("regist", res.data.split(':')[1])
            window.alert("신청이 완료되었습니다.")
            window.location.reload()
          })
          .catch((error) => console.log(error));
    }
}

const cancelApply = (id)=>{
    return function (dispatch, getState, {history}){
        const token = localStorage.getItem("token")
        const regist = localStorage.getItem("regist")
        axios({
            method : 'delete',
            headers : {
                authorization: `Bearer ${token}`,
            },
            url : `http://3.36.67.251:8080/board/mating/${id}/register/${regist}`,
        })
        .then(res => {
            console.log(res)
            localStorage.removeItem("regist")
            window.alert("신청이 취소됐습니다.")
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
}
const checkAttendDB =(id)=>{
    return function(dispatch, getState, {history}){
        axios({
            method : 'get',
            url : `https://c0caaa87-9c65-464e-b493-a8e2130f8280.mock.pstmn.io/board/mating/` + `${id}`
        })
        .then(res => console.log(res))
    }
}

export default handleActions (
    {
        [ATTEND_APPLY] : (state, action) => 
            produce(state, (draft) => {
                draft.list = action.payload
            }),
    }, initialState
);

const actionsCreators = {
    attendApplyDB,
    cancelApply
}

export {actionsCreators};
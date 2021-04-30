import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const GET_POST_MAIN = "GET_POST_MAIN"
const GET_POST_DETAIL = "GET_POST_DETAIL"

const getPostMain = createAction(GET_POST_MAIN, (post_list) => post_list);
const getPostDetail = createAction(GET_POST_DETAIL, (post_list) => post_list);


const initialState = {
    list : [],
    detail_list : [],
};

const getPostMainDB =()=>{
    return function (dispatch, getState, {history}) {
        axios
        .get(`http://3.36.67.251:8080/main/board`)
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
        axios
        .get(`http://3.36.67.251:8080/board/mating/` + `${id}`)
        .then((res) => {
            console.log(res)
            const post_list = [...res.data.boards]
            dispatch(getPostDetail(post_list[0]))
            console.log(post_list)
        })
        .catch((err) => console.log(err))
    }
}



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
    getPostMainDB,
    getPostDetailDB
};

export {actionsCreators};
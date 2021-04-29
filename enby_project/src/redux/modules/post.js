import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const GET_POST_MAIN = "GET_POST_MAIN"

const getPostMain = createAction(GET_POST_MAIN, (post_list) => post_list);

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

const initialState = {
    list : [],
};

export default handleActions(
    {
    [GET_POST_MAIN] : (state, action) =>
        produce(state, (draft) => {
            draft.list = action.payload
        }),
}, initialState
)

const actionsCreators = {
    getPostMainDB,
};

export {actionsCreators};
import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';

const ATTEND_APPLY = "ATTEND_APPLY"

const attendApply = createAction(ATTEND_APPLY, (apply_list) => ( apply_list ))

const attendApplyDB =(id, registContents)=>{
    return function(dispatch, getState, {history}) {
        const token = localStorage.getItem("token")
        let formData = new FormData();

        formData.append('board_id', id);
        formData.append('user_id', "이명섭");
        formData.append('comment', registContents);
        formData.append('accepted', false);
        console.log(formData)

        axios({
          method: "post",
          url: `http://3.36.67.251:8080/board/mating/` + `${id}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: formData,
        })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
    }
}

const initialState = {
    list : [],
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
    attendApplyDB
}

export {actionsCreators};
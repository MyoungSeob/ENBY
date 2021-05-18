import {createAction, handleActions} from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";

const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

const initialState = {
    preview: null
}

// reducer
export default handleActions({
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
        // draft의 preview는 액션에서 넘어온 preview
    })
}, initialState);

const actionsCreators = {
    setPreview
}

export { actionsCreators };
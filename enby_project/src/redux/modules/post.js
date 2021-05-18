import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';
import { applyMiddleware } from 'redux';
import ReviewBoardWrite from '../../pages/ReviewBoardWrite';


const GET_POST_MAIN = "GET_POST_MAIN";
const GET_POST_DETAIL = "GET_POST_DETAIL";
const GET_APPLY_LIST = "GET_APPLY_LIST";
const GET_CREATED_AT = "GET_CREATED_AT";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";// 수정
const GET_MEET_TIME = "GET_MEET_TIME";
const GET_POST_REVIEW = "GET_POST_REVIEW"; // 리뷰 불러오기
const GET_REVIEW_DETAIL = "GET_REVIEW_DETAIL";
const ADD_REVIEW = "ADD_REVIEW"; // 리뷰 추가
const EDIT_REVIEW = "EDIT_REVIEW"; // 리뷰 수정
const LOADING = "LOADING";
const GET_REVIEW_CARD = "GET_REVIEW_CARD";
const GET_NEED_WRITE_REVIEW = "GET_NEED_WRITE_REIVEW";

const loading = createAction(LOADING, (loading) => (loading));
const getPostMain = createAction(GET_POST_MAIN, (post_list) => post_list);
const getPostDetail = createAction(GET_POST_DETAIL, (post_list) => post_list);
const getMeetTime = createAction(GET_MEET_TIME, (post_list) => post_list)
const getApplyList = createAction(GET_APPLY_LIST, (apply_list) => apply_list);
const getCreatedAt = createAction(GET_CREATED_AT, post_list => post_list)
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id}))
const getPostReview = createAction(GET_POST_REVIEW, (review_list) => review_list); // 리뷰리스트
const getReviewDetail = createAction(GET_REVIEW_DETAIL, (review_detail) => review_detail)
const addReview = createAction(ADD_REVIEW, (review_list) => ({review_list}));
const editReview = createAction(EDIT_REVIEW, (review_id) => review_id);
const getReviewCard = createAction(GET_REVIEW_CARD, (review_card) => review_card)
const getNeedWriteRiview = createAction(GET_NEED_WRITE_REVIEW, (needWrite_list) => needWrite_list)


const initialState = {
    list : [],
    detail_list : [],
    apply_list : [],
    time : [],
    review_list : [], // 리뷰리스트
    review_detail : [],
    created_At :[],
    loading : false,
    review_card : [],
    needWrite_list : [],
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
        dispatch(loading(true))
        axios
        .get(`http://3.36.67.251:8080/board/mating/` + `${id}`)
        .then((res) => {
            const post_list = [...res.data.boards]
            const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

            const today = new Date(post_list[0].meetTime.split("T")[0]).getDay();
            const todayLabel = week[today];
            const createDay = new Date(post_list[0].createdAt.split("T")[0]).getDay();
            const createDayLabel = week[createDay];
            const time =
              post_list[0].meetTime.split("T")[0].split("-")[0] +
              "년 " +
              parseInt(post_list[0].meetTime.split("T")[0].split("-")[1]) +
              "월 " +
              parseInt(post_list[0].meetTime.split("T")[0].split("-")[2]) +
              "일 " + todayLabel +" " +
              post_list[0].meetTime.split("T")[1].split(":")[0] +
              ":" +
              post_list[0].meetTime.split("T")[1].split(":")[1];

            const createdTime =
              post_list[0].createdAt.split("T")[0].split("-")[0] +
              "년 " +
              parseInt(post_list[0].createdAt.split("T")[0].split("-")[1]) +
              "월 " +
              parseInt(post_list[0].createdAt.split("T")[0].split("-")[2]) +
              "일 " + createDayLabel;
 
            dispatch(getPostDetail(post_list[0]))
            dispatch(getMeetTime(time))
            dispatch(getApplyList(post_list[0].registrations))
            dispatch(getCreatedAt(createdTime))
            dispatch(getReviewCard(post_list[0].reviews))
            dispatch(loading(false))
        })
        .catch((err) => console.log(err))
    }
}

// 모임게시글 추가하기
const addPostDB = (title, contents, boardImg, location, meetTime, people_max, deadline_status) => {
    return function (dispatch, getState, {history}) {
        const token = localStorage.getItem("token")
        let formData = new FormData();
        if(boardImg == null) {
            formData.append("title", title);
            formData.append("contents", contents);
            formData.append("location", location);
            formData.append("meetTime", meetTime);
            formData.append("people_max", people_max);
        }else{
            formData.append("title", title);
            formData.append("contents", contents);
            formData.append("boardImg", boardImg);
            formData.append("location", location);
            formData.append("meetTime", meetTime);
            formData.append("people_max", people_max);
        }
        
        // formData.append("deadline_status", false);
        

        const DB = {
            method: "post",
            url: `http://3.36.67.251:8080/board/mating`,
            data: formData,
            headers : {
                authorization : `Bearer ${token}`
            }
        };

        axios(DB)
            .then(() => {
                window.alert("등록완료 되었습니다 :)");
                history.push("/board/mating");
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
const editPostDB = (post_id, title, contents, boardImg, location, meetTime, people_max) => {

    return function (dispatch, getState, {history}) {
      const token = localStorage.getItem("token")
      let formData = new FormData();
      if (boardImg === null) {
        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("location", location);
        formData.append("meetTime", meetTime);
        formData.append("people_max", people_max);

      } else {
        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("boardImg", boardImg);
        formData.append("location", location);
        formData.append("meetTime", meetTime);
        formData.append("people_max", people_max);
      }
      

      axios({
        method: "put",
        url: `http://3.36.67.251:8080/board/mating/${post_id}`,
        data: formData,
        headers : {
            authorization : `Bearer ${token}`
        }
      })
        .then((res) => {
            console.log(res)
            window.alert('게시글이 수정되었습니다.')
            history.push('/')
        })
        .catch((e) => console.log(e));
    };
  };

  // 리뷰게시글 불러오기
  const getPostReviewDB = () => {
      return function (dispatch, getState, {history}) {
          const token = localStorage.getItem("token")
          axios
          .get(`http://3.36.67.251:8080/board/mating/review?page=1&size=10`)
          .then((response) => {
              const review_list = [...response.data.content]
              dispatch(getPostReview(review_list))
            //   console.log(review_list);
          })
          .catch((err) => console.log(err))
      }
  }

  // 리뷰 디테일 불러오기
  const getReviewDetailDB = (review_id) => {
    return function (dispatch, getState, {history}){
        dispatch(loading(true))
        const token = localStorage.getItem("token")
        axios
        .get(`http://3.36.67.251:8080/board/mating/review/` + `${review_id}`)
        .then((res) => {
            
            const review_detail = [...res.data]

            const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

            const createDay = new Date(review_detail[0].createdAt.split("T")[0]).getDay();
            const createDayLabel = week[createDay];

            const createdTime =
            review_detail[0].createdAt.split("T")[0].split("-")[0] +
              "년 " +
              parseInt(review_detail[0].createdAt.split("T")[0].split("-")[1]) +
              "월 " +
              parseInt(review_detail[0].createdAt.split("T")[0].split("-")[2]) +
              "일 " + createDayLabel;
            dispatch(getCreatedAt(createdTime))
            dispatch(getReviewDetail(review_detail[0]))
            dispatch(loading(false))
        })
        .catch((err) => console.log(err))
    }
  }

  // 리뷰게시글 등록하기
  const addReviewDB = (board_id, title, contents, reviewImg) => {
      return function (dispatch, getState, {history}) {
          const token = localStorage.getItem("token")
          let formData = new FormData();

          formData.append("title", title);
          formData.append("contents", contents);
          formData.append("reviewImg", reviewImg);

      const DB = {
          method: "post",
          url: `http://3.36.67.251:8080/board/mating/${board_id}/review`,
          data: formData,
          headers: {
              authorization: `Bearer ${token}`
          }
      };
      axios(DB)
        .then(() => {
            window.alert("등록 완료 되었습니다😍");
            history.push("/board/review");
        })
        .catch((err) => {
            console.log(err);
            window.alert("에러가 발생하였습니다. 다시 시도해주세요😭");
        });
  };
};

const editReviewDB =(review_id, board_id, title, contents, reviewImg)=>{
    return function (dispatch, getState, {history}){
        const token = localStorage.getItem("token")
       
        let formData = new FormData();
        if(reviewImg === null){
            formData.append("title", title);
            formData.append("contents", contents);
        }else{
            formData.append("title", title);
            formData.append("contents", contents);
            formData.append("reviewImg", reviewImg);
        }
          
          
        axios({
            method : 'put',
            headers : {
                    authorization: `Bearer ${token}`
                },
            url : `http://3.36.67.251:8080/board/mating/${board_id}/review/${review_id}`,
            data : formData,            
        })
        .then(res => {
            window.alert(res.data)
            history.replace('/board/review')
        })
        .catch(err => console.log(err))
    }
}
const getNeedWriteRiviewAPI = ()=>{
  return function (dispatch, getState, {history}) {
    const token = localStorage.getItem("token")
    axios({
      method : 'get',
      url : 'http://3.36.67.251:8080/board/mating/noreviews',
      headers : {
        authorization: `Bearer ${token}`
    },
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}
export default handleActions(
  {
    [GET_POST_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload;
      }),
    [GET_POST_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list = action.payload;
      }),
    [GET_APPLY_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.apply_list = action.payload;
      }),
    [GET_MEET_TIME]: (state, action) =>
      produce(state, (draft) => {
        draft.time = action.payload;
      }),
    [GET_POST_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review_list = action.payload;
      }),
    [GET_REVIEW_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.review_detail = action.payload;
      }),
    [GET_CREATED_AT]: (state, action) =>
      produce(state, (draft) => {
        draft.created_At = action.payload;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
    [GET_REVIEW_CARD] : (state, action) => 
      produce(state, (draft) => {
          draft.review_card = action.payload;
      }),
      [GET_NEED_WRITE_REVIEW] : (state, action) => 
      produce(state, (draft) => {
          draft.needWrite_list = action.payload;
      })
  },
  initialState
);

const actionsCreators = {
    addPost,
    editPost,
    getPostReview,
    getPostMainDB,
    getPostDetailDB,
    getPostDetail,
    addPostDB,
    deletePostDB,
    editPostDB,
    getPostReviewDB,
    getReviewDetailDB,
    addReviewDB,
    editReviewDB,
    getNeedWriteRiviewAPI
};

export {actionsCreators};
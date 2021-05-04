import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
=======

>>>>>>> 95399dcd44fdc43838f71b819ad014814a5241e4
import ApplyList from '../components/ApplyList'

import styled from 'styled-components';
import { actionsCreators as postActions} from '../redux/modules/post'
import { actionsCreators as applyActions} from '../redux/modules/apply'
import { history } from "../redux/configStore";

const MatingDetail = (props) => {
    const id = props.match.params.id;
    const [registContents, setRegistContents] = React.useState("");
    
    const dispatch = useDispatch();
<<<<<<< HEAD
    const post_list = useSelector((store)=> store.post.detail_list)
=======
    
    const post_list = useSelector((store)=> store.post.detail_list);
    const apply_list = useSelector((store) => store.post.apply_list);
>>>>>>> 95399dcd44fdc43838f71b819ad014814a5241e4
    const data = post_list
    console.log(data);
    
    useEffect(()=>{
        dispatch(postActions.getPostDetailDB(id))
    }, [id]);
    
    const deletePost=()=>{
        if(window.confirm("게시글을 삭제하시겠습니까?") === true){
            dispatch(postActions.deletePostDB(id))
        }
    }
    const registApply=()=>{
        if(registContents === ""){
            window.alert("신청을 위한 한마디를 적어주세요!")
        }else{
            dispatch(applyActions.attendApplyDB(id, registContents))
        }
    }
    const cancelRegistApply=()=>{
      dispatch(applyActions.cancelApply(id))
    }
    console.log(apply_list)

    return (
      <React.Fragment>
        <div>{data.title}</div>
        <div>
          <p>{data.meetTime}</p>
        </div>
        <div>
          <p>{data.location}</p>
        </div>
        <div>
          <img src={data.board_imgUrl}></img>
        </div>
        <div>
          <p>{data.contents}</p>
        </div>
        <button onClick={() => {history.push('/board/mating/write/'+id)}}>수정</button>
        <button onClick={deletePost}>삭제</button>
        <div>
          <TextArea
            placeholder="신청멘트"
            rows="5"
            onChange={(e) => {
              setRegistContents(e.target.value);
            }}
          />
          <span>
            <button onClick={registApply}>신청하기</button>
            <button onClick={cancelRegistApply}>신청취소하기</button>
<<<<<<< HEAD
         </span>
=======
          </span>
>>>>>>> 95399dcd44fdc43838f71b819ad014814a5241e4
        </div>
        {apply_list.map((p) => {
          return <ApplyList key={p.id} {...p} />
        })}
      </React.Fragment>
    );
}

const TextArea = styled.textarea`
    width : 400px
`


export default MatingDetail;
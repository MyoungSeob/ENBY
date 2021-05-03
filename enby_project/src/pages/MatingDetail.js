import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionsCreators as postActions} from '../redux/modules/post'
import { actionsCreators as applyActions} from '../redux/modules/apply'

const MatingDetail = (props) => {
    const id = props.match.params.id;

    const [registContents, setRegistContents] = React.useState("");
    
    const dispatch = useDispatch();
    
    const post_list = useSelector((store)=> store.post.detail_list)
    const data = post_list
    
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
        <button>수정</button>
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
          </span>
        </div>
      </React.Fragment>
    );
}

const TextArea = styled.textarea`
    width : 400px
`

export default MatingDetail;
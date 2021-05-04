import React from 'react';
import styled from 'styled-components';

const ApplyList = (props) =>{

    return (
      <>
        <List>
          <ApplyListBox>
            <ApplyPersonImg>
                <img src={props.profile_img} />
            </ApplyPersonImg>
            <ApplyPersonNickName>{props.nickname}</ApplyPersonNickName>
            <ApplyPersonComment>{props.contents}</ApplyPersonComment>
          </ApplyListBox>
          <Button>
            <button>참석 허가하기</button>
            <span>
              <button>참석 거절하기</button>
            </span>
          </Button>
        </List>
      </>
    );
}
const List = styled.div`
    margin : 20px 0 0 0;
 display : flex;
 max-width : 700px;
`
const ApplyListBox = styled.div`
display : flex;
`
const ApplyPersonImg = styled.div`
width : 40px;
`
const ApplyPersonNickName = styled.div`
margin-right : 30px;`
const ApplyPersonComment = styled.div`
width : 290px;
`
const Button = styled.div``

export default ApplyList;
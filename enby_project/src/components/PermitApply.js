import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PermitApply = (props) => {
    const apply_list = useSelector((store) => store.post.apply_list)

    const regist_list = [];
    for(let i = 0; i < apply_list.length; i++){
        if(apply_list[i].register_id === parseInt(localStorage.getItem('regist'))){
            regist_list.push(apply_list[i])
        }
    }

    const regist = regist_list[0]

    return (
      <Container>
        <CheckBox>
          <CheckMe>
            <CheckImg src={regist.profile_img} />
            <CheckId>{regist.nickname}</CheckId>
          </CheckMe>
          <CheckContents>
            <CheckKakaoID>
              <CheckH>Kakao ID : {regist.kakao_id}</CheckH>
            </CheckKakaoID>
            <CheckComment>
              <CheckP>{regist.contents}</CheckP>
            </CheckComment>
          </CheckContents>
        </CheckBox>
      </Container>
    );
}
const Container = styled.div`
display : flex;
`
const CheckBox = styled.div`
    margin-top : 34px;
    display : flex;    
    
`
const CheckMe = styled.div`
display : flex;
width : 196px;
`
const CheckImg = styled.img`
    width : 24px;
    height : 24px;
    border-radius : 24px;
    margin-top : 3px;
    margin-right : 10px;
`
const CheckId = styled.p`
    margin : 0;
    font-size : 18px;
    font-family : notosans_regular;
`
const CheckContents = styled.div`
    margin-left : 24px;
`
const CheckKakaoID = styled.div`
width : 1000px;
`
const CheckH = styled.h1`
    margin : 0px;
    font-size : 18px;
    font-family : notosans_regular;
`
const CheckComment = styled.div`
    
`
const CheckP = styled.p`
    font-size : 18px;
    font-family : notosans_regular;
    max-width : 1000px;
`
const CheckButtonBox = styled.div`
`

export default PermitApply;
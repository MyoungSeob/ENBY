import React from'react';
import styled from 'styled-components';

const MemberCard =(props)=>{

    return(
        <Container>
            
            <Member>
                <MemberImg src={props.profile_img}/>
                <MemberNickname>{props.nickname}</MemberNickname>
            </Member>
        </Container>
    )
}

const Container = styled.div`
margin-right : 30px;
`

const Member = styled.div`
    width : 150px;
    height : 185px;
`
const MemberImg = styled.img`
    width : 150px;
    height : 150px;
    border-radius : 150px;
`
const MemberNickname = styled.p`
  font-size: 18px;
  font-family: notosans_regular;
  text-align : center;
`;

export default MemberCard;
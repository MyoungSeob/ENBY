import React from 'react';
import styled from 'styled-components';

const About =(props)=>{

    return(
        <Container>
        <AboutTitle>
            <Title>About</Title>
        </AboutTitle>
        <AboutContents>
            <Contents>{props.contents}</Contents>
        </AboutContents>
        </Container>
    )
}

const Container = styled.div`
  max-width: 700px;
  float: right;
`;
const AboutTitle = styled.div`
    
    margin-bottom : 34px;
`
const Title = styled.h2`
    font-size : 28px;
    font-family : seravek;
    font-style : italic;
    margin : 0;
`
const AboutContents = styled.div`
`
const Contents = styled.p`
font-size : 18px;
font-family : notosans_regular;
`

export default About;
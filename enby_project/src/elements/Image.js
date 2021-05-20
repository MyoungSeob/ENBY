import React from 'react';
import styled from 'styled-components';
import image from '../redux/modules/image';
import profile from '../shared/image/profile.png'
import { generateMedia } from 'styled-media-query';

const Image =(props)=>{
    const {shape, src, size} = props;
    const styles = {
        src : src,
        size : size,
    }
    if(shape === "contents"){
        return (
            <ContentsImage {...styles} />
        )
    }
    if(shape === "moimcontentsdeadline"){
        return(
            <MoimcontentsDeadline {...styles} />
        )
    }
    if(shape === "minicontents"){
        return (
            <MiniContentsImage {...styles} />
        )
    }
    if(shape === "minicontentsdeadline"){
        return (
            <MiniContentsImageDeadline {...styles} />
        )
    }
    if(shape === "rectangle"){
        return(
            <ImageRectangle {...styles}/>
        )
    }
    if(shape === "moimcontents"){
        return (
            <Moimcontents {...styles} />
        )
    }
    if(shape === "maintitle"){
        return(
            <MainTitle {...styles}/>
        )
    }
    if(shape === "deadlinecard"){
      return(
          <Deadlinecard {...styles}/>
      )
      
  }
  if(shape === "title"){
    return(
        <Title {...styles}/>
    )
  }
    return(
        <ImageDefault {...styles} />
    )
}
image.defaultProps = {
    shape : "circle",
    src : profile,
    size : 36,
}

const ImageDefault = styled.div`
  width: 1920px;
  max-width : 100%;
  max-height: 233px;
  height: 233px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(55%);
  transform : scale(1.2);
`;
const ImageRectangle = styled.div`
    width : 100%;
    min-width : 1200px;
    max-height : 720px;
    height : 720px;
    background-image : url("${(props)=>props.src}");
    background-size : cover;
    background-position : center;
    background-repeat : no-repeat;
    z-index : -1;
    position : relative;
    @media (min-width: 600px) and (max-width: 1170px) {
        max-width: 1024px;
        min-width: 600px;
        // height: 235.73px;
        }
      
      @media (max-width: 600px) {
        width: 100%;
        min-width: 375px;
        // background-size : cover;
        background-position: center;
      }
`
const ContentsImage = styled.div`
  width: 513px;
  height: 513px;
  border-radius : 20px;
  background-image: url("${(props) => props.src}");
  background-size: 513px 513px;
  background-position: center;
  background-repeat: no-repeat;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 450px;
    height: 450px;
    background-size: cover;
  }
  @media (max-width: 600px) {
    width: 240px;
    background-size: cover;
    height: 240px;
    margin-left: 30px;
  }
`;
const MiniContentsImage = styled.div`
  width: 513px;
  height: 513px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 380px;
    height: 380px;
  }
  @media (max-width: 600px) {
    width: 350px;
    height: 350px;
    margin : 0 auto 0 auto;
   }
`;
const MiniContentsImageDeadline = styled.div`
  width: 410px;
  height: 421px;
  background-image: url("${(props) => props.src}");
  background-size: 410px 421px;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  @media (max-width: 600px) {
    width: 240px;
    height: 240px;
    margin-left: 25px;
   }
`;

const Moimcontents = styled.div`
  width: 1920px;
  max-width : 100%;
  height: 260px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(55%);
  transform : scale(1.2);
  @media (min-width: 600px) and (max-width: 1170px) {
    max-width: 1024px;
    width: 100%;
    background-size: fit;
  }
`;
const MoimcontentsDeadline = styled.div`
  width: 1920px;
  max-width: 100%;
  height: 260px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(50%) grayscale(100%);
  transform : scale(1.2);
  @media (min-width: 600px) and (max-width: 1170px) {
    max-width: 1024px;
    width: 100%;
  }
`;
const MainTitle = styled.div`
  width: 1920px;
  max-width : 100%;
  height: 1000px;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size : 1920px 1000px;
  background-repeat: no-repeat;
  margin : auto;
    @media (max-width : 1440px) {
      width: 1440px;
      max-width: 100%;
      height: 750px;
      background-size : 1440px 750px;
      background-position: center;
  
    }
    @media (max-width : 1200px) {
      height: 625px;
  
    }
    @media (max-width: 600px) {
      width: 100%;
      min-width: 375px;
      height: 320px;
      background-size : cover;
      background-position: center;
    }

`;
const Title = styled.div`
  max-width: 1920px;
  width : 100%;
  height: 520px;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size : 1920px 520px;
  background-repeat: no-repeat;
  margin : auto;
  @media (max-width : 1440px;) {
    width: 1440px;
    max-width: 100%;
    height: 750px;
    background-size : 1920px 1000px;
    background-position: center;

  }
  @media (min-width: 600px) and (max-width: 1170px) {
    }
  
  

  @media (max-width: 600px) {
    width: 100%;
    min-width: 375px;
    height: 320px;
    background-size : cover;
    background-position: center;

  }

`;
const Deadlinecard = styled.div`
  position : absolute;  
width: 282px;
  height: 282px;
  background-image: url("${(props) => props.src}");
  border-radius: 20px;
  opacity : 40%;
  filter : grayscale(100%);
  background-position: center;
  background-size : 282px 282px;
  background-repeat: no-repeat;
  margin : auto;
  @media (min-width: 600px) and (max-width: 1170px) {
    width: 170px;
    height: 170px;
  }
  @media (max-width: 600px) {
    width: 165px;
    height: 105px;
    max-width: 100%;
    margin: auto;
    border-radius: 10px 10px 0 0;
  }
`
export default Image;
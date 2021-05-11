import React from 'react';
import styled from 'styled-components';
import image from '../redux/modules/image';
import profile from '../shared/image/profile.png'

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
  min-width: 1200px;
  max-height: 233px;
  height: 233px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(30%);
  transform : scale(1.1);
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
`
const ContentsImage = styled.div`
  width: 718px;
  height: 718px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const MiniContentsImage = styled.div`
  width: 410px;
  height: 421px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const MiniContentsImageDeadline = styled.div`
  width: 410px;
  height: 421px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter : grayscale(100%);
`;

const Moimcontents = styled.div`
  width: 1920px;
  min-width: 1200px;
  max-height: 320px;
  height: 320px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(55%);
  transform : scale(1.2);
`;
const MoimcontentsDeadline = styled.div`
  width: 1920px;
  min-width: 1200px;
  max-height: 320px;
  height: 320px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px) brightness(50%) grayscale(100%);
  transform : scale(1.2);
`;
export default Image;
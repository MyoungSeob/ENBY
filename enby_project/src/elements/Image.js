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
    if(shape === "circle"){
        return (
            <></>
        )
    }
    if(shape === "rectangle"){
        return(
            <ImageRectangle {...styles}/>
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
    width : 100%;
    min-width : 1200px;
    max-height : 720px;
    height : 550px;
    background-image : url("${(props)=>props.src}");
    background-size : contain;
    background-position : center;
    background-repeat : no-repeat;
`
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

export default Image;
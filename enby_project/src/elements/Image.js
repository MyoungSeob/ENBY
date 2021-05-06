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
            <></>
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
    max-height : 720px;
    height : 720px;
    background-image : url("${(props)=>props.src}");
    background-size : cover;
    background-position : center;
    background-repeat : no-repeat;
`

export default Image;
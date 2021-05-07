import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import React from 'react'
import styled from 'styled-components';

function Carousel() {
  return (
    <Container>
        <div data-src={require("../shared/image/carousel_img_1.png").default} />
        <div data-src="/path/to/image-1.png" />
        <div data-src="/path/to/image-2.jpg" />
    </Container>
  )
}

const Container = styled(AwesomeSlider)`
  width: 1920px;
  height: 626px;
`;

export default Carousel;
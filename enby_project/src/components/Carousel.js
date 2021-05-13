import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';
import "../carousel.css";
import React from 'react'
import styled from 'styled-components';

function Carousel() {
  return (
    <Container>
        <div data-src={require("../shared/image/main_carousel1.png").default} />
        <div data-src={require("../shared/image/main_carousel3.png").default} />
        <div data-src={require("../shared/image/main_carousel4.png").default} />
    </Container>
  )
}

const Container = styled(AwesomeSlider)`
  width: 1920px;
  height: 626px;
`;

export default Carousel;
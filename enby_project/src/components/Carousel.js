import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import React from 'react'

function Carousel() {
  return (
    <AwesomeSlider>
        <div data-src={require("../icon/carousel_img_1.png").default} />
        <div data-src="/path/to/image-1.png" />
        <div data-src="/path/to/image-2.jpg" />
    </AwesomeSlider>
  )
}

export default Carousel;
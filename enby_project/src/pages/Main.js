import React from 'react'
import CardList from '../components/CardList'
import Carousel from '../components/Carousel'
import styled from 'styled-components'
import Header from '../components/Header'


const Main =(props)=>{
    return (
      <Container>
        <Carousel />
        <CardList></CardList>
      </Container>
    );
}
const Container = styled.div`
  width : 1440px;
  margin : auto;
`


export default Main;

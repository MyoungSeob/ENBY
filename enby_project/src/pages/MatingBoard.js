import React from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Search from '../components/Search';

function MatingBoard() {
    return (
        <div>
            <Header />
            <Carousel />
            <Search />
            <CardList />
        </div>
    )
}

export default MatingBoard

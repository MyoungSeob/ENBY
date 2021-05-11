import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Search from '../components/Search';
import styled from 'styled-components';
import main_carousel2 from '../shared/image/main_carousel2.png';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { history } from "../redux/configStore";
import {actionsCreators as postActions} from '../redux/modules/post'


function MatingBoard(props) {
    const dispatch = useDispatch();
    // pagination
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const indexOfLast = currentPage * postsPerPage; // 6
    const indexOfFirst = indexOfLast - postsPerPage; // 6-6=0
    const post_list = useSelector((store) => store.post.list)

    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
        
    useEffect(() => {
        dispatch(postActions.getPostMainDB())
        setPosts(post_list);
    }, [dispatch]);
    
    return (
        <div>
            <Image shape="rectangle" src={main_carousel2} />
            <Container>
                <TopButton>
                <Search />
                    <Button1>
                        <text>모든 모임</text>
                    </Button1>
                    <Button2>
                        <text>모집 중</text>
                    </Button2>
                    <Button3>
                        <text>마감</text>
                    </Button3>
                </TopButton>
                <Button4
                        onClick={() => {history.push(`/board/write`)}}>
                        <button>모임 만들기</button>
                    </Button4>
                <CardList post_list={currentPosts(posts)}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={post_list.length} paginate={setCurrentPage} />
            </Container>
        </div>
    )
}
const Image = styled.img`
width : 100%;
min-width : 1200px;
// max-height : 720px;
`;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
`;

const TopButton =styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
`;
const Button1 = styled.button`
    width: 167px;
    height: 39px;
    margin-left: 226px;
    margin-top: 86.98px;

    background: #000000;
    border-radius: 20px;
    cursor: pointer;

    & text {
        font-family : notosans_regular;
        font-size: 18px;
        line-height: 150%;
        text-align: center;
        color: #FFFFFF;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
`;

const Button2 = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 48px;

width: 150px;
height: 39px;
margin-left: 30px;
margin-top: 86.98px;

border: 1px solid #000000;
box-sizing: border-box;
border-radius: 20px;
cursor: pointer;
& text {
    font-family : notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
}
`;

const Button3 = styled.button`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 48px;

width: 130px;
height: 39px;
margin-left: 30px;
margin-top: 86.98px;

border: 1px solid #000000;
box-sizing: border-box;
border-radius: 20px;
cursor: pointer;

& text {
    font-family : notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
}
`;
const Button4 = styled.div`
    width: 100%;
    // max-width: 1200px;
    margin-bottom: 67px;
    flex-direction: row;
    margin: 28px auto auto 1034px;

& button {
    background: #F1B100;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    width: 167px;
    height: 40px;
    font-family: notosans_regular;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
}
`;
export default MatingBoard

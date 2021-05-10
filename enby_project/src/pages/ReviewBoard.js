import React, { useState, useEffect }  from 'react'
import ReviewCardList from '../components/ReviewCardList'
import Search from '../components/Search';
import styled from 'styled-components';
import Modal from '../components/Modal';
import Card from '../components/Card';

import { useDispatch, useSelector } from 'react-redux';
import {actionsCreators as userActions} from '../redux/modules/user'
import jwt_decode from 'jwt-decode';

function ReviewBoard() {

    const [ modalOpen, setModalOpen ] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    // 참여했던 모임
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const name = decode.nickname;
    console.log(decode)
    const apply_list = useSelector((store) => store.user.apply_list)
    console.log(apply_list);
    const empty_list = apply_list.length === 0? true : false;
    // if (apply_list=null) {
    //     let empty_list == true;
    // } else {let empty_list == false;}

    useEffect(() => {
        dispatch(userActions.getMyProfileDB(name));
      }, []);

    return (
        <div>
            <Head>
                <SubTitle1>
                    Share your experience with ENBY!
                </SubTitle1>
                <Title>
                    Reviews
                </Title>
                <SubTitle2>
                    당신의 엔비를 공유해주세요!
                </SubTitle2>
            </Head>
            {/* <Search /> */}
                {/* <Button1>
                    <text>모든 모임</text>
            </Button1> */}
            <Container>
                <ReviewCardList />
                <Button
                    onClick={ openModal }>
                후기 등록하기!
                </Button>
                {empty_list? (
                    <Modal open={ modalOpen } close={ closeModal } header="후기 등록하기">
                        현재 후기를 남길 모임이 없어요🥲 <br/>
                        <button>모임 참여하러 가기!</button>                        
                    </Modal>
                ) : (
                    <Modal open={ modalOpen } close={ closeModal } header="후기 등록하기">
                        {apply_list.map((p) => {
                                return <Card_sml key={p.id} {...p}/>
                            })}
                    </Modal>
                )}
            </Container>
        </div>
    )
}
const Card_sml = styled(Card)`
    > CardGrid {
    width: 100px;
    height: 100px;
    }
`;
const Head = styled.div`
    width: 1200px;
    height: 221px;
`;

const SubTitle1 = styled.text`
    position: absolute;
    width: 282px;
    height: 26px;
    left: 360px;
    top: 140px;

    font-family: notosans_regular;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    /* identical to box height */

    color: #7D7D7D;
`;

const Title = styled.text`
    position: absolute;
    width: 132px;
    height: 37px;
    left: 360px;
    top: 168px;

    font-family: ;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;

    color: #000000;
`;

const SubTitle2 = styled.text`
    position: absolute;
    width: 291px;
    height: 28px;
    left: 360px;
    top: 234px;

    font-family: notosans_regular;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;

    color: #3A3A3A;
`;

const Container = styled.div`
    display : block;
    width: 1200px;
    height: auto;
    height: 2803px;
    left: 1px;
    top: 321px;

    background: #F8F8F8;
`;

const Button = styled.button`
width: 100px;
`;

export default ReviewBoard

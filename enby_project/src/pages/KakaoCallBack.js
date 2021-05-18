import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'
import Loading from '../components/Loading';


const KakaoCallBack =()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const KakaoCode = window.location.href.split('=')[1]
        dispatch(userActions.KakaoLogin(KakaoCode))
    })

    return <Loading />;
}

export default KakaoCallBack;
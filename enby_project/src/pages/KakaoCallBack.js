import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'

const KakaoCallBack =()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const KakaoCode = window.location.href.split('=')[1]
        dispatch(userActions.KakaoLogin(KakaoCode))
        console.log(KakaoCode)
    })

    return (
        <React.Fragment>
            카카오 로그인 중
        </React.Fragment>
    )
}

export default KakaoCallBack;
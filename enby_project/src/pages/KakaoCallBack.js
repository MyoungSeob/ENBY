// 카카오 로그인시, 해당 컴포넌트가 사용되어 백엔드로 주소창에 있는 토큰을 보내주는 컴포넌트입니다.

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'
import Loading from '../components/Loading';


const KakaoCallBack =()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        // 이 컴포넌트가 사용되는 페이지의 주소 중 토큰값을 추출하는 코드입니다.
        const KakaoCode = window.location.href.split('=')[1]
        dispatch(userActions.KakaoLogin(KakaoCode))
    })
    // 해당 코드를 보내며 통신을 대기하는 동안 Loading컴포넌트를 이용해 로딩 중임을 사용자에게 보여줍니다.
    return <Loading />;
}

export default KakaoCallBack;
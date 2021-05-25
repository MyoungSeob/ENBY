import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'


const Login =(props)=>{
 

    return (
      <React.Fragment>
        <div>
          <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=17fb08cb376f564b3375667a799fda1f&redirect_uri=http://localhost:3000/oauth"><button>소셜로그인</button></a>         
        </div>
      </React.Fragment>
    );
}

const KaKaoBtn = styled(KakaoLogin)`
    width: 400px;
    margin: 5px 0 0 38px;
    height: 45px;
`;

export default Login;
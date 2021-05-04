import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'

const Login =(props)=>{
 

    return (
      <React.Fragment>
        <div>
          {/* <KaKaoBtn
            token={"1d88210c3702180b852cda6cb17d915f"}
            onSuccess={(res) => {
              console.log(res.response.access_token);
              // const access_token = res.response.access_token
              // SocialLogin(access_token)
            }}
            onFailure={(err) => console.log(err)}
            buttonText="카카오 계정으로 로그인"
            getProfile={true}
          /> */}
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
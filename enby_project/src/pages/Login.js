import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import {actionsCreators as userActions} from '../redux/modules/user'

const Login =(props)=>{
  const { Kakao } = window;
  const dispatch = useDispatch();
  function SocialLogin(token){
    dispatch(userActions.KakaoLogin(token))
  }
  const KakaoLoginHandler =()=>{
    Kakao.Auth.authorize({
      redirectUri : "http://localhost:3000/oauth"
    })
  }

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
          <button onClick={KakaoLoginHandler}>소셜로그인</button>
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
import React from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';

const Login =(props)=>{

    return (
      <React.Fragment>
        <div>
          <KaKaoBtn
            token={"fd4e88c3f5967abb55c7aaf8225c8048"}
            onSuccess={(res) => {
              console.log(res);
            }}
            onFailure={(err) => console.log(err)}
            buttonText="카카오 계정으로 로그인"
            getProfile={true}
          />
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
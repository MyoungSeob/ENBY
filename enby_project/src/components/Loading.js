// 로그인이나, 특정 동작을 하는 동안 사용자들을 위한 로딩화면입니다. material_ui를 이용하여 구현하였습니다.
import React from 'react';
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMediaQuery } from "react-responsive";

const Loading = (props)=>{

  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

    return (
      <Grid>
        <Container>
        {isDesktop? (
          <CircularProgress
          style={{ width: "100px", height: "100px", marginLeft: "50%" }}
          disableShrink
        />
        ) : (
          <CircularProgress
            style={{ width: "100px", height: "100px", marginLeft: "38%" }}
            disableShrink
          />
        )}
          
        </Container>
      </Grid>
    );
}
const Grid = styled.div`
  width : 100%;
  height : 100%;
`
const Container = styled.div`
  display : block;
  padding : auto
  
`;
export default Loading;
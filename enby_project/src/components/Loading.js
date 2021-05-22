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
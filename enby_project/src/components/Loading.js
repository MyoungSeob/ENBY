import React from 'react';
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = (props)=>{

    return (
      <Grid>
        <Container>
          <CircularProgress
            style={{ width: "100px", height: "100px", marginLeft: "50%" }}
            disableShrink
          />
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
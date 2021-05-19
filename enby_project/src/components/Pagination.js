import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from "react-responsive";

const PagingMating = ({ postsPerPage, totalPosts, paginate }) => {
  
  // 반응형 구현
  const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1170px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)"
  });

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
  };
  const countPage =
    totalPosts % postsPerPage > 0
      ? Math.ceil(totalPosts / postsPerPage)
      : totalPosts / postsPerPage;


  const useStyles = makeStyles((theme) => (
    isMobile ? {
    root: {
        width : "320px",
        display : 'flex',
        justifyContent: "center",
        margin : 'auto auto 121px auto',
      '& > * + *': {},
    },
    }:
    isTablet ? {
      root: {
        width : "760px",
        display : 'flex',
        justifyContent: "center",
        margin : 'auto auto 121px auto',
      '& > * + *': {},
      },
    } : {
      root: {
        width : "1200px",
        display : 'flex',
        justifyContent: "center",
        margin : 'auto auto 121px auto',
      '& > * + *': {},
    },
  }));

  const classes = useStyles()
  return (
    <div className={classes.root}>
        <Pagination page={page} count={countPage} onChange={handleChange} />
    </div>
  );
};

export default PagingMating;

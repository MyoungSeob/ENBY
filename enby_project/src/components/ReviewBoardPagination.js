import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from "react-responsive";

const ReviewBoardPagination = ({ postsPerPage, totalPosts, paginate }) => {

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
    window.scrollTo({top:400, left:0, behavior:'smooth'});
  };
  const countPage =
    totalPosts % postsPerPage > 0
      ? Math.ceil(totalPosts / postsPerPage)
      : totalPosts / postsPerPage;

const useStyles = makeStyles((theme) => (
    isMobile ? {
    root: {
      width: "337.5px",
      display: "flex",
      justifyContent: "center",
      margin: "auto auto 121px 30px",
      "& > * + *": {},
    },
  } : isTablet ? {
    root: {
      width: "760px",
      display: "flex",
      justifyContent: "center",
      margin: "auto auto 121px auto",
      "& > * + *": {},
  },
} : {
      root: {
        width: "1200px",
        display: "flex",
        justifyContent: "center",
        margin: "auto 27.5px 121px 27.5px",
        "& > * + *": {},
      },
    }
  ));

  const classes = useStyles()

  return (
    <div className={classes.root}>
        <Pagination page={page} count={countPage} onChange={handleChange} />
    </div>
  );
};

const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: auto;
  // padding-top: 88px;
  // 카드아래 79마진 되어있는것 적용되서 이부분 주석
  padding-bottom: 120px;
  @media (min-width: 600px) and (max-width: 1170px) {
  }
  @media (max-width: 600px) {
    margin: 0;
  }
`;
const PageUl = styled.div`
  margin: auto;
  list-style: none;
  border-radius: 3px;
  color: #8f8f8f;
  font-family: notosans_regular;
  font-size: 19px;
  line-height: 28px;
  padding: 1px;
  &:focus {
    color: #3a3a3a;
    font-size: 100px;
  }
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  // width:32px;
  height: 30px;
  &:hover,
  &:focus {
    cursor: pointer;
    color: #3a3a3a;
  }
  @media (min-width: 600px) and (max-width: 1170px) {
  }
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: #3a3a3a;
  }
`;
const Click = styled.span`
  border-radius: 100%;
  color: #3a3a3a; ;
`;

export default ReviewBoardPagination;
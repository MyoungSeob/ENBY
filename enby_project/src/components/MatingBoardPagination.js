//모집게시판에서의 페이지네이션 컴포넌트입니다.
import React from "react";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";

const MatingBoardPagination = (props) => {
  // props로는 모든 모임, 모집 중, 마감 이렇게 3가지에 대한 포스트의 갯수, 해당 사항의 버튼이 눌려있는지 등이 내려옵니다.
  // 반응형 구현
  const isTablet = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 600px)",
  });
  // 모든 게시글에 대한 페이지네이션입니다.
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.paginate(value);
    window.scrollTo({ top: 850, left: 0, behavior: "smooth" });
  };
  // 마감된 게시글에 대한 페이지네이션입니다.
  const [deadlinepage, setDeadlinePage] = React.useState(1);
  const isHandleChange = (event, value) => {
    setDeadlinePage(value);
    props.deadPaginate(value);
    window.scrollTo({ top: 850, left: 0, behavior: "smooth" });
  };
  // 모집 중인 게시글에 대한 페이지네이션입니다.
  const [notDeadlinepage, setNotDeadlinePage] = React.useState(1);
  const isNotHandleChange = (event, value) => {
    setNotDeadlinePage(value);
    props.notDeadPaginate(value);
    window.scrollTo({ top: 850, left: 0, behavior: "smooth" });
  };
  // 총 페이지 수를 나타내는 코드입니다. 
  const countPage =
    props.totalPosts % props.postsPerPage > 0
      ? Math.ceil(props.totalPosts / props.postsPerPage)
      : props.totalPosts / props.postsPerPage;
  const deadline_countPage =
    props.deadline_Posts % props.postsPerPage > 0
      ? Math.ceil(props.deadline_Posts / props.postsPerPage)
      : props.deadline_Posts / props.postsPerPage;
  const notDeadline_countPage =
    props.isNotDeadline_Posts % props.postsPerPage > 0
      ? Math.ceil(props.isNotDeadline_Posts / props.postsPerPage)
      : props.isNotDeadline_Posts / props.postsPerPage;


  const useStyles = makeStyles((theme) => (
    isMobile ? {
    root: {
        width: "320px",
        display: "flex",
        justifyContent: "center",
        margin: "auto auto 121px auto",
        "& > * + *": {},
    },
  } : isTablet ? {
  root: {
      width: "760px",
      display: "flex",
      justifyContent: "center",
      margin: "auto auto 80px auto",
      "& > * + *": {},
  },
 } : {
    root: {
      width: "1200px",
      display: "flex",
      justifyContent: "center",
      margin: "auto auto 121px auto",
      "& > * + *": {},
      },
    }
  ));

  const classes = useStyles()

  const viewPagination = () => {
    if (props.allMoim) {
      return (
        <div className={classes.root}>
          <Pagination page={page} count={countPage} onChange={handleChange} />
        </div>
      );
    }
    if (props.isNotDeadline) {
      return (
        <div className={classes.root}>
          <Pagination
            page={notDeadlinepage}
            count={notDeadline_countPage}
            onChange={isNotHandleChange}
          />
        </div>
      );
    }
    if (props.isDeadline) {
      return (
        <div className={classes.root}>
          <Pagination
            page={deadlinepage}
            count={deadline_countPage}
            onChange={isHandleChange}
          />
        </div>
      );
    }
  };

  return <Container>{viewPagination()}</Container>;
};

const Container = styled.div`
  display: block;
  margin: auto;
`;

export default MatingBoardPagination;

import React from "react";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const MatingBoardPagination = (props) => {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.paginate(value);
    window.scrollTo({top:850, left:0, behavior:'smooth'});
  };
  const [deadlinepage, setDeadlinePage] = React.useState(1);
  const isHandleChange = (event, value) => {
  setDeadlinePage(value);
  props.paginate(value);
  window.scrollTo({top:850, left:0, behavior:'smooth'});
};
const [notDeadlinepage, setNotDeadlinePage] = React.useState(1);
const isNotHandleChange = (event, value) => {
  setNotDeadlinePage(value);
  props.paginate(value);
  window.scrollTo({top:850, left:0, behavior:'smooth'});
};
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

    const useStyles = makeStyles((theme) => ({
      root: {
        width : "1200px",
          display : 'flex',
          justifyContent: "center",
          margin : 'auto auto 121px auto',
        '& > * + *': {},
      },
    }));
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
}

  return <Container>{viewPagination()}</Container>;
};

const Container = styled.div`
  width: 100%px;
  display: block;
  margin: auto;
`;

export default MatingBoardPagination;

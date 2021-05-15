import React from 'react';
import styled from 'styled-components';

const MatingBoardPagination = (props) => {
  console.log(props);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const deadlinePageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.deadline_Posts / props.postsPerPage);
    i++
  ) {
    deadlinePageNumbers.push(i);
  }
  const isNotDeadlinePageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.isNotDeadline_Posts / props.postsPerPage);
    i++
  ) {
    isNotDeadlinePageNumbers.push(i);
  }
  console.log(deadlinePageNumbers);
  console.log(isNotDeadlinePageNumbers);
  const viewPagination = () => {
    if (props.allMoim) {
      return pageNumbers.map((number) => (
        <PageLi key={number} className="page-item">
          <PageSpan
            onClick={() => props.paginate(number)}
            className="page-link"
          >
            {number}
          </PageSpan>
        </PageLi>
      ));
    }
    if (props.isNotDeadline) {
      return isNotDeadlinePageNumbers.map((number) => (
        <PageLi key={number} className="page-item">
          <PageSpan
            onClick={() => props.paginate(number)}
            className="page-link"
          >
            {number}
          </PageSpan>
        </PageLi>
      ));
    }
    if (props.isDeadline) {
      return deadlinePageNumbers.map((number) => (
        <PageLi
          key={number}
          className="page-item"
          onClick={() => props.paginate(number)}
        >
          <PageSpan className="page-link">{number}</PageSpan>
        </PageLi>
      ));
    }
  };
  return (
    <Container>
      <PageUl className="pagination">{viewPagination()}</PageUl>
    </Container>
  );
};

const Container = styled.div`
width : 100%px;
display : block;
padding-bottom: 80px;
margin : auto;
`;
const PageUl = styled.ul`
  margin: auto;
  width: 1200px;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: #8f8f8f;
  font-family: notosans_regular;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  line-height: 28px;
  padding: 1px;
  &:focus {
    color: #3a3a3a;
    font-size: 100px;
  }
`;

const PageLi = styled.li`
  display : inline-block;
  margin : auto;
  font-size:17px;
  font-weight:600;
  padding:5px;
  border-radius:5px;
  width:32px;
  height: 30px;
  &:hover, &:focus{
    cursor:pointer;
    color: #3A3A3A;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color: #3A3A3A;;
  }
`;



export default MatingBoardPagination;
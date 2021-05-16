import React from 'react';
import styled from 'styled-components';

const PagingMating = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
        <Container>
              <PageUl className="pagination">
              {pageNumbers.map(number => (
                  <PageLi key={number} className="page-item">
                  <PageSpan onClick={() => paginate(number)} className="page-link">
                      {number}
                  </PageSpan>
                  </PageLi>
              ))}
              </PageUl>
        </Container>
      );
      };

const Container = styled.div`
display : flex;
width: 1200px;
margin : auto;
// padding-top: 88px;
// 카드아래 79마진 되어있는것 적용되서 이부분 주석
padding-bottom: 120px;

@media (min-width: 600px) and (max-width: 1170px) {
}

@media (max-width: 600px) {
    margin: -1000px;
    width: 320px;
}
`;
const PageUl = styled.div`
  margin  :auto;
  list-style: none;
  border-radius:3px;
  color: #8F8F8F;
  font-family: notosans_regular;
  font-size: 19px;
  line-height: 28px;
  padding:1px;  
  &:focus {
    color: #3A3A3A;
    font-size: 100px;
  }
  @media (max-width: 600px) {
    margin: -1000px;
    width: 320px;
}
`;

const PageLi = styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:10px;
  border-radius:5px;
  // width:32px;
  height: 30px;
  &:hover, &:focus{
    cursor:pointer;
    color: #3A3A3A;
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
  &:focus::after{
    border-radius:100%;
    color: #3A3A3A;;
  }
`;


export default PagingMating;

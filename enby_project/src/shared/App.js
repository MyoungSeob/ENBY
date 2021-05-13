import './App.css';
import Main from '../pages/Main';
import MatingBoardWrite from '../pages/MatingBoardWrite';
import MatingBoard from '../pages/MatingBoard';
import Login from '../pages/Login';
import MatingDetail from '../pages/MatingDetail';
import {BrowserRouter, Route} from "react-router-dom";
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import KakaoCallBack from '../pages/KakaoCallBack';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mypage from '../pages/Mypage';
import OthersMypage from '../pages/OthersMypage';
import ReviewBoard from '../pages/ReviewBoard';
import ReviewDetail from '../pages/ReviewDetail';
import ReviewBoardWrite from '../pages/ReviewBoardWrite';
import ScrollToTop from './ScrollToTop'
import MatingBoardSearch from '../pages/MatingBoardSearch';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>

        <ConnectedRouter history={history}>
          <ScrollToTop>
          <Header />
          <Route path="/" exact component={Main} />
          <Route path="/board/write" exact component={MatingBoardWrite} />
          <Route path="/board/write/:id" exact component={MatingBoardWrite} />
          <Route path="/login" exact component={Login} />
          <Route path="/board/mating/:id" exact component={MatingDetail} />
          <Route path="/board/mating" exact component={MatingBoard} />
          <Route path="/oauth" exact component={KakaoCallBack} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/mypage/:name" exact component={OthersMypage} />
          <Route path="/board/review" exact component={ReviewBoard} />
          <Route path="/board/review/:id" exact component={ReviewDetail} />
          <Route path="/review/write/:id" exact component={ReviewBoardWrite} />
          <Route path="/mating/search/:id" exact component={MatingBoardSearch} />
          <Footer />
          </ScrollToTop>
        </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;


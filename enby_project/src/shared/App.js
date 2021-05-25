import './App.css';
import Main from '../pages/Main';
import MatingBoardWrite from '../pages/MatingBoardWrite';
import MatingBoard from '../pages/MatingBoard';
import Login from '../pages/Login';
import MatingDetail from '../pages/MatingDetail';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
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
import ReviewBoardSearch from '../pages/ReviewBoardSearch';
import NotFound from '../pages/NotFound';

function App() {

  // useEffect(()=>{
  //   getGA();
  // }, []);

  // const getGA =()=>{
  //   const pathName = window.location.pathname;
  //   ReactGA.initialize('G-YCWTTJWZF4');
  //   ReactGA.set({page : pathName});
  //   ReactGA.pageview(pathName);
  // }
  return (
    <React.Fragment>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <ScrollToTop>
          <Header />
          <Switch>
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
          <Route path="/board/review/search/:id" exact component={ReviewBoardSearch} />
          <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
          </ScrollToTop>
        </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;


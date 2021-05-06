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
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/board/write" exact component={MatingBoardWrite} />
          <Route path="/board/write/:id" exact component={MatingBoardWrite} />
          <Route path="/login" exact component={Login} />
          <Route path="/board/mating/:id" exact component={MatingDetail} />
          <Route path="/board/mating" exact component={MatingBoard} />
          <Route path="/oauth" exact component={KakaoCallBack} />
        </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;


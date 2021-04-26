import './App.css';
import Main from '../pages/Main';

import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Main} />
    </div>
      
  );
}

export default App;

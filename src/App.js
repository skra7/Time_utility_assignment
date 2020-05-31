import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Timer from './components/Timer';


function App() {
  return (
    <Router>
      <Route path="/" component={Timer} />
    </Router>
  );
}

export default App;

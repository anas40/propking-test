import React from 'react';
import { RecoilRoot } from "recoil"

//components and css
import Router from './pages/index.js'
import './assets/css/main.css'

function App() {

  return (
    <RecoilRoot>
      <div className="App">
        <Router />
      </div>
    </RecoilRoot>
  );
}

export default App;

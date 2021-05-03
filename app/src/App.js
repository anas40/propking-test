import React from 'react';
import { RecoilRoot } from "recoil"

//components and css
import Router from './pages/index'
import './assets/css/main.css'

function App() {

  return (
    <RecoilRoot>
      <Header />
      <main className="App">
        <Router />
      </main>
      <Footer />
    </RecoilRoot>
  );
}

export default App;

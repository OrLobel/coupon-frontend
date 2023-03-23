import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Components/LayoutArea/Footer/Footer';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/main/main';
import Menu from './Components/LayoutArea/Menu/Menu';

function App() {
  return (
    <div className="App">
        <Header/>
        <Menu/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
 
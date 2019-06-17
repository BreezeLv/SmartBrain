import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkFrom />
      {/*
      <FaceRecognition />*/}
    </div>
  );
}

export default App;

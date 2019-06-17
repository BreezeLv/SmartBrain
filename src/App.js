import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';
import Rank from './Components/Rank';
import Particles from 'react-particles-js';

function App() {
  const particleConfig = {
          particles: {
            number : {
              value : 50,
              density : {
                enable : true,
                value_area : 250
              }
            }
          },
          interactivity: {
              detect_on: "window",
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse'
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize:true
              },
              modes: {
                grab: {
                  distance: 200,
                  line_linked: {
                    opacity: 1
                  }
                },
                repulse: {
                  distance: 100,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                }
              }
            }
        };
  return (
    <div className="App">
      <Particles className='particles' params={particleConfig}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkFrom />
      {/*
      <FaceRecognition />*/}
    </div>
  );
}

export default App;

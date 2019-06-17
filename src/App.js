import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

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

const clarifai = new Clarifai.App({
  apiKey: "1c7cb4f2b4e14d7f997f2057f1bd7966"
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input : "",
      imageUrl : ""
    };
  }

  onInputChanged = (event) => {
    const val = event.target.value;
    // console.log(val);
    this.setState({input:val});
  }

  onButtonDetect = (event) => {
    //https://samples.clarifai.com/face-det.jpg
    this.setState({imageUrl:this.state.input});
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions);
      },
      function(err) {
        // there was an error
        console.log(err);
      }
    )
    .catch(console.log);
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleConfig}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkFrom onInputChanged={this.onInputChanged} onButtonDetect={this.onButtonDetect}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  } 
}

export default App;

import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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

const defaultBox = {top_row:0,bottom_row:0,left_col:0,right_col:0};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input : "",
      imageUrl : "",
      box : [defaultBox]
    };
  }

  onInputChanged = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonDetect = (event) => {
    let $this = this;
    //https://samples.clarifai.com/face-det.jpg
    this.setState({imageUrl:this.state.input});
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) => {
        $this.setState({
          box : response.outputs[0].data.regions.map((box)=>{
            return box.region_info.bounding_box;
          })
        }, ()=>{console.log($this.state.box)});
      })
    .catch((err) => {console.log(err);$this.setState({box:[defaultBox]});});
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleConfig}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkFrom onInputChanged={this.onInputChanged} onButtonDetect={this.onButtonDetect}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  } 
}

export default App;

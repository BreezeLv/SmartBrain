import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './Components/Signin';
import Register from './Components/Register';

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
      box : [defaultBox],
      route : "signin",
      profile : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  componentDidMount() {
    //api test
    // fetch('http://localhost:3000/')
    // .then(res=>res.json())
    // .then(console.log);
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

  onRouteChange = (value) => {
    this.setState({route:value});
  }

  loadUserProfile = (user) => {
    this.setState({profile:{
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }}, ()=>{console.log(this.state.profile)});
  }
  
  render() {
    let page = (<Signin onRouteChange={this.onRouteChange} loadUserProfile={this.loadUserProfile}/>);
    switch(this.state.route) {
      case "register":
        page = <Register onRouteChange={this.onRouteChange} loadUserProfile={this.loadUserProfile}/>;
        break;
      case "login":
        page = (<div>
                  <Navigation onRouteChange={this.onRouteChange}/>
                  <Logo />
                  <Rank name={this.state.profile.name} entries={this.state.profile.entries}/>
                  <ImageLinkFrom onInputChanged={this.onInputChanged} onButtonDetect={this.onButtonDetect}/>
                  <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
                </div>);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Particles className='particles' params={particleConfig}/>
        {page}
      </div>
    );
  } 
}

export default App;

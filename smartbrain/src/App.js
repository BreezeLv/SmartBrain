import React from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkFrom from './Components/ImageLinkFrom/ImageLinkFrom';
import Rank from './Components/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
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

const defaultBox = {top_row:0,bottom_row:0,left_col:0,right_col:0};
const defaultProfile = {id: '',name: '',email: '',entries: 0,joined: ''};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input : "",
      imageUrl : "",
      box : [defaultBox],
      route : "signin",
      profile : defaultProfile
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
    fetch("http://localhost:3000/detect",{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input : this.state.input
      })
    })
    .then(res=>res.json())
    .then((response) => {
      // console.log(response);
      if(response&&response.status.code===10000) { //response&&response.outputs[0].data
        fetch("http://localhost:3000/image",{
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id : this.state.profile.id
          })
        })
        .then((res) => res.json())
        .then((data) => {this.setState(Object.assign(this.state.profile,{entries:data}))})
      }
      $this.setState({
        box : response.outputs[0].data.regions.map((box)=>{
          return box.region_info.bounding_box;
        })
      }, ()=>{console.log($this.state.box)});
    })
    .catch((err) => {console.log(err);$this.setState({box:[defaultBox]});});
  }

  onRouteChange = (value) => {
    if(value==='signin') {
      //clear the cache
      this.setState({input:"",imageUrl:"",box:[defaultBox],profile:defaultProfile});
    }
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

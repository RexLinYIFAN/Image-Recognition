import React, { Component } from 'react';
import Navigation from './Navigation/navigation.js';
import Logo from './Logo/logo.js';
import Rank from './Rank/rank.js';
import ImageLink from './ImageLink/imageLink.js';
import Particles from 'react-particles-js';
import FaceRecognition from './FaceRecognition/facerecognition.js';
import './app.css';
import Clarifai from 'clarifai';
import SignInForm from './SignInForm/signInForm.js';
import Register from './Register/Register.js';

const appC = new Clarifai.App({
 apiKey: 'e5e349b9530244b682e4827ba7bd312d'
});
const paramsOption={
  particles: {
    number:{
      value:80,
      density:{
        enable:true,
        value_area:900
      }
    }
  },  
  interactivity:{
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
        "resize": true
      }         
  }
} 

class App extends Component {
  constructor(){
    super()
    this.state={
      input:"",
      imageUrl:'',
      faceBox:'',
      route:'Signin',
      isSignedin:false
    }
  }

  inputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  onSubmit=()=>{
    this.setState({imageUrl:this.state.input})
/*https://i.pinimg.com/originals/97/e4/2a/97e42a82fc7911961d3ca55f54d1372c.jpg*/
    appC.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then((response)=>this.displayBox(this.calBoundingBox(response))
    .catch(err=>console.log(err))
    )
  }

  calBoundingBox=(data)=>{
    const face_box=data.outputs[0].data.regions[0].region_info.bounding_box;
    const input_image=document.getElementById("imageDisplay");
    const image_height=Number(input_image.height)
    const image_width=Number(input_image.width)
    return {
      topRow:image_height*face_box.top_row,
      bottomRow:image_height-(image_height*face_box.bottom_row),
      leftCol:image_width*face_box.left_col,
      rightCol:image_width-(image_width*face_box.right_col)
    }
  }

  displayBox=(faceBox)=>{
    console.log(faceBox)
    this.setState({faceBox:faceBox})
  }

  onRouteChange=(route)=>{
    if(route==='Signout'){
      this.setState({isSignedin:false})
    }else{
      this.setState({isSignedin:true})
    }
    this.setState({route:route})
  }

  render() {
    return (
      <div>
        <Particles className="particles" params={paramsOption}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedin={this.state.isSignedin}/>
        {this.state.route==='Home'?
        <div>
          <Logo/>
          <Rank/>
          <ImageLink 
          inputChange={this.inputChange}
          onSubmit={this.onSubmit}
          />
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.faceBox} />
        </div>:
        (this.state.route==='Register'?
        <Register onRouteChange={this.onRouteChange}/>:
        <SignInForm onRouteChange={this.onRouteChange}/>
        )

        
      }      
      </div>
    );
  }
}

export default App;

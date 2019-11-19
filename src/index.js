//Redux
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
keyCode: 81,
keyTrigger: 'Q',
id: 'Chord-1',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
keyCode: 87,
keyTrigger: 'W',
id: 'Chord-2',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
keyCode: 69,
keyTrigger: 'E',
id: 'Chord-3',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
keyCode: 65,
keyTrigger: 'A',
id: 'Shaker',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
keyCode: 83,
keyTrigger: 'S',
id: 'Open-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
keyCode: 68,
keyTrigger: 'D',
id: 'Closed-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
keyCode: 90,
keyTrigger: 'Z',
id: 'Punchy-Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
keyCode: 88,
keyTrigger: 'X',
id: 'Side-Stick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
keyCode: 67,
keyTrigger: 'C',
id: 'Snare',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

const POWER = 'POWER';
const VOLUME = 'VOLUME';
const DISPLAY = 'DISPLAY';
const BANK = 'BANK';


const switchPower = (currentState) => {
  return {
    type: POWER,
    power: !currentState
  } 
};
const changeVolume = (newVolume) => {
return {
  type: VOLUME,
  volume: newVolume
} 
};
const updateDisplay = (newDisplay) => {
return {
  type: DISPLAY,
  display: newDisplay
} 
};
const switchBank = (currentBank) => {
return {
  type: BANK,
  bank: !currentBank
} 
};

const reducer = (state = {power: true, volume: 0.5, display:'FCC Drum Machine', bank: true}, action) => {
switch(action.type){
 case POWER:
   return Object.assign({}, state, {power: action.power});
 case VOLUME:
   return Object.assign({}, state, {volume: action.volume});
 case DISPLAY:
   return Object.assign({}, state, {display: action.display});
 case BANK:
   return Object.assign({}, state, {bank: action.bank});
 default:
   return state;
}
};
const store = createStore(reducer);



//React
class DrumPad extends Component{
constructor(props){
  super(props);
  this.playSound = this.playSound.bind(this);
  this.updateDisplay = this.updateDisplay.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);
}
componentDidMount() {
  document.addEventListener('keydown', this.handleKeyPress);
}
componentWillUnMount() {
  document.removeEventListener('keydown', this.handleKeyPress);
}
playSound(e){
  let sound = document.getElementById(this.props.keyTrigger);
  sound.currentTime = 0;
  if(this.props.power){
    sound.play();
  }else{ return; }
}
updateDisplay(e){
  if(this.props.power){
    let display = document.getElementById('display');
    display.innerHTML=this.props.id;
  }
}
handleKeyPress(e){
  if(e.keyCode === this.props.keyCode){
    this.playSound(e);
    this.updateDisplay(e);
  }
}
render(){
   //Adjust the volume of all the clips in the padbank
  const clips = [].slice.call(document.getElementsByClassName("clip"));
  clips.forEach( clip => {clip.volume = this.props.volume} );
  return (
    <div 
      className="drum-pad"
      id={this.props.id}
      style={this.props.style}
      onClick={(e) => { this.playSound(e); this.updateDisplay(e);} }>
      <p>{this.props.keyTrigger}</p>
      <audio className="clip"
        id={this.props.keyTrigger}
        src={this.props.url}></audio>
    </div>
  )
}
}
class PadBank extends Component{
constructor(props){
  super(props);
}
render(){
  let padbank;
  this.props.power ?
    this.props.bank ?
      padbank = bankOne.map((i) =>{
        return (
          <DrumPad 
            url={i.url}
            id={i.id}
            keyTrigger={i.keyTrigger}
            keyCode={i.keyCode}
            style={Object.assign({},this.props.bankOneStyle,{color: 'rgb(0,255,200)'})}/>
        )
      }) :
      padbank = bankTwo.map((i) =>{
        return (
          <DrumPad 
            url={i.url}
            id={i.id}
            keyTrigger={i.keyTrigger}
            keyCode={i.keyCode}
            style={Object.assign({},this.props.bankTwoStyle,{color: 'rgb(0,200,255)'})}/>
        )
      }) :
    padbank = bankTwo.map((i) =>{
        return (
          <DrumPad 
            url={i.url}
            id={i.id}
            keyTrigger={i.keyTrigger}
            keyCode={i.keyCode}
            style={this.props.inactiveStyle}/>
        )
    });
  
  return(
    <div id="padbank" style={this.props.themeStyle}>
      {padbank}
    </div>
  )
}
}
class App extends Component{
constructor(props){
  super(props);
  this.handlePower = this.handlePower.bind(this);
  this.handleVolume = this.handleVolume.bind(this);
  this.handleBank = this.handleBank.bind(this);
}
handlePower(e){
  this.props.switchPower(this.props.power);
}
handleVolume(e){
  this.props.changeVolume(e.target.value);
}
handleBank(e){
  this.props.switchBank(this.props.bank);
}
render() {
  let inactiveStyle = {
    textShadow: '0px 0px 5px rgba(100,100,100,1)',
    boxShadow: '0px 0px 5px rgba(100,100,100,1)',
  };
  let bankOneStyle = {
    textShadow: '0px 0px 5px rgba(0,255,200,1)',
    boxShadow: '0px 0px 5px rgba(0,255,200,1)',
  };
  let bankTwoStyle = {
    textShadow: '0px 0px 5px rgba(0,200,255,1)',
    boxShadow: '0px 0px 5px rgba(0,200,255,1)',
  };
  
  let themeStyle = this.props.power ?
      this.props.bank ?
        bankOneStyle : bankTwoStyle :
      inactiveStyle;
  let displayStyle = this.props.power ?
      this.props.bank ?
        {background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(0,255,200,0.1), rgba(0,0,0,0) )'}:
        {background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(0,200,255,0.1), rgba(0,0,0,0) )'}:
      {background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(100,100,100,0.1), rgba(0,0,0,0) )'};
  let bankStyle = this.props.bank ?
      {justifyContent: 'flex-start'} :
      {justifyContent: 'flex-end'};
  let bankSwitchStyle = this.props.power ?
      this.props.bank ?
        {backgroundColor: 'rgb(0,255,200)'}:
        {backgroundColor: 'rgb(0,200,255)'}:
      {backgroundColor: 'rgb(100,100,100)'};
  return (
    <div id="app" style={themeStyle}>
      <div id="controls-container" style={themeStyle}>
        
        <div id="header">
          <i id="logo" class="fas fa-cogs" style={Object.assign({},themeStyle,{boxShadow: 'none'})}></i>
          <div className="control">
            <i id="power-button"
              class="fas fa-power-off"
              onClick={this.handlePower}
              style={themeStyle}></i>
          </div>
        </div>
        <div className="control"
          id="display"
          style={Object.assign({},themeStyle,{boxShadow: 'none'}, displayStyle)}
          >{this.props.display}</div>
        <div className="control" id="volume-slider" style={Object.assign({}, themeStyle, {boxShadow: 'none'})}>
          <div>Volume: </div>
          <input className="slider" type="range" min="0" max="1" step="0.01" 
            value={this.props.volume} 
            onChange={this.handleVolume} 
            style={themeStyle}/>
        </div>
        <div className="control" id="bank-select" style={Object.assign({}, themeStyle, {boxShadow: 'none'})}>
          <div>Bank: </div>
          <div id="bank-button" onClick={this.handleBank} style={Object.assign({}, bankStyle, themeStyle)}>
            <div id="bank-switch" style={bankSwitchStyle}/>
          </div>
        </div>
      </div>
      <PadBank power={this.props.power} bank={this.props.bank} 
        themeStyle={themeStyle}
        inactiveStyle={inactiveStyle}
        bankOneStyle={bankOneStyle}
        bankTwoStyle={bankTwoStyle}/>
    </div>
  );
}
}

//React-Redux
const mapStateToProps = (state) => {
return {
  power: state.power,
  volume: state.volume,
  display: state.display,
  bank: state.bank
}
};
const mapDispatchToProps = (dispatch) => {
return {
  switchPower: (currentState) => {
    dispatch(switchPower(currentState));
  },
  changeVolume: (newVolume) => {
    dispatch(changeVolume(newVolume));
  },
  updateDisplay: (newDisplay) => {
    dispatch(updateDisplay(newDisplay));
  },
  switchBank: (currentBank) => {
    dispatch(switchBank(currentBank));   
  }
}
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
DrumPad = connect(mapStateToProps, mapDispatchToProps)(DrumPad);

//ReactDOM render of components
render(
<Provider store={store}>
  <Container/>
</Provider> , document.getElementById('drum-machine')
);
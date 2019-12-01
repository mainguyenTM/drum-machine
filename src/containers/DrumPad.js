import React, { Component } from 'react';
import { connect } from 'react-redux';

class DrumPad extends Component{
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    playSound = (e) => {
      let sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      if(this.props.power){
        sound.play();
      }else{ return; }
    }
    updateDisplay = (e) => {
      if(this.props.power){
        let display = document.getElementById('display');
        display.innerHTML = this.props.id;
      }
    }
    handleKeyPress = (e) => {
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
     /*  updateDisplay: (newDisplay) => {
        dispatch(updateDisplay(newDisplay));
      } */
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrumPad);
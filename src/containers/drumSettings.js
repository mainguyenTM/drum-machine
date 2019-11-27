import React, { Component } from 'react';
import { connect } from 'react-redux';
import PadBank from '../components/PadBank';
import { switchPower, changeVolume, updateDisplay, switchBank } from '../actions/actions';

class App extends Component{
    constructor(props){
      super(props);
      //this.handlePower = this.handlePower.bind(this);
      this.handleVolume = this.handleVolume.bind(this);
      this.handleBank = this.handleBank.bind(this);
    }
    handlePower = (e) => {
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
              <i id="logo" className="fas fa-cogs" style={Object.assign({},themeStyle,{boxShadow: 'none'})}></i>
              <div className="control">
                <i id="power-button"
                  className="fas fa-power-off"
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
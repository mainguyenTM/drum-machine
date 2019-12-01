import React, { Component } from 'react';
import { connect } from 'react-redux';
import PadBank from './PadBank';
import { changeVolume, updateDisplay, switchBank } from '../actions/actions';
import Power from '../containers/Power';
import Volume from '../containers/Volume';
import Bank from '../containers/Bank';

class App extends Component{
    /* handleBank = (e) => {
      this.props.switchBank(this.props.bank);
    } */
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
      return (
        <div id="app" style={themeStyle}>
          <div id="controls-container" style={themeStyle}>
            <div id="header">
              <i id="logo" className="fas fa-cogs" style={Object.assign({},themeStyle,{boxShadow: 'none'})}></i>
              <Power themeStyle={themeStyle}></Power>
            </div>
            <div className="control"
              id="display"
              style={Object.assign({},themeStyle,{boxShadow: 'none'}, displayStyle)}
              >{this.props.display}</div>
            <Volume themeStyle={themeStyle}></Volume>
            <Bank themeStyle={themeStyle}></Bank>
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
      /* switchPower: (currentState) => {
        dispatch(switchPower(currentState));
      }, */
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
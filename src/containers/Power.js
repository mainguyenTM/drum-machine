import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchPower } from '../actions/actions';

class Power extends Component {
    /* constructor(props){
        super(props);
    } */
    switchPower = () => {
        this.props.switchPower(this.props.power);
    }
    render(){
        return (
            <div className="control">
                <i id="power-button" className="fas fa-power-off" onClick={this.switchPower} style={this.props.themeStyle}></i>
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

const mapDispatchToProps = {
    switchPower: switchPower
}

export default connect(
    mapStateToProps,
    mapDispatchToProps      
)(Power)
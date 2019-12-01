import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchBank } from '../actions/actions';

class Bank extends Component {
    switchBank = (e) => {
        this.props.switchBank(this.props.bank);
    }

    render(){
        let bankSwitchStyle = this.props.power ?
          this.props.bank ?
            {backgroundColor: 'rgb(0,255,200)'}:
            {backgroundColor: 'rgb(0,200,255)'}:
          {backgroundColor: 'rgb(100,100,100)'};
        let bankStyle = this.props.bank ?
          {justifyContent: 'flex-start'} :
          {justifyContent: 'flex-end'};
        return(
            <div className="control" id="bank-select" style={Object.assign({}, this.props.themeStyle, {boxShadow: 'none'})}>
                <div>Bank: </div>
                <div id="bank-button" onClick={this.switchBank} style={Object.assign({}, bankStyle, this.props.themeStyle)}>
                    <div id="bank-switch" style={bankSwitchStyle}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentBank: state.currentBank,
        bank: state.bank
    }
}

const mapDispatchToProps = {
    switchBank: switchBank
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bank)

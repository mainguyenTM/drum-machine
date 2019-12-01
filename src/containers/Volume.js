import React, {Component} from 'react';
import { connect } from 'react-redux';
import { changeVolume } from '../actions/actions';

class Volume extends Component {
    changeVolume = (e) => {
        this.props.changeVolume(e.target.value);
    }

    render(){
        return (
            <div className="control" id="volume-slider" style={Object.assign({}, this.props.themeStyle, {boxShadow: 'none'})}>
                <div>Volume: </div>
                <input className="slider" type="range" min="0" max="1" step="0.01" 
                value={this.props.volume} 
                onChange={this.changeVolume} 
                style={this.props.themeStyle}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        volume: state.volume
    }
}

const mapDispatchToProps = {
    changeVolume: changeVolume
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Volume);
import React from 'react';

class Form extends React.Component {
    state = {
        songName: '',
        artistName: ''
    }


    render() {
        return (
            <form>
                <input placeholder='songName' 
                value={this.state.songName} 
                onChange={e => this.setState({ songName: e.target.value})}>
                </input>
                <input placeholder='artistName' 
                value={this.state.artistName} 
                onChange={e => this.setState({ artistName: e.target.value})}>
                </input>
            </form>
        );
    }
};

export default Form;
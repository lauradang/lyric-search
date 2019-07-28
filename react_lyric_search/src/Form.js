import React from 'react';

const API_ROOT = "https://lyric-api.herokuapp.com/api/find/";

class Form extends React.Component {

    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }

    onFormSubmit(event) {
        event.preventDefault();
        const song = event.target.songName.value;
        const artist = event.target.artistName.value;
        
        const url = API_ROOT + artist + "/" + song;
        
        fetch(url)
        .then(response => response.json())
        .then(responseJson => { 
            console.log(responseJson)
        })
    };

      render() {
        return (
            <form onSubmit={ this.onFormSubmit }>
                Song: 
                <input type="text" id="song" name="songName" />
                <br/>
                Artist: 
                <input type="text" id="artist" name="artistName" />
                <br/>
                <button type="submit">
                    Search
                </button>
            </form>
        );
    }
};

export default Form;
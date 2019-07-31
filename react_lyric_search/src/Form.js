import React from 'react';
import TopSongs from './TopSongs';

const HEROKU_API_ROOT = "https://lyric-api.herokuapp.com/api/find/";
const YOUTUBE_API_ROOT = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=";
const MUSIX_API_ROOT = "https://api.musixmatch.com/ws/1.1/"

const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            lyrics: [],
            errorOccurred: false,
            video: [],
            topSongs: [],
            artistName: '',
            relatedArtists: [],
            artistID: []
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    
    onFormSubmit(event) {
        event.preventDefault();

        // Get lyrics
        const song = event.target.songName.value;
        const artist = event.target.artistName.value;
        const url = HEROKU_API_ROOT + artist + "/" + song;

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            isLoaded: true,
            lyrics:responseJson,
            artistName:artist,
            errorOccurred: false
        }))
        .catch(error => this.setState({ errorOccurred: true }));


        // Get Youtube Video
        const YOUTUBE_API_URL = YOUTUBE_API_ROOT + song + artist + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY;

        fetch(YOUTUBE_API_URL)
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            isLoaded: true,
            video: "https://www.youtube.com/embed/" + responseJson['items'][0]['id']['videoId'],
            artistName:artist
        }))
        .catch(error => this.setState({ errorOccurred: true }));

        // Get top 10 songs from artist
        const MUSIX_API_URL = MUSIX_API_ROOT + "track.search?q_artist=" + artist + "&page_size=10&page=1&s_track_rating=desc&apikey=" + process.env.REACT_APP_MUSIX_API_KEY;
    
        fetch(proxyurl + MUSIX_API_URL)
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            isLoaded: true,
            topSongs: responseJson['message']['body']['track_list'],
            artistName:artist
        }))
        .catch(error => this.setState({ error, errorOccurred: true }))
        
        // Get related artists
        // const MUSIX_API_URL_RELATED = MUSIX_API_ROOT + "artist.related.get?artist_id=" + artistID + "&page_size=2&page=1&apikey=" + MUSIX_API_KEY;
        
        // // Get artistid
        // const MUSIX_API_URL_ARTISTID = MUSIX_API_ROOT + "artist.search?q_artist=" + artist + "&page_size=5&apikey=" + MUSIX_API_KEY;
        // fetch(proxyurl + MUSIX_API_URL_ARTISTID)
        // .then((response) => response.json())
        // .then((responseJson) => this.setState({
        //     artistID:responseJson['message']['body']['artist_list']['0']['artist']['artist_id']
        // }));

        // console.log(MUSIX_API_URL_RELATED)
        // fetch(proxyurl + MUSIX_API_URL_RELATED)
        // .then((response) => response.json())
        // .then((responseJson) => this.setState({
        //     isLoaded: true,
        //     relatedArtists: responseJson['message']['body']['artist_list'],
        // }));
    };
    
      render() {
        var {isLoaded, lyrics, video, topSongs, artistName, artistID, relatedArtists, errorOccurred} = this.state;
        console.log(this.state)

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        
        if (errorOccurred || lyrics.lyric == "") {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <br/>
                    <br/>

                    <div className="gridContainer">
                        <div className="search">
                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search a song"
                            type="text" 
                            id="song" 
                            name="songName" />

                            <br/>
                            <br/>

                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search an artist"
                            type="text" 
                            id="artist" 
                            name="artistName" />

                            <br/>
                            <br/>

                            <button type="submit" style={{ fontWeight: '900', color: '#fff', fontSize:'100%', padding:'10px', borderRadius: '280px', fontFamily:"Verdana", backgroundColor: '#333'}}>
                                Search
                            </button>
                            <br/>
                            <br/>
                        </div>

                        <div className="error">
                            Couldn't find a match. Try a different spelling or a different song.
                            <br/>
                        </div>
                    </div>
                </form>
            );
        }

        if (isLoaded) {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <br/>
                    <br/>

                    <div className="gridContainer">
                        <div className="search">

                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search a song"
                            type="text" 
                            id="song" 
                            name="songName" />

                            <br/>
                            <br/>

                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search an artist"
                            type="text" 
                            id="artist" 
                            name="artistName" />

                            <br/>
                            <br/>

                            <button type="submit" style={{ fontWeight: '900', color: '#fff', fontSize:'100%', padding:'10px', borderRadius: '280px', fontFamily:'Verdana', backgroundColor: '#333'}}>
                                Search
                            </button>
                        </div>

                        <div className="lyrics">
                            <pre style={{ fontFamily:'Verdana', fontSize: '150%', textAlign:'left'}}> 
                                {lyrics.lyric} 
                            </pre>
                        </div>

                        <div className="youtube">
                            <div>
                                <figure>
                                    <iframe align="left" width="560" height="315" src={video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </figure>
                            </div>
                        </div>

                        <div className="topsongs">
                            <ul>
                                <h1 style={{textAlign:'center'}}>Top 10 Tracks from {toTitleCase(artistName)}</h1>
                                {topSongs.map(function(topSongs, index){
                                    return (
                                        <div style={{textAlign:'left', fontSize:"25px"}}>
                                            <a  
                                            key={ index } 
                                            href={topSongs['track']['track_share_url']}>
                                            </a>
                                            <strong>{index+1}. </strong> 
                                            {topSongs['track']['track_name']}
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </ul>    
                        </div> 

                        <div>
                            <TopSongs />
                        </div>     
                        
                    </div>
                </form>
            )
        }
        
        else {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <br/>
                    <br/>

                    <div className="gridContainer">
                        <div className="search">
                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search a song"
                            type="text" 
                            id="song" 
                            name="songName" />

                            <br/>
                            <br/>

                            <input 
                            style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                            placeholder="   Search an artist"
                            type="text" 
                            id="artist" 
                            name="artistName" />

                            <br/>
                            <br/>

                            <button type="submit" style={{ fontWeight: '900', color: '#fff', fontSize:'100%', padding:'10px', borderRadius: '280px', fontFamily:"Verdana", backgroundColor: '#333'}}>
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            );
        }
    }
};

export default Form;
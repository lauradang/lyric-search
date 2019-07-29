import React from 'react';

const HEROKU_API_ROOT = "https://lyric-api.herokuapp.com/api/find/";
const YOUTUBE_API_ROOT = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=";
const MUSIX_API_ROOT = "https://api.musixmatch.com/ws/1.1/"

const YOUTUBE_API_KEY = "AIzaSyD9EPZHLNEQw5rlDLb_5pAoWlwQ21nm8Wg";
const MUSIX_API_KEY = "1a4f63c6598c1a054efd023cbbb825ff";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoaded: false,
            lyrics: [],
            video: [],
            topSongs: [],
            artistName: '',
            relatedArtists: [],
            artistID: ''
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
            artistName:artist
        }));

        // Get Youtube Video
        const YOUTUBE_API_URL = YOUTUBE_API_ROOT + song + artist + "&key=" + YOUTUBE_API_KEY;
        console.log(YOUTUBE_API_URL)
        fetch(YOUTUBE_API_URL)
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            isLoaded: true,
            video: "https://www.youtube.com/embed/" + responseJson['items'][0]['id']['videoId'],
            artistName:artist
        }));

        // Get top 10 songs from artist
        const MUSIX_API_URL = MUSIX_API_ROOT + "track.search?q_artist=" + artist + "&page_size=10&page=1&s_track_rating=desc&apikey=" + MUSIX_API_KEY;
    
        fetch(proxyurl + MUSIX_API_URL)
        .then((response) => response.json())
        .then((responseJson) => this.setState({
            isLoaded: true,
            topSongs: responseJson['message']['body']['track_list'],
            artistName:artist
        }));
        
        // // Get artistid
        // const MUSIX_API_URL_ARTISTID = MUSIX_API_ROOT + "artist.search?q_artist=" + artist + "&page_size=5&apikey=" + MUSIX_API_KEY;
        // console.log(MUSIX_API_URL_ARTISTID)

        // fetch(proxyurl + MUSIX_API_URL_ARTISTID)
        // .then((response) => response.json())
        // .then((responseJson) => this.setState({
        //     artistID: responseJson['message']['body']['artist_list']['0']['artist']['artist_id']
        // }));
        
        // var {artistID} = this.state;
        // console.log(this.state)

        // // Get related artists
        // const MUSIX_API_URL_RELATED = MUSIX_API_ROOT + "artist.related.get?artist_id=" + {artistID} + "&page_size=2&page=1&apikey=" + MUSIX_API_KEY;
        
        // console.log(MUSIX_API_URL_RELATED)
        // fetch(proxyurl + MUSIX_API_URL_RELATED)
        // .then((response) => response.json())
        // .then((responseJson) => this.setState({
        //     isLoaded: true,
        //     relatedArtists: responseJson['message']['body']['artist_list'],
        //     artistName:artist
        // }));
    };
    
      render() {
        var {isLoaded, lyrics, video, topSongs, artistName, relatedArtists} = this.state;
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        
        if (isLoaded) {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <br/>
                    <br/>

                    <input 
                    style={{width: '50%', height: '30px', fontSize: '110%', padding:'8px', borderRadius: '25px'}}
                    placeholder="Search a song"
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

                    <div class="row" style={{display: 'flex'}}>
                        <div class="column" style={{ flex: '50%', padding:"50px"}}>
                            <pre style={{ fontFamily:'Geneva', fontSize: '150%', textAlign:'right'}}> 
                                {lyrics.lyric} 
                            </pre>
                        </div>
                        <div class="column" style={{ flex: '50%', padding:"50px"}}>
                            <br/>
                            <div>
                                <figure>
                                    <iframe align="left" width="560" height="315" src={video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <figcaption></figcaption>
                                </figure>
                            </div>
                            <ul>
                                <br/>
                                <h1 style={{textAlign:'left'}}>Top 10 Tracks from {toTitleCase(artistName)}</h1>
                                {topSongs.map(function(topSongs, index){
                                    return (
                                        <div style={{textAlign:'left', fontSize:"25px"}}>
                                            <a  
                                            key={ index } 
                                            href={topSongs['track']['track_share_url']}>
                                            {index+1}. {topSongs['track']['track_name']}
                                            </a>
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </ul>
                            {/* <ul>
                                <br/>
                                <h1 style={{textAlign:'left'}}>Top 10 Related Artists to {toTitleCase(artistName)}</h1>
                                {relatedArtists.map(function(relatedArtists, index){
                                    return (
                                        <div style={{textAlign:'left', fontSize:"25px"}}>
                                            <p key={ index }>
                                            {index+1}. {relatedArtists['artist']['artist_name']}
                                            </p>
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </ul> */}
                        </div>
                    </div>
                        
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </form>
            )
        }
        
        else {
            return (
                <form onSubmit={ this.onFormSubmit }>
                    <br/>
                    <br/>

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
                </form>
            );
        }
    }
};


export default Form;
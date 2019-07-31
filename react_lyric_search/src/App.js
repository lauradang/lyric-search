import React from 'react';
import './App.css';
import Form from './Form';
import Header from './components/layout/Header';

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <link rel="shortcut icon" href="images/musicnote.png"/>
        <div>
          { process.env.REACT_APP_YOUTUBE_API_KEY }
        </div>
        <Header />
        <Form />
      </div>
    );
  } 
}

export default App;
import React from 'react';
import './App.css';
import Form from './Form';
import Header from './components/layout/Header';

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <link rel="shortcut icon" href="images/musicnote.png"/>
        <Header />
        <Form />
      </div>
    );
  } 
}

export default App;
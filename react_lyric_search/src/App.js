import React from 'react';
import './App.css';
import Form from './Form';
import Header from './components/layout/Header';

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <Header />
        <Form />
      </div>
    );
  } 
}

export default App;
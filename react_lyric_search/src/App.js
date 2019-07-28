import React from 'react';
import './App.css';
import Form from './Form';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Form onSubmit={ this.onFormSubmit }/>
      </div>
    );
  } 
}

export default App;
import React from 'react';

function Header() {
    return (
        <header style={headerStyle}>
            <h1 className="inline">LyricSearch</h1>
            <img className="center scaled inline" src={require('./bmo.gif')} alt="loading..." />
        </header>
    )
}

const headerStyle = {
    background:'#333',
    color:'#fff',
    textAlign:'center',
    padding:'5px',
    fontFamily:'Arial'
}
 
export default Header;
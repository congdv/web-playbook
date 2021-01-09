import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import logo from './webpack-logo.svg'

const App = () => {
  return (<div className='app'>This a set up for React App by Webpack<div><img src={logo} alt='webpack'/></div></div>)
}

ReactDOM.render(<App />,document.getElementById('root'));
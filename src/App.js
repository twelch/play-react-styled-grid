import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import logo from './logo.svg';
import './App.css';

const AppWrapper = styled.div`
  text-align: center;
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const AppLogo = styled.img`
  animation: ${rotate360} infinite 20s linear;
  height: 40vmin;
`
const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const AppIntro = styled.p`
  font-size: large;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <AppHeader>
          <AppLogo src={logo} alt="logo" />
          <AppIntro>
            Edit <code>src/App.js</code> and save to reload.
          </AppIntro>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </AppHeader>
      </AppWrapper>
    );
  }
}

export default App;

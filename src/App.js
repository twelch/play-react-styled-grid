import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { BaseStyle } from './BaseStyle'
import mapboxgl from 'mapbox-gl'
import logo from './logo.svg';
import 'mapbox-gl/dist/mapbox-gl.css'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const Header = styled.div`
  grid-column: span 12;
  height: 2rem;
  display: flex;  
`

const Logo = styled.div`
  background-color: black;
  width: 50px;
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
  height: 2rem;
`

const Search = styled.div`
  flex-grow: 1;
  background-color: #eee;
`

const Profile = styled.div`
  width: 200px;
  background-color: #ddd;
`

const NavigationMenu = styled.div`
  grid-column: span 1;
  height: calc(100vh - 2rem);
  background-color: #ccc;
  &:hover {
    grid-column: span 2;
    transition: 0.5s;
  }
`

const MainContent = styled.div`
  grid-column: span 11;
  height: calc(100vh - 2rem);
`

const Map = styled.div`
  height: 100%;
  width: 100%;
`

class App extends Component {
  componentDidMount () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFjdW5hLW1hcGJveCIsImEiOiJjanBva3A0cjEwZXdkNDJydW91Ym82aGpyIn0.Qh-ak-vPBz7EL3ngRdNRZQ'

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    })
  }

  render() {
    return (
      <React.Fragment>
        <Normalize />
        <BaseStyle />
        <Container>
          <Header>
            <Logo>
              <AppLogo src={logo} alt="logo" />
            </Logo>
            <Search>Search</Search>
            <Profile>Profile</Profile>
          </Header>
          <NavigationMenu>
            Menu
          </NavigationMenu>
          <MainContent>
            <Map id='map'></Map>
          </MainContent>
        </Container>        
      </React.Fragment>      
    );
  }
}

export default App;

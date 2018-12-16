import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components/macro'
import { Normalize } from 'styled-normalize'
import { BaseStyle } from './BaseStyle'
import mapboxgl from 'mapbox-gl'
import logo from './logo.svg';
import 'mapbox-gl/dist/mapbox-gl.css'

export const theme = {
  primary: '#6e27c5'
}

const headerHeight = '2.5rem'
const sidebarWidth = '160px'

const OneColLayout = styled.div`
  display: grid;
  grid-template:
    [row1-start] "header" ${headerHeight} [row1-end]
    [row2-start] "content" auto [row2-end]
    / auto;
`

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #efefef;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  width: ${sidebarWidth};
  color: white;
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
  display: flex;
  align-items: center;
  background-color: #eee;
`

const SearchBar = styled.div`
  flex-grow: 1;
  padding: 3px;
  background-color: white;
`

const Profile = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  background-color: #ddd;
`

const ProfileBar = styled.div`
  flex-grow: 1;
  padding: 3px;
  background-color: #bbb;
`

const Content = styled.div`
  display: flex;
`

const NavigationMenu = styled.div`
  width: ${sidebarWidth};
  height: calc(100vh - ${headerHeight});
  background-color: #ccc;
  &:hover {
    grid-column: span 2;
    transition: 0.5s;
  }
`

const MainContent = styled.div`
  width: calc(100vw - ${sidebarWidth});
  height: calc(100vh - ${headerHeight});
`

const Map = styled.div`
  height: 100%;
  flex-grow: 1;
`

class App extends Component {
  componentDidMount() {
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
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Normalize />
          <BaseStyle />
          <OneColLayout>
            <Header>
              <Logo>
                <AppLogo src={logo} alt="logo" />
                My App
              </Logo>
              <Search>
                <SearchBar>
                  Search
                </SearchBar>
              </Search>
              <Profile>
                <ProfileBar>
                  Profile
                </ProfileBar>
              </Profile>
            </Header>
            <Content>
              <NavigationMenu>
                Menu
              </NavigationMenu>
              <MainContent>
                <Map id='map'></Map>
              </MainContent>
            </Content>
          </OneColLayout>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;

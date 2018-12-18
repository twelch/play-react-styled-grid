import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import { BaseStyle } from './BaseStyle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PinDropIcon from '@material-ui/icons/PinDrop';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashIcon from '@material-ui/icons/Dashboard';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import yellow from '@material-ui/core/colors/yellow';

import mapboxgl from 'mapbox-gl';
import logo from './logo.svg';
import 'mapbox-gl/dist/mapbox-gl.css';

// Start with MUI dark theme as base
const muiTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: { useNextVariants: true }
});

// Change JSS injection order so that styled-components wins, and can be used to override MUI components
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // Custom insertion point, see index.html head placement
  insertionPoint: document.getElementById('jss-insertion-point')
});

const headerHeight = '48px';
const sidebarWidth = '180px';

const OneColLayout = styled.div`
  display: grid;
  grid-template:
    [row1-start] 'header' ${headerHeight} [row1-end]
    [row2-start] 'content' auto [row2-end]
    / auto;
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #efefef;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  width: ${sidebarWidth};
  color: white;
`;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppLogo = styled.img`
  animation: ${rotate360} infinite 20s linear;
  height: 2rem;
`;

const Search = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #eee;
`;

const SearchBar = styled.div`
  flex-grow: 1;
  padding: 3px;
  background-color: white;
`;

const Profile = styled.div`
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  padding: 10px 5px;
`;

const ProfileName = styled.div`
  padding-right: 20px;
`;

const ProfileAvatar = styled(Avatar)`
  background-color: ${yellow[500]};
`;

const Content = styled.div`
  display: flex;
`;

const NavigationMenu = styled.div`
  width: ${sidebarWidth};
  height: calc(100vh - ${headerHeight});
  background-color: ${props => props.theme.palette.background.default};
  &:hover {
    grid-column: span 2;
    transition: 0.5s;
  }
`;

const MainContent = styled.div`
  width: calc(100vw - ${sidebarWidth});
  height: calc(100vh - ${headerHeight});
`;

const StyledDash = styled.div`
  height: 100%;
  flex-grow 1;
`;

const StyledReport = styled.div`
  height: 100%;
  flex-grow 1;
`;

const StyledMap = styled.div`
  height: 100%;
  flex-grow: 1;
`;

const DashView = props => {
  return <StyledDash>Dashboard</StyledDash>;
};

class MapView extends Component {
  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibGFjdW5hLW1hcGJveCIsImEiOiJjanBva3A0cjEwZXdkNDJydW91Ym82aGpyIn0.Qh-ak-vPBz7EL3ngRdNRZQ';

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }

  render() {
    return <StyledMap id="map" />;
  }
}

const ReportView = props => {
  return <StyledReport>Report panel</StyledReport>;
};

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <ThemeProvider theme={muiTheme}>
          {/* Pass muiTheme to styled-components for access */}
          <MuiThemeProvider theme={muiTheme}>
            <React.Fragment>
              <Normalize />
              <BaseStyle />
              <Router>
                <OneColLayout>
                  <Header>
                    <Logo>
                      <AppLogo src={logo} alt="logo" />
                      My App
                    </Logo>
                    <Search>
                      <SearchBar>Search</SearchBar>
                    </Search>
                    <Profile>
                      <ProfileName>Bob B.</ProfileName>
                      <ProfileAvatar alt="Bob B.">BB</ProfileAvatar>
                    </Profile>
                  </Header>
                  <Content>
                    <NavigationMenu>
                      <List>
                        <ListItem button key={'dash'} component={Link} to="/">
                          <ListItemIcon>
                            <DashIcon />
                          </ListItemIcon>
                          <ListItemText primary={'Dashboard'} />
                        </ListItem>
                        <ListItem button key={'map'} component={Link} to="/map">
                          <ListItemIcon>
                            <PinDropIcon />
                          </ListItemIcon>
                          <ListItemText primary={'Map View'} />
                        </ListItem>
                        <ListItem
                          button
                          key={'report'}
                          component={Link}
                          to="/report"
                        >
                          <ListItemIcon>
                            <BarChartIcon />
                          </ListItemIcon>
                          <ListItemText primary={'Reports'} />
                        </ListItem>
                      </List>
                    </NavigationMenu>
                    <MainContent>
                      <Route exact path="/" component={DashView} />
                      <Route exact path="/map" component={MapView} />
                      <Route exact path="/report" component={ReportView} />
                    </MainContent>
                  </Content>
                </OneColLayout>
              </Router>
            </React.Fragment>
          </MuiThemeProvider>
        </ThemeProvider>
      </JssProvider>
    );
  }
}

export default App;

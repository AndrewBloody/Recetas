/**
 * React Native App Recetas
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import {Image, StyleSheet} from 'react-native';
import {Container, Header, Body, Content, Icon} from 'native-base';

// import the different screens
import Loading from './screens/auth/Loading';
import SignUp from './screens/auth/SignUp';
import Login from './screens/auth/Login';
import Main from './screens/Main';
import User from './screens/auth/User';
import Recetas from './screens/recetas/Recetas';
import FormularioRecetas from './screens/recetas/FormularioRecetas';
import RecetasFavoritas from './screens/recetas/RecetasFavoritas';
import ListadoRecetas from './screens/recetas/ListadoRecetas';

// Stack Navigator
// const AppStack = createStackNavigator(
//   {
//     Home: Main,
//     Login: Login,
//     Other: SignUp,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4511e',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   },
// );

// // create our app's navigation drawer
// const App = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: Loading,
//       App: AppStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     },
//   ),
// );

class CustomDrawerContentComponent extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.handleLogOut = this.handleLogOut.bind(this);

  //   this.state = {
  //     // user: null,
  //   };
  // }

  // componentDidMount() {
  //   Promise.resolve(firebase.auth()).then(response => {
  //     if (response.email) {
  //       this.setState({currentUser: response});
  //     }
  //   });
  // }

  // handleLogOut() {
  //   const {navigation} = this.props;
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate('Login');
  //       this.setState({user: null});
  //     });
  // }

  render() {
    const drawerIcons = (routeKey, tintColor) => {
      const icons = {
        Home: (
          <Icon
            ios="ios-home"
            android="md-home"
            style={{tintColor: tintColor}}
          />
        ),
        User: (
          <Icon name="user" type="FontAwesome" style={{tintColor: tintColor}} />
        ),
        Recetas: (
          <Icon
            name="food-variant"
            type="MaterialCommunityIcons"
            style={{tintColor: tintColor}}
          />
        ),
      };
      return icons[routeKey];
    };
    return (
      <Container>
        <Header style={styles.headerDrawerComponent}>
          <Body>
            <Image
              style={styles.drawerImage}
              source={require('./assets/img/brain1.png')}
            />
          </Body>
        </Header>
        <Content>
          <DrawerNavigatorItems
            {...this.props}
            renderIcon={scene => drawerIcons(scene.route.key, scene.tintColor)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    left: 50,
  },
  headerDrawerComponent: {
    height: 200,
    backgroundColor: 'white',
  },
});

const RecetasStack = createStackNavigator(
  {
    Recetas: Recetas,
    ListadoRecetas: ListadoRecetas,
    CrearRecetas: FormularioRecetas,
    RecetasFavoritas: RecetasFavoritas,
  },
  {
    initialRouteName: 'Recetas',
  },
);

const AppStack = createDrawerNavigator(
  {
    Home: Main,
    User: User,
    Recetas: RecetasStack,
  },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Loading,
      App: AppStack,
      Login: Login,
      SignUp: SignUp,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default App;

/* ALAKASAM 2019 */

import React from 'react';
import firebase from 'react-native-firebase';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  Button as ButtonNative,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Button,
  Icon,
  Left,
  Body,
  Title,
} from 'native-base';

export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  static navigationOptions = {
    title: 'Login',
    drawerIcon: ({tintColor}) => (
      <Icon
        type="MaterialCommunityIcons"
        name="login"
        style={{tintColor: tintColor}}
      />
    ),
  };

  handleLogin = () => {
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Login</Text>
  //       {this.state.errorMessage && (
  //         <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
  //       )}
  //       <TextInput
  //         style={styles.textInput}
  //         autoCapitalize="none"
  //         placeholder="Email"
  //         onChangeText={email => this.setState({email})}
  //         value={this.state.email}
  //       />
  //       <TextInput
  //         secureTextEntry
  //         style={styles.textInput}
  //         autoCapitalize="none"
  //         placeholder="Password"
  //         onChangeText={password => this.setState({password})}
  //         value={this.state.password}
  //       />
  //       <Button title="Login" onPress={this.handleLogin} />
  //       <Button
  //         title="Don't have an account? Sign Up"
  //         onPress={() => this.props.navigation.navigate('SignUp')}
  //       />
  //     </View>
  //   );
  // }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                ios="ios-menu"
                android="md-menu"
                onPress={() => this.props.navigation.toggleDrawer()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Recetas</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <View>
            <ImageBackground
              source={require('../../assets/img/bg2.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.container}>
                <Text style={styles.titleLogin}> Ingresa </Text>
                <View style={styles.centerImg}>
                  <Image
                    style={styles.brainImage}
                    source={require('../../assets/img/brainname.png')}
                  />
                </View>
                <TextInput
                  style={styles.inputUser}
                  placeholder="Usuario"
                  onChangeText={email => this.setState({email})}
                  value={this.state.email}
                />
                <TextInput
                  style={styles.inputUser}
                  placeholder="Contraseña"
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                  // Making the Under line Transparent.
                  underlineColorAndroid="transparent"
                  // Making the Text Input Text Hidden.
                  secureTextEntry={true}
                />
                <ButtonNative title="Entrar" onPress={this.handleLogin} />
                <ButtonNative
                  title="No tienes cuenta, registrate"
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
              </View>
            </ImageBackground>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },

  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  inputUser: {
    height: 45,
    width: '95%',
    borderColor: '#34cceb',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },

  titleLogin: {
    fontSize: 40,
    marginTop: 10,
    textAlign: 'center',
    textShadowRadius: 10,
    letterSpacing: 5,
    // fontFamily: 'Intro-Inline',
    // fontFamily: 'Sarpanch-Black',
    // fontFamily: 'BungeeInline-Regular',
  },
  brainImage: {
    width: 85,
    height: 100,
  },
  centerImg: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

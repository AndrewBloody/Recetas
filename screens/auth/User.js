/* ALAKASAM 2019 */

import React, {Fragment} from 'react';
import firebase from 'react-native-firebase';

import {Text, Image, StyleSheet, Button as ButtonNative} from 'react-native';
import {Container, Body, Content, Card, CardItem} from 'native-base';

// Components
import {HeaderComponent} from '../components/Header';

export default class UserComponent extends React.Component {
  static navigationOptions = {
    title: 'Usuario',
    // drawerIcon: ({tintColor}) => (
    //   <Icon name="user" type="FontAwesome" style={{tintColor: tintColor}} />
    // ),
  };
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    Promise.resolve(firebase.auth()).then(response => {
      if (response.currentUser) {
        this.setState({user: response.currentUser});
      }
    });
  }

  handleLogOut() {
    const {navigation} = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        this.setState({user: null});
      });
  }

  render() {
    const {user} = this.state;
    console.log(this.props.navigation);
    return (
      <Container>
        <HeaderComponent navigation={this.props.navigation} />
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Image
                  source={require('../../assets/img/user.png')}
                  style={styles.image}
                />
                {user ? (
                  <Fragment>
                    <Text>{user.email}</Text>
                    <ButtonNative
                      title="Cerrar Sesión"
                      onPress={this.handleLogOut}
                    />
                  </Fragment>
                ) : null}
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 0,
  },
  image: {
    flex: 1,
    height: 200,
    width: 200,
  },
  buttonText: {
    color: '#87838B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

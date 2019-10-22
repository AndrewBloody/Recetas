/* ALAKASAM 2019 */

import React from 'react';
import firebase from 'react-native-firebase';

import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';

export class ListadoRecetas extends React.Component {
  static navigationOptions = {
    title: 'Listado',
  };

  constructor(props) {
    super(props);

    Promise.resolve(firebase.auth()).then(response => {
      if (response.currentUser) {
        this.ref = firebase
          .firestore()
          .collection('usuarios')
          .doc(response.currentUser.uid)
          .collection('recetas');
      }
    });

    this.state = {
      collection: {},
    };
  }

  componentDidMount() {
    this.ref.get().then(snaptshot => {
      if (!snaptshot.empty) {
        console.log(snaptshot);
        this.setState({collection: snaptshot});
      }
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text>Listado Recetas</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

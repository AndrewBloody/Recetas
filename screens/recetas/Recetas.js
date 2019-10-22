/* ALAKSAM 2019 */

import React from 'react';
import firebase from 'react-native-firebase';

import {Text, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Button,
  Header,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Body,
} from 'native-base';

export class Recetas extends React.Component {
  static navigationOptions = {
    title: 'Recetas',
    header: ({navigation}) => {
      return (
        <Header>
          <Button transparent>
            <Icon
              ios="ios-home"
              android="md-home"
              onPress={() => navigation.navigate('Home')}
            />
          </Button>
          <Button transparent>
            <Icon
              name="plus-outline"
              type="MaterialCommunityIcons"
              onPress={() => navigation.navigate('CrearRecetas')}
            />
          </Button>
          <Button transparent>
            <Icon
              name="heart-outline"
              type="MaterialCommunityIcons"
              onPress={() => navigation.navigate('RecetasFavoritas')}
            />
          </Button>
        </Header>
      );
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      recetas: [],
    };
  }

  componentDidMount() {
    Promise.resolve(firebase.auth()).then(response => {
      if (response.currentUser) {
        const recetasRef = firebase
          .firestore()
          .collection('usuarios')
          .doc(response.currentUser.uid)
          .collection('recetas');

        recetasRef.onSnapshot(snapshot => {
          const listadoRecetas = [];
          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              listadoRecetas.push(doc.data());
            });
            this.setState({recetas: listadoRecetas});
          }
        });
      }
    });
  }

  renderRecetas() {
    const {recetas} = this.state;

    return recetas.map(receta => (
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            source={
              receta.imagen_url
                ? {uri: receta.imagen_url}
                : require('../../assets/img/no_image_found.png')
            }
          />
        </Left>
        <Body>
          <Text>{receta.nombre}</Text>
          <Text note>Doing what you like will always keep you happy . .</Text>
        </Body>
        <Right>
          <Button transparent>
            <Text>View</Text>
          </Button>
        </Right>
      </ListItem>
    ));
  }

  render() {
    const {recetas} = this.state;
    return (
      <Container>
        <Text>Recetas</Text>
        <Content>
          {recetas.length ? <List>{this.renderRecetas()}</List> : null}
        </Content>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

/* ALAKSAM 2019 */

import React from 'react';

import {Text, StyleSheet} from 'react-native';
import {Container, Content, Icon, Button, Header} from 'native-base';

export default class Recetas extends React.Component {
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

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text>Recetas</Text>
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

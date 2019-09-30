/* ALAKASAM 2019 */

import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';

export default class RecetasFavoritas extends React.Component {
  static navigationOptions = {
    title: 'Favoritas',
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text>Recetas Favoritas</Text>
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

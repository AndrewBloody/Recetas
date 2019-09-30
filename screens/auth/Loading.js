/* ALAKASAM 2019 */

import React from 'react';
import firebase from 'react-native-firebase';

import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(
        user ? 'Home' : 'Login',
        user ? {user} : {},
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/* ALAKASAM 2019 */

import React from 'react';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

import {
  StyleSheet,
  Text,
  // View,
  // Button,
  // Image,
  // TextInput,
  // FlatList,
} from 'react-native';

import {Container, Content} from 'native-base';

// Components
import {HeaderComponent} from './components/Header';

export default class Main extends React.Component {
  state = {currentUser: null, photo: null};
  static navigationOptions = {
    title: 'Home',
    // drawerIcon: ({tintColor}) => (
    //   <Icon ios="ios-home" android="md-home" style={{tintColor: tintColor}} />
    // ),
  };

  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
    this.sendTodo = this.sendTodo.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
    this.ref = firebase.firestore().collection('todos');

    this.state = {
      // todo: '',
      list: [],
      user: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    Promise.resolve(navigation.getParam('user')).then(response => {
      this.setState({user: response});
    });
  }

  // componentDidMount() {
  //   Promise.resolve(firebase.auth()).then(response => {
  //     this.setState({currentUser: response});
  //     this.props.navigation.setParams({user: response});
  //   });

  //   // const list = [];

  //   // this.ref
  //   //   .get()
  //   //   .then(snapshot => {
  //   //     snapshot.forEach(doc => {
  //   //       list.push({id: doc.id, ...doc.data()});
  //   //     });
  //   //     this.setState({list});
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('Error getting documents', err);
  //   //   });
  // }

  handleSignOut() {
    const {navigation} = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn');
        this.setState({user: null});
      });
  }

  handleChangeTodo(todo) {
    this.setState({todo});
  }

  sendTodo() {
    this.setState({todo: ''});
    this.ref.add({
      title: this.state.todo,
      complete: false,
    });
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log(response);
        this.setState({photo: response});
      }
    });
  }

  sendPhoto() {
    const fileUri = decodeURI(this.state.photo.uri);
    console.log(fileUri);
    const refStorage = firebase
      .storage()
      .ref(`pictures/${this.state.photo.fileName}`);
    const task = refStorage.put(this.state.photo.path);
    task.on(
      'state_changed',
      snapshot => {
        // Se lanza durante el progreso de subida
        console.log(snapshot);
      },
      error => {
        // Si ha ocurrido un error aquí lo tratamos
        console.log(error);
      },
      () => {
        console.log('success');
        // Una vez se haya subido el archivo,
        // se invoca ésta función
      },
    );
  }

  // <FlatList
  //   data={this.state.list}
  //   keyExtractor={item => item.id}
  //   renderItem={({item}) => <Text key={item.title}>{item.title}</Text>}
  // />
  // <TextInput
  //   placeholder={'New Todo'}
  //   onChangeText={this.handleChangeTodo}
  //   value={this.state.todo}
  // />
  // <Button title="Add TODO" onPress={this.sendTodo} />

  // render() {
  //   const {currentUser} = this.state;
  //   return (
  //     <View style={styles.container}>
  //       <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
  //       {this.state.photo && (
  //         <Image source={{uri: this.state.photo.uri}} style={styles.image} />
  //       )}
  //       <Button title="Upload Photo" onPress={this.sendPhoto} />
  //       <Text>Hi {currentUser && currentUser.email}!</Text>
  //       <Button title="Cerrar Sesión" onPress={this.handleSignOut} />
  //     </View>
  //   );
  // }

  render() {
    return (
      <Container>
        <HeaderComponent navigation={this.props.navigation} />
        <Content contentContainerStyle={styles.container}>
          <Text>Home Screen</Text>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScrollView: {flex: 1},
  image: {width: 300, height: 300},
});

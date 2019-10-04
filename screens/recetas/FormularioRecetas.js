/* ALAKASAM 2019 */

import React from 'react';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

import {StyleSheet, Text, Image} from 'react-native';
import {Container, Content, Button} from 'native-base';
import {Field, reduxForm} from 'redux-form';

// Components
import {Input} from './utils/Input';

class FormularioRecetasComponent extends React.Component {
  static navigationOptions = {
    title: 'Formulario',
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    Promise.resolve(firebase.auth()).then(response => {
      if (response.currentUser) {
        this.user_id = response.currentUser.uid;
        this.ref = firebase
          .firestore()
          .collection('usuarios')
          .doc(response.currentUser.uid)
          .collection('recetas');
      }
    });

    this.state = {
      photo: null,
    };
  }

  submit(values) {
    const {navigation} = this.props;
    this.ref.add(values).then(response => {
      if (this.state.photo) {
        const refStorage = firebase
          .storage()
          .ref(
            `usuarios/${this.user_id}/recetas/${response.id}/${
              this.state.photo.fileName
            }`,
          );
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
            navigation.navigate('Recetas');
          },
          response_photo => {
            // Una vez se haya subido el archivo,
            // se invoca ésta función
            response
              .update({imagen_url: response_photo.downloadURL})
              .then(() => navigation.navigate('Recetas'));
          },
        );
      }
    });
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Text>Formulario</Text>
          <Button onPress={this.handleChoosePhoto}>
            <Text>Elige una imagen</Text>
          </Button>
          {this.state.photo && (
            <Image source={{uri: this.state.photo.uri}} style={styles.image} />
          )}
          <Field placeholder="nombre" name="nombre" component={Input} />
          <Field
            placeholder="descripcion"
            name="descripcion"
            component={Input}
          />
          <Field
            placeholder="ingredientes"
            name="ingredientes"
            component={Input}
          />
          <Field
            placeholder="procedimiento"
            name="procedimiento"
            component={Input}
          />
          <Field placeholder="notas" name="notas" component={Input} />
          {/*<Field placeholder="tags" name="tags" component={Input} />*/}
          <Button onPress={handleSubmit(this.submit)}>
            <Text>Crear Receta</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'FormularioRecetas',
})(FormularioRecetasComponent);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 300, height: 300},
});

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import api from '../services/api';
 

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova Publicação'
  };
  state = {
    author: '',
    place: '',
    description: '',
    hashtags: '',
    boolCameraRoolError: false,
    boolBoxSelectCameraOrRoll: false
  }
  handleSelectImage = async () => {
    this.setState({boolBoxSelectCameraOrRoll: true});
  }
  permissionRoll = async () => {
    const {permissions} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    console.log('permissions:', permissions);
    if(permissions.cameraRoll.status == 'denied'){
      this.setState({boolCameraRoolError: true});
      console.log('boolCameraRoolError:', this.state.boolCameraRoolError);
    }
    if(permissions.cameraRoll.status == 'undetermined'){
      const after = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(after.permissions.cameraRoll.status == 'denied'){
        this.setState({boolCameraRoolError: true});
      }
      console.log('after', after);
    }
  }
  _renderBoxToSelectCameraOrRoll = () => {
    return (
      <View style={styles.selectCameraOrRollButton}>
        <TouchableOpacity>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableCameraOrRollButton} onPress={() => {}}>
          <Text style={styles.textCameraOrRollButton}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableCameraOrRollButton} onPress={() => {}}>
          <Text style={styles.textCameraOrRollButton}>Galeria</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderCameraRollError = () => {
    return (
      <View>
        <Text>Você não permitiu utilizar sua camera...</Text>
      </View>
    )
  }
  _render = () => {
    return(
      <View>
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selectionar Imagem</Text>
        </TouchableOpacity>
        <TextInput
          style = {styles.input}
          autoCorrect = {false}
          autoCapitalize = 'none'
          placeholder = 'Nome do autor'
          placeholderTextColor = '#999'
          value={this.state.author}
          onChangeText = {author => this.setState({ author })}
        />
        <TextInput
          style = {styles.input}
          autoCorrect = {false}
          autoCapitalize = 'none'
          placeholder = 'Local da foto'
          placeholderTextColor = '#999'
          value={this.state.place}
          onChangeText = {place => this.setState({ place })}
        />
        <TextInput
          style = {styles.input}
          autoCorrect = {false}
          autoCapitalize = 'none'
          placeholder = 'Descrição'
          placeholderTextColor = '#999'
          value={this.state.description}
          onChangeText = {description => this.setState({ description })}
        />
        <TextInput
          style = {styles.input}
          autoCorrect = {false}
          autoCapitalize = 'none'
          placeholder = 'Hashtags'
          placeholderTextColor = '#999'
          value={this.state.hashtags}
          onChangeText = {hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
        </View>
    )
  }
  render() {
    console.log(this.state);
    if(this.state.boolCameraRoolError){
      return (
        <View style={styles.container}>
          {this._renderCameraRollError()}
          {this._render()}
        </View>
      )
    }
    if(this.state.boolBoxSelectCameraOrRoll){
      return (
        <View style={styles.container}>
          {this._renderBoxToSelectCameraOrRoll()}
          {this._render()}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this._render()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },
  selectCameraOrRollButton: {
    position: 'absolute',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#ddd',
    height: '70%',
    width: '100%',
    marginHorizontal: 20,
    zIndex: 5
  },
  touchableCameraOrRollButton: {
    width: '100%',
    height: '40%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  textCameraOrRollButton: {
    fontSize: 18
  },
  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});


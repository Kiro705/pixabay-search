import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, View, Image, StatusBar, KeyboardAvoidingView } from 'react-native'
import { Button, FormInput } from 'react-native-elements'
import { getSearchResults, writeSearchTopic, resetSearchResults, resetSearchTopic } from '../store'

const Dimensions = require('Dimensions')
const  {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: 'green',
		alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 32,
    fontFamily: 'Arial',
    textAlign: 'center',
    color: 'black',
  },
  FormContainer: {
    width: '90%',
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderBottomColor: 'darkgreen',
    backgroundColor: 'lightgreen',
    borderRadius: 5,
  },
  FormInput: {
    fontSize: 0.08 * width,
    margin: 5,
    fontFamily: 'Arial',
    color: 'black',
  },
  Buffer1: {
    flex: 1,
  },
  Buffer3: {
    flex: 3,
  }
})

const mapState = (state) => {
  return {
    searchTopic: state.searchTopic
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleChange: (string) => {
      dispatch(writeSearchTopic(string))
    },
    handleSearch: (topic) => {
      dispatch(resetSearchResults())
      dispatch(getSearchResults(topic))
      dispatch(resetSearchTopic())
    }
  }
}

function HomeComponent(props){
	return (
		<KeyboardAvoidingView
      style={styles.Container}
      behavior="padding"
      >
      <StatusBar barStyle="dark-content" />
      <View style={styles.Buffer3} />
      <FormInput
        onChangeText={(value) => {
          props.handleChange(value)
        }}
        defaultValue={props.searchTopic}
        containerStyle={styles.FormContainer}
        inputStyle={styles.FormInput}
        keyboardAppearance="light"
        placeholder="enter search term"
        placeholderTextColor= "green"
      />
      <View style={styles.Buffer1} />
      <View style={styles.Buffer3} >
        <Button
          icon={{name: 'search', size: 50, color: 'black', type: 'font-awesome'}}
          buttonStyle={{backgroundColor: 'lightgreen', borderRadius: 10}}
          textStyle={styles.Text}
          title={`Search`}
          onPress={() => {
            props.handleSearch(props.searchTopic)
            props.navigation.navigate('SearchResults')
          }
        }
        />
      </View>
      <View style={styles.Buffer3} />	
		</KeyboardAvoidingView>
	)
}

export default connect(mapState, mapDispatch)(HomeComponent)


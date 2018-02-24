import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Image, StatusBar, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'

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
  Image: {
    height: height * 0.7,
    resizeMode: 'contain',
    width: width - 20,
    margin: 10,
  },
  Value: {
    fontSize: 24,
    fontFamily: 'Arial',
    textAlign: 'left',
    color: 'white',
    margin: 10,
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
    singleResult: state.singleResult
  }
}

function SingleResultComponent(props){
	return (
		<View style={styles.Container}>
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.Value}>User: {props.singleResult.user}</Text>
        <Text style={styles.Value}>Tags: {props.singleResult.tags}</Text>
        <Text style={styles.Value}>Resolution: {props.singleResult.resolution}</Text>
        <Divider style={{ backgroundColor: '#191919' }} />
        {/*//Loads higher quality image at 960px width*/}
        <Image style={styles.Image} source={{uri: props.singleResult.image.slice(0,props.singleResult.image.length - 8) + '_960.jpg'}} />
      </ScrollView>
		</View>
	)
}

export default connect(mapState)(SingleResultComponent)

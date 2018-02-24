import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { setSingleResult, resetSingleResult } from '../store'

const Dimensions = require('Dimensions')
const  {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  Image: {
    height: height * 0.45,
    resizeMode: 'contain',
    width: width - 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
})

const mapState = (state) => {
  return {
    singleResult: state.singleResult
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSelect: (resultObj) => {
      dispatch(resetSingleResult())
      dispatch(setSingleResult(resultObj))
    }
  }
}

function ResultItemComponent (props){
  const data = props.data
  const dataObj = {
    user: data.user,
    tags: data.tags,
    resolution: data.webformatWidth + ' x ' + data.webformatHeight,
    image: data.webformatURL,
  }
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          props.handleSelect(dataObj)
          props.navigator('SingleResult')
        }}
      >
        <Image
          style={styles.Image}
          //Loads lower quality image at 340 px width
          source={{uri: data.webformatURL.slice(0 ,data.webformatURL.length - 8) + '_340.jpg'}}
        />
      </TouchableHighlight>
    </View>
  )
}

export default connect(mapState, mapDispatch)(ResultItemComponent)

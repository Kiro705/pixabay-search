import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native'
import { setSingleResult, resetSingleResult } from '../store'

const Dimensions = require('Dimensions')
const  {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  Image: {
    height: height * 0.45,
    resizeMode: 'contain',
    width: width - 20,
    margin: 10,
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
    resolution: data.imageHeight + ' x ' + data.imageWidth,
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
          source={{uri: data.webformatURL}}
        />
      </TouchableHighlight>
    </View>
  )
}

export default connect(mapState, mapDispatch)(ResultItemComponent)

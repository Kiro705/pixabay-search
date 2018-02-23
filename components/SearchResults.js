import React from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import Loading from './Loading'
import ResultItem from './ResultItem'

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
    flex: 1,
    fontSize: 24,
    fontFamily: 'Courier New',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
  Buffer1: {
    flex: 1,
  },
  Buffer3: {
    flex: 3,
  },
})

const mapState = (state) => {
  return {
    searchResults: state.searchResults
  }
}

class SearchResultsComponent extends React.Component {

  componentDidUpdate(prevProps){
    if (this.props.searchResults.topic && !prevProps.searchResults.topic){
      this.props.navigation.setParams({title: this.props.searchResults.topic})
    }
  }

  render() {
    let searchResults = this.props.searchResults
    if (searchResults.hits[0] !== null){
      if (searchResults.hits.length){
        console.log('Total Hits:', searchResults.totalHits)
        console.log('Hits.length:', searchResults.hits.length)
        console.log('Total:', searchResults.total)
        return (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={searchResults.hits}
              renderItem={(image) => {
                return (
                  <ListItem
                    style={{margin: 0, padding: 0}}
                    title={
                      <View style={{margin: 0, padding: 0}}>
                        <ResultItem data={image.item} navigator={this.props.navigation.navigate} />
                      </View>
                    }
                    containerStyle={{ margin: 0, padding: 0, borderBottomWidth: 6, backgroundColor: 'green' }}
                  />
                )}
              }
              keyExtractor={image => image.id}
            />
            {/*<ResultItem data={image.item} navigator={this.props.navigation.navigate} />*/}
          </List>
        )
      } else {
        return (
          <View style={styles.Container}>
            <View style={styles.Buffer3} />
            <View style={styles.Buffer1}>
              <Text style={styles.Text}>Nothing matching '{searchResults.topic}' was found</Text>
            </View>
            <View style={styles.Buffer3} />
          </View>
        )
      }
    } else {
      return (
        <View style={styles.Container}>
          <Loading />
        </View>
      )
    }
  }
}

export default connect(mapState)(SearchResultsComponent)


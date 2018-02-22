import { StackNavigator } from 'react-navigation'
import Home from './Home'
import SearchResults from './SearchResults'
import SingleResult from './SingleResult'

const Dimensions = require('Dimensions')
const  {height, width} = Dimensions.get('window')

const HomeStack = StackNavigator({
	Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: `Pixabay Search`,
      headerBackTitle: 'Home',
      headerBackTitleStyle: {
        color: 'green',
        fontFamily: 'Arial',
        fontSize: 24,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: 'green',
        fontFamily: 'Arial',
        fontSize: width * 0.08,
        fontWeight: 'normal'
      },
      headerTintColor: 'green'
    }),
  },
  SearchResults: {
    path: 'search-results/:query',
    screen: SearchResults,
    navigationOptions: ({navigation}) => {
      if (!navigation.state.params) {
        navigation.state.params = {}
      }
      return ({
      title: navigation.state.params.title || ' ',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: 'green',
        fontFamily: 'Arial',
        fontSize: width * 0.075,
        fontWeight: 'normal'
      },
      headerBackTitleStyle: {
        color: 'green',
        fontFamily: 'Arial',
        fontSize: width * 0.06,
        fontWeight: 'normal'
      },
      headerTintColor: 'green'
    })},
  },
    SingleResult: {
      path: 'search-results/:query',
      screen: SingleResult,
      navigationOptions: ({navigation}) => {
        if (!navigation.state.params) {
          navigation.state.params = {}
        }
        return ({
        title: navigation.state.params.title || ' ',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'green',
          fontFamily: 'Arial',
          fontSize: width * 0.08,
          fontWeight: 'normal'
        },
        headerBackTitleStyle: {
          color: 'green',
          fontFamily: 'Arial',
          fontSize: width * 0.06,
          fontWeight: 'normal'
        },
        headerTintColor: 'green'
      })},
    }
  }, {
	headerMode: 'screen'
})

export default HomeStack

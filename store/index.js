import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import searchResults from './searchResults'
import searchTopic from './searchTopic'
import singleResult from './singleResult'

const reducer = combineReducers({
	searchResults,
	searchTopic,
	singleResult,
})

let store

if (process.env.NODE_ENV === 'developmentxx') {
	const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
	store = createStore(reducer, middleware)
} else {
	const middleware = applyMiddleware(thunkMiddleware)
	store = createStore(reducer, middleware)
}

export default store
export * from './searchResults'
export * from './searchTopic'
export * from './singleResult'

/**
 * ACTION TYPES
 */
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS'

/**
 * INITIAL STATE
 */
const searchResultsObj = {
	topic: '',
	hits: [null],
	//Results have ability to chain searches with next page item
	total: 0,
	totalHits: 0,
}

/**
 * ACTION CREATORS
 */
const getSearchResultsAction = (searchResults, searchString) => ({type: GET_SEARCH_RESULTS, searchResults, searchString})
export const resetSearchResults = () => ({type: RESET_SEARCH_RESULTS, searchResults: {topic: '', hits: [null], total: 0, totalHits: 0}})

/**
 * THUNK CREATORS
 */
export const getSearchResults = (searchString) =>
	dispatch =>
		//Key is visable, but ideally would be in a private repo to hide it.
		fetch(`https://pixabay.com/api/?key=8136445-97f9de7da280f8ad8edefd490&q=${searchString.split(' ').join('+')}&image_type=photo`, {method: 'GET'})
			.then(data => data.json())
			.then(results => {
				dispatch(getSearchResultsAction(results, searchString))
			})
			.catch((error) => console.error(error))

/**
 * REDUCER
 */
export default function (state = searchResultsObj, action) {
	switch (action.type) {
	case GET_SEARCH_RESULTS:
		return Object.assign({}, state, {topic: action.searchString, hits: action.searchResults.hits, total: action.searchResults.total, totalHits: action.searchResults.totalHits})
	case RESET_SEARCH_RESULTS:
		return Object.assign({}, state, action.searchResults)
	default:
		return state
	}
}

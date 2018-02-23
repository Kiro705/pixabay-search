//This variable is to deal with repeat requests for the same page.
//See line 47
let lastPage = 1

/**
 * ACTION TYPES
 */
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'
const GET_NEXT_RESULTS = 'GET_NEXT_RESULTS'
const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS'

/**
 * INITIAL STATE
 */
const searchResultsObj = {
	topic: '',
	hits: [null],
	total: 0,
	totalHits: 0,
	page: 0,
}

/**
 * ACTION CREATORS
 */
const getSearchResultsAction = (searchResults, searchString) => ({type: GET_SEARCH_RESULTS, searchResults, searchString})
const getNextResultsAction = (newHits) => ({type: GET_NEXT_RESULTS, newHits})
export const resetSearchResults = () => ({type: RESET_SEARCH_RESULTS, searchResults: {topic: '', hits: [null], total: 0, totalHits: 0, page: 0}})

/**
 * THUNK CREATORS
 */
export const getSearchResults = (searchString) =>
	dispatch =>
		//Key is visable, but ideally would be in a private repo to hide it.
		fetch(`https://pixabay.com/api/?key=8136445-97f9de7da280f8ad8edefd490&q=${searchString.split(' ').join('+')}&image_type=photo`, {method: 'GET'})
			.then(data => data.json())
			.then(results => {
				lastPage = 1
				dispatch(getSearchResultsAction(results, searchString))
			})
			.catch((error) => console.error(error))

export const getNextResults = (searchString, page) =>
	dispatch => {
		//Tests to see if the request is for a new page, not the same page as before.
		if (lastPage === page){
			lastPage++
			fetch(`https://pixabay.com/api/?key=8136445-97f9de7da280f8ad8edefd490&q=${searchString.split(' ').join('+')}&image_type=photo&page=${page + 1}`, {method: 'GET'})
			.then(data => {
				if (data.status === 200){
					return data.json()
				} else {
					return 'identical-request'
				}
			})
			.then(results => {
				if (results !== 'identical-request'){
					dispatch(getNextResultsAction(results.hits))
				}
			})
			.catch((error) => console.error(error))
		}
	}

/**
 * REDUCER
 */
export default function (state = searchResultsObj, action) {
	switch (action.type) {
	case GET_SEARCH_RESULTS:
		return Object.assign({}, state, {topic: action.searchString, hits: action.searchResults.hits, total: action.searchResults.total, totalHits: action.searchResults.totalHits, page: 1})
	case GET_NEXT_RESULTS:
		return Object.assign({}, state, {hits: state.hits.concat(action.newHits), page: state.page + 1})
	case RESET_SEARCH_RESULTS:
		return Object.assign({}, state, action.searchResults)
	default:
		return state
	}
}

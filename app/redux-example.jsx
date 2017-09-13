import {createStore} from 'redux';

console.log('Starting Redux example');

const stateDefault = {
	searchText: '', 
	showCompleted: false, 
	todos: []
};
const reducer = (state = stateDefault, action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		default: 
			return state;
	}
};
const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('searchText is ', state.searchText);
});

console.log('currentState', store.getState());

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'new search text'
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'work'
});
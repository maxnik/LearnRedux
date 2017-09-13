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

console.log('currentState', store.getState());

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'new search text'
});

console.log('searchText should change', store.getState());
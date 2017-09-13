import {createStore, compose, combineReducers} from 'redux';

console.log('Starting Redux example');

const stateDefault = {
	searchText: '', 
	showCompleted: false, 
	todos: []
};
let nextTodoId = 1;
const oldReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			};
		case 'ADD_TODO':
			return {
				...state,
				todos: [
					...state.todos,
					{
						id: nextTodoId++,
						text: action.todoText
					}
				]
			};
		case 'REMOVE_TODO':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.id)
			}
		default: 
			return state;
	}
};


const searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText;
		default: 
			return state;
	};
};

const todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: nextTodoId++,
					text: action.todoText
				}
			];
		case 'REMOVE_TODO':
			return state.filter(todo => todo.id !== action.id);
		default:
			return state;
	};
};

const reducer = combineReducers({
	searchText: searchTextReducer,
	todos: todosReducer
});
const store = createStore(reducer, compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('currentState is ', state);
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'new search text'
});

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'work'
});

store.dispatch({
	type: 'ADD_TODO',
	todoText: 'Go for a run'
});

store.dispatch({
	type: 'ADD_TODO',
	todoText: 'Do homework'
});

store.dispatch({
	type: 'REMOVE_TODO',
	id: 2
});
import {createStore, compose, combineReducers} from 'redux';
import axios from 'axios';

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

const changeSeachText = (searchText) => {
	return {
		type: 'CHANGE_SEARCH_TEXT',
		searchText
	}
};

let nextTodoId = 1;
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

const addTodo = (todoText) => {
	return {
		type: 'ADD_TODO',
		todoText
	}
};

const removeTodo = (id) => {
	return {
		type: 'REMOVE_TODO',
		id
	}
}

const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
	switch (action.type) {
		case 'START_LOCATION_FETCH':
			return {
				isFetching: true,
				url: undefined
			};
		case 'COMPLETE_LOCATION_FETCH':
			return {
				isFetching: false,
				url: action.url
			};
		default:
			return state;
	}
}

const startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	};
};

const completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

const fetchLocation = () => {
	store.dispatch(startLocationFetch());

	axios.get('http://ipinfo.io').then((res) => {
		const loc = res.data.loc;
		const baseUrl = 'http://maps.google.com?q=';

		store.dispatch(completeLocationFetch(baseUrl + loc));
	});
};

const reducer = combineReducers({
	searchText: searchTextReducer,
	todos: todosReducer,
	map: mapReducer
});
const store = createStore(reducer, compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('currentState is ', state);

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Loading...';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = `<a href="${state.map.url}" target="_blank">View your location</a>`;
	}
});

fetchLocation();

store.dispatch(changeSeachText('new search text'));

store.dispatch(changeSeachText('work'));

store.dispatch(addTodo('Go for a run'));

store.dispatch(addTodo('Do homework'));

store.dispatch(removeTodo(2));
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import {searchTextReducer, todosReducer, mapReducer} from './../reducers';
import thunk from 'redux-thunk';

export const configure = () => {
	const reducer = combineReducers({
		searchText: searchTextReducer,
		todos: todosReducer,
		map: mapReducer
	});
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
}
import {createStore} from 'redux';

console.log('Starting Redux example');

const stateDefault = {
	searchText: '', 
	showCompleted: false, 
	todos: []
};
const reducer = (state = stateDefault, action) => {
	return state;
};
const store = createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);
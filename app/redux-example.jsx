const actions = require('./actions');

const store = require('./store/configureStore').configure();

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	console.log('currentState is ', state);

	if (state.map.isFetching) {
		document.getElementById('app').innerHTML = 'Loading...';
	} else if (state.map.url) {
		document.getElementById('app').innerHTML = `<a href="${state.map.url}" target="_blank">View your location</a>`;
	}
});

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeSeachText('new search text'));

store.dispatch(actions.changeSeachText('work'));

store.dispatch(actions.addTodo('Go for a run'));

store.dispatch(actions.addTodo('Do homework'));

store.dispatch(actions.removeTodo(2));
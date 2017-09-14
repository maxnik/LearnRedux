import axios from 'axios';

export const changeSeachText = (searchText) => {
	return {
		type: 'CHANGE_SEARCH_TEXT',
		searchText
	}
};

export const addTodo = (todoText) => {
	return {
		type: 'ADD_TODO',
		todoText
	}
};

export const removeTodo = (id) => {
	return {
		type: 'REMOVE_TODO',
		id
	}
}

export const startLocationFetch = () => {
	return {
		type: 'START_LOCATION_FETCH'
	};
};

export const completeLocationFetch = (url) => {
	return {
		type: 'COMPLETE_LOCATION_FETCH',
		url
	};
};

export const fetchLocation = () => {
	return (dispatch, getState) => {
		dispatch(startLocationFetch());

		axios.get('http://ipinfo.io').then((res) => {
			const loc = res.data.loc;
			const baseUrl = 'http://maps.google.com?q=';

			dispatch(completeLocationFetch(baseUrl + loc));
		});
	};
};

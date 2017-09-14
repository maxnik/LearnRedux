export const searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return action.searchText;
		default: 
			return state;
	};
};

let nextTodoId = 1;
export const todosReducer = (state = [], action) => {
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

export const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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

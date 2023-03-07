const fetchNewsReducer = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_NEWS':
			let newState = action.payload;
			return newState;

		default:
			return state;
	}
};

export default fetchNewsReducer;

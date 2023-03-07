const fetchCoinsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_COINS':
			let newState = action.payload;
			return newState;

		default:
			return state;
	}
};

export default fetchCoinsReducer;

//TODO why taken state as object instead of array
//BUG  repeatition possible in the array case
